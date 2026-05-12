import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { Nav, Calculadora, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos/bpo")({
  head: () => ({
    meta: [
      { title: "BPO Financeiro — Cluny" },
      { name: "description", content: "BPO Financeiro Cluny: 3 planos (Start, Gestão, Premium) em modalidades Full e Assistido. Operação financeira completa em até 90 dias." },
    ],
  }),
  component: BpoPage,
});

type Modalidade = "full" | "assistido";

const ICP = {
  start: "Faturamento R$ 2M a R$ 4,8M/ano · Simples ou Presumido",
  gestao: "Faturamento R$ 4,8M a R$ 8M/ano · Presumido",
  premium: "Faturamento R$ 8M a R$ 30M/ano · Presumido ou Real",
};

const TITULOS = { start: "BPO Start", gestao: "BPO Gestão", premium: "BPO Premium" };

const ESCOPO: Record<keyof typeof TITULOS, Array<{ cat: string; items: string[] }>> = {
  start: [
    { cat: "Contas a Pagar", items: [
      "Cadastro e classificação de fornecedores",
      "Programação e agendamento de pagamentos",
      "Gestão de contratos recorrentes (básica)",
    ]},
    { cat: "Contas a Receber", items: [
      "Emissão de NF e boletos",
      "Régua de cobrança automatizada padrão",
      "Gestão de inadimplência — relatório mensal (D+30)",
    ]},
    { cat: "Tesouraria", items: [
      "Conciliação bancária diária (até 3 contas)",
      "Fluxo de caixa realizado semanal",
      "Fluxo de caixa projetado 30 dias",
    ]},
    { cat: "Relatórios", items: [
      "DRE gerencial mensal padrão",
      "5 KPIs financeiros padrão",
      "Relatório de inadimplência e aging mensal",
    ]},
    { cat: "Atendimento", items: [
      "SLA de resposta: 24h úteis",
      "Reunião operacional semanal (20 min)",
      "Reunião de resultado mensal (60 min — analista Cluny)",
    ]},
  ],
  gestao: [
    { cat: "Contas a Pagar", items: [
      "Tudo do Start",
      "Workflow de aprovação dupla",
      "Gestão de contratos recorrentes completa",
    ]},
    { cat: "Contas a Receber", items: [
      "Régua de cobrança customizada",
      "Gestão ativa de inadimplência (D+30)",
    ]},
    { cat: "Tesouraria", items: [
      "Fluxo de caixa realizado diário",
      "Fluxo de caixa projetado 60 dias",
      "Gestão básica de aplicações financeiras",
      "Até 6 contas bancárias",
    ]},
    { cat: "Relatórios", items: [
      "DRE gerencial por centro de custo",
      "Balanço gerencial trimestral",
      "10 KPIs customizados",
      "Relatório de inadimplência quinzenal",
    ]},
    { cat: "Atendimento", items: [
      "SLA de resposta: 8h úteis",
      "Reunião mensal 90 min (analista + coordenador Cluny)",
      "Revisão trimestral de SLA e NPS",
    ]},
  ],
  premium: [
    { cat: "Contas a Pagar", items: [
      "Tudo do Gestão",
      "Workflow de aprovação multi-nível com trilha de auditoria",
    ]},
    { cat: "Contas a Receber", items: [
      "Régua de cobrança customizada + ativa",
      "Gestão ativa de inadimplência + apoio jurídico",
    ]},
    { cat: "Tesouraria", items: [
      "Conciliação bancária diária multi-conta (até 15)",
      "Fluxo de caixa projetado 90 dias rolante",
      "Gestão completa de aplicações financeiras",
    ]},
    { cat: "Relatórios", items: [
      "DRE gerencial por projeto e por cliente",
      "Balanço gerencial mensal",
      "15+ KPIs em dashboard Power BI / Looker Studio",
      "Relatório de inadimplência semanal",
    ]},
    { cat: "Atendimento", items: [
      "SLA de resposta: 4h úteis",
      "Reunião quinzenal 60 min (coordenador + sócio Cluny trimestral)",
      "Auditoria interna trimestral",
    ]},
    { cat: "Exclusivo Premium", items: [
      "Analista financeiro dedicado",
      "Coordenador de conta dedicado",
      "Manual de processos do cliente",
      "Integração com ERP corporativo (Totvs, SAP B1, Sankhya)",
    ]},
  ],
};

const VOLUME = {
  start: "Até 150 lançamentos/mês · até 3 contas bancárias",
  gestao: "Até 400 lançamentos/mês",
  premium: "Até 1.000 lançamentos/mês · até 15 contas bancárias",
};

const NAO_INCLUI = {
  start: [
    "Workflow de aprovação dupla",
    "Balanço gerencial",
    "KPIs customizados",
    "Analista dedicado ou parcial",
  ],
  gestao: [
    "Dashboard BI avançado",
    "Analista dedicado exclusivo",
    "Auditoria interna",
    "Balanço gerencial mensal",
  ],
  premium: [],
};

const FLUXO: Array<[string, string, string, string, boolean]> = [
  ["1", "Receber documento (NF, boleto)", "Cluny", "Cluny", false],
  ["2", "Conferir e classificar", "Cluny", "Cluny", false],
  ["3", "Lançar no sistema", "Cluny", "Cluny", false],
  ["4", "Programar pagamento", "Cluny", "Cluny", false],
  ["5", "Submeter aprovação ao cliente", "Cluny", "Cluny", false],
  ["6", "Aprovar lote", "Cliente", "Cliente", false],
  ["7", "Executar pagamento no banco", "Cluny ✓", "Cliente ✓", true],
  ["8", "Conciliar baixa", "Cluny", "Cluny", false],
  ["9", "Registrar comprovante", "Cluny", "Cluny", false],
];

const COMPARATIVO: Array<{ cat: string; rows: Array<[string, boolean | string, boolean | string, boolean | string]> }> = [
  { cat: "Contas a Pagar", rows: [
    ["Cadastro e classificação de fornecedores", true, true, true],
    ["Programação e agendamento", true, true, true],
    ["Workflow de aprovação dupla", false, true, true],
    ["Gestão de contratos recorrentes", "Básica", "Completa", "Completa"],
  ]},
  { cat: "Contas a Receber", rows: [
    ["Emissão de NF e boletos", true, true, true],
    ["Régua de cobrança", "Padrão", "Customizada", "Customizada + ativa"],
    ["Gestão de inadimplência D+30", "Relatório", "Ativa", "Ativa + apoio jurídico"],
  ]},
  { cat: "Tesouraria", rows: [
    ["Conciliação bancária", "Diária", "Diária", "Diária multi-conta"],
    ["Fluxo de caixa realizado", "Semanal", "Diário", "Diário"],
    ["Fluxo de caixa projetado", "30 dias", "60 dias", "90 dias rolante"],
    ["Contas bancárias", "Até 3", "Até 6", "Até 15"],
    ["Gestão de aplicações", false, "Básica", "Completa"],
  ]},
  { cat: "Relatórios Gerenciais", rows: [
    ["DRE gerencial mensal", "Padrão", "Por centro de custo", "Por projeto/cliente"],
    ["Balanço gerencial", false, "Trimestral", "Mensal"],
    ["KPIs financeiros", "5 padrão", "10 customizados", "15+ dashboard"],
    ["Relatório inadimplência e aging", "Mensal", "Quinzenal", "Semanal"],
  ]},
  { cat: "Processos", rows: [
    ["SLA de resposta", "24h úteis", "8h úteis", "4h úteis"],
    ["Workflow de aprovação dupla", false, true, true],
    ["Manual de processos do cliente", false, false, true],
    ["Auditoria interna trimestral", false, false, true],
  ]},
  { cat: "Equipe", rows: [
    ["Analista financeiro", "Compartilhado", "Parcial dedicado", "Dedicado"],
    ["Coordenador da conta", "Compartilhado", "Compartilhado", "Dedicado"],
    ["Participação do sócio Cluny", false, false, "Trimestral"],
  ]},
  { cat: "Reuniões", rows: [
    ["Reunião operacional semanal", "✓ 20min", "✓ 20min", "✓ 20min"],
    ["Reunião de resultado mensal", "60min", "90min", false],
    ["Reunião quinzenal", false, false, "60min"],
    ["Revisão trimestral SLA/NPS", true, true, true],
  ]},
  { cat: "Volume", rows: [
    ["Lançamentos mensais", "Até 150", "Até 400", "Até 1.000"],
    ["ERP compatível", "Básico", "Intermediário", "Corporativo"],
  ]},
];

const FASES = [
  {
    n: "01", sem: "Semana 1", titulo: "Diagnóstico",
    items: ["Reunião de kickoff", "Mapeamento do processo atual", "Levantamento de sistemas e volumes", "Definição de modalidade"],
  },
  {
    n: "02", sem: "Semanas 2-3", titulo: "Configuração",
    items: ["Configuração do ERP", "Plataforma de aprovação", "Centros de custo", "Cadastro de fornecedores", "Formalização de procurações (Modalidade Full)"],
  },
  {
    n: "03", sem: "Semanas 3-5", titulo: "Migração",
    items: ["Importação de saldos", "Operação em paralelo 15 dias", "Validação de primeiros pagamentos e conciliações"],
  },
  {
    n: "04", sem: "Semanas 5-8/12", titulo: "Go-live",
    items: ["Operação Cluny assume integralmente", "Primeira reunião de resultado", "Termo de aceite formal"],
  },
];

function CompCell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="text-[#005a54] text-[16px] font-bold">✓</span>;
  if (v === false) return <span className="text-[#cec9b8]">—</span>;
  return <span className="text-[12px] text-[#6e7b7c]">{v}</span>;
}

function ModalidadeToggle({ modalidade, setModalidade, sticky = false }: { modalidade: Modalidade; setModalidade: (m: Modalidade) => void; sticky?: boolean }) {
  return (
    <div className={sticky ? "sticky top-[80px] z-40 bg-[#f4f1ec] border-b border-[#e8e4db] py-3.5" : ""}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] font-bold text-[#1A1A1A]">Modalidade:</span>
        <div className="flex gap-0">
          {(["full", "assistido"] as const).map((k) => (
            <button key={k} onClick={() => setModalidade(k)}
              className="px-5 py-2 text-[13px] font-bold tracking-wide transition-all"
              style={modalidade === k
                ? { background: "#005a54", color: "#f4f1ec", border: "1px solid #005a54", borderRadius: 2 }
                : { background: "#ffffff", color: "#6e7b7c", border: "1px solid #e8e4db", borderRadius: 2 }}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="px-3 py-1.5 text-[11px] font-bold tracking-wide rounded-[2px]"
          style={modalidade === "full"
            ? { background: "#1F3D2E", color: "#f4f1ec" }
            : { background: "#cec9b8", color: "#1A1A1A" }}>
          {modalidade === "full" ? "Cluny executa o pagamento" : "Cliente executa no banco"}
        </span>
      </div>
    </div>
  );
}

function PlanCard({ plano, modalidade }: { plano: keyof typeof TITULOS; modalidade: Modalidade }) {
  const dark = plano === "gestao";
  const txt = dark ? "#f4f1ec" : "#1A1A1A";
  const sub = dark ? "#cec9b8" : "#6e7b7c";
  const subt = modalidade === "full"
    ? "Operação completa com programação bancária"
    : "Operação completa — você executa no banco";

  const ctaStyle: React.CSSProperties =
    plano === "gestao" ? { background: "#c48b30", color: "#1A1A1A" }
    : plano === "premium" ? { background: "#005a54", color: "#f4f1ec" }
    : { background: "transparent", color: "#005a54", border: "2px solid #005a54" };

  return (
    <div className="relative p-8 rounded-[4px] flex flex-col h-full overflow-hidden"
      style={{ background: dark ? "#1F3D2E" : "#ffffff", border: dark ? "none" : "1px solid #e8e4db" }}>
      {dark && <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full pointer-events-none" style={{ background: "rgba(196,139,48,0.15)", transform: "translate(30%,-30%)" }} />}

      <div className="flex flex-wrap items-center gap-2 mb-2 relative">
        <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: sub }}>BPO · {plano.toUpperCase()}</span>
        {plano === "gestao" && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· MAIS CONTRATADO</span>}
      </div>
      <p className="text-[11px] mb-4" style={{ color: sub }}>{ICP[plano]}</p>

      <h3 className="font-display font-semibold text-[28px]" style={{ color: txt }}>{TITULOS[plano]}</h3>
      <p className="font-display italic text-[14px] mt-1" style={{ color: sub }}>{subt}</p>

      <div className="my-6 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db" }} />

      <div className="text-[9px] font-bold tracking-wider uppercase mb-4" style={{ color: sub }}>ESCOPO</div>
      <div className="space-y-5 flex-1">
        {ESCOPO[plano].map(({ cat, items }) => (
          <div key={cat}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: dark ? "#cec9b8" : "#6e7b7c" }}>{cat}</div>
            <ul className="space-y-1">
              {items.map((e) => (
                <li key={e} className="flex gap-2 text-[13px] leading-snug" style={{ color: txt }}>
                  <span style={{ color: "#c48b30" }}>→</span><span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-[12px] mt-5 pt-4 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db", color: sub }}>
        Volume: {VOLUME[plano]}
      </div>

      {NAO_INCLUI[plano].length > 0 && (
        <div className="mt-4">
          <div className="text-[9px] font-bold tracking-wider uppercase mb-2" style={{ color: sub }}>NÃO INCLUI</div>
          <ul className="space-y-1">
            {NAO_INCLUI[plano].map((e) => (
              <li key={e} className="text-[12px]" style={{ color: sub }}>— {e}</li>
            ))}
          </ul>
        </div>
      )}

      <a href="#cadastro" className="mt-6 w-full text-center py-3 rounded-[2px] font-bold text-[13px] transition-all" style={ctaStyle}>
        Quero conversar sobre o {TITULOS[plano].replace("BPO ", "")} →
      </a>
    </div>
  );
}

function BpoPage() {
  const [modalidade, setModalidade] = useState<Modalidade>("full");

  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        {/* HERO */}
        <section className="bg-[#1F3D2E] text-[#f4f1ec]" style={{ padding: "96px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· BPO FINANCEIRO / EXECUÇÃO</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Tiramos o sócio da<br /><span className="italic font-normal text-[#c48b30]">operação financeira.</span>
            </h1>
            <p className="text-[16px] mt-6 leading-relaxed" style={{ color: "rgba(244,241,236,0.8)", maxWidth: 520 }}>
              Operação financeira completa, executada pela equipe Cluny, dimensionada para o estágio da sua empresa. Substitui a contratação de analista financeiro CLT com previsibilidade de custo e resultado em até 90 dias.
            </p>
            <a href="#cadastro" className="inline-flex items-center gap-2 mt-8 font-bold text-[14px]"
              style={{ background: "#c48b30", color: "#1A1A1A", padding: "16px 32px", borderRadius: 2 }}>
              Quero agendar uma conversa →
            </a>
          </div>
        </section>

        {/* FAIXA DE MÉTRICAS */}
        <section className="bg-[#1A1A1A]" style={{ padding: "28px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#ffffff15]">
              {[
                ["90 dias", "para operação estabilizada"],
                ["3 planos", "Start, Gestão e Premium"],
                ["2 modalidades", "Full e Assistido"],
                ["12 meses", "contrato mínimo"],
              ].map(([v, l], i) => (
                <div key={l} className={`px-4 ${i === 0 ? "md:pl-0" : ""}`}>
                  <div className="font-mono-tech text-[28px] lg:text-[32px] text-[#c48b30] leading-none">{v}</div>
                  <div className="text-[12px] text-[#cec9b8] mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROMESSA DE VALOR */}
        <section className="bg-[#f4f1ec]" style={{ padding: "80px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#005a54]">· EM ATÉ 90 DIAS, VOCÊ TERÁ</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {[
                { t: "Operação rodando sem CLT", d: "Fluxo de caixa diário e DRE gerencial mensal entregues no prazo, sem depender de profissional interno." },
                { t: "Processos documentados", d: "Rotinas auditáveis, aprovação dupla e trilha completa de auditoria — do documento à baixa contábil." },
                { t: "Sócio fora da execução", d: "Você aprova. A Cluny executa. Sua atenção volta para o que gera receita." },
                { t: "Custo inferior à contratação CLT", d: "Operação que substitui analista interno com previsibilidade de custo e sem encargos trabalhistas." },
              ].map((c) => (
                <div key={c.t} className="bg-white rounded-[4px] p-7" style={{ border: "1px solid #e8e4db", borderLeft: "3px solid #c48b30" }}>
                  <h3 className="font-display font-semibold text-[18px] text-[#1A1A1A]">{c.t}</h3>
                  <p className="text-[14px] text-[#6e7b7c] mt-2 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODALIDADES */}
        <section className="bg-white" style={{ padding: "64px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#005a54]">· MODALIDADES / COMO FUNCIONA</span>
            <h2 className="font-display font-semibold text-[32px] lg:text-[40px] leading-[1.05] text-[#1A1A1A] mt-4 max-w-3xl">
              Full ou Assistido.<br /><span className="italic font-normal text-[#c48b30]">Você escolhe a governança.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* FULL */}
              <div className="rounded-[4px] p-8" style={{ background: "#1F3D2E" }}>
                <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: "#c48b30" }}>MODALIDADE FULL</span>
                <h3 className="font-display font-semibold text-[24px] text-[#f4f1ec] mt-2">Cluny executa</h3>
                <p className="text-[15px] mt-3 leading-relaxed" style={{ color: "rgba(244,241,236,0.85)" }}>
                  A Cluny acessa o banco do cliente mediante procuração específica e executa todos os pagamentos aprovados. 100% da rotina financeira terceirizada.
                </p>
                <div className="text-[10px] font-bold tracking-wider uppercase mt-6 mb-3" style={{ color: "#c48b30" }}>Quando indicar</div>
                <ul className="space-y-2">
                  {["Sócio quer sair 100% da operação financeira", "Empresa sem profissional interno disponível", "Prioridade em velocidade e centralização"].map((x) => (
                    <li key={x} className="flex gap-2 text-[13px]" style={{ color: "#cec9b8" }}>
                      <span style={{ color: "#c48b30" }}>→</span>{x}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ASSISTIDO */}
              <div className="rounded-[4px] p-8 bg-[#f4f1ec]" style={{ border: "1px solid #e8e4db" }}>
                <span className="text-[9px] font-bold tracking-wider uppercase text-[#6e7b7c]">MODALIDADE ASSISTIDO</span>
                <h3 className="font-display font-semibold text-[24px] text-[#1A1A1A] mt-2">Cliente executa</h3>
                <p className="text-[15px] mt-3 leading-relaxed text-[#1A1A1A]/80">
                  A Cluny prepara, classifica, agenda e submete aprovação. O cliente acessa o banco e efetiva o pagamento. Cluny não possui poderes de movimentação bancária.
                </p>
                <div className="text-[10px] font-bold tracking-wider uppercase mt-6 mb-3 text-[#6e7b7c]">Quando indicar</div>
                <ul className="space-y-2">
                  {["Governança bancária restritiva ou conselho deliberativo", "Sociedade com múltiplos sócios e aprovação interna", "Empresas em M&A, due diligence ou auditoria externa", "Início gradual da terceirização"].map((x) => (
                    <li key={x} className="flex gap-2 text-[13px] text-[#1A1A1A]">
                      <span style={{ color: "#c48b30" }}>→</span>{x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TABELA DE FLUXO */}
            <div className="mt-12 rounded-[4px] overflow-hidden bg-[#f4f1ec]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-[#1A1A1A] text-[#f4f1ec]">
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[70px]">Etapa</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Descrição</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[140px]">Full</th>
                      <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[140px]">Assistido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FLUXO.map(([n, d, full, ass, dest], i) => (
                      <tr key={n}
                        style={dest
                          ? { background: "rgba(196,139,48,0.03)", borderLeft: "3px solid #c48b30" }
                          : { background: i % 2 === 0 ? "#ffffff" : "#f4f1ec" }}>
                        <td className="px-4 py-3 font-mono-tech text-[13px] text-[#1F3D2E]">{n}</td>
                        <td className="px-4 py-3 text-[13px] text-[#1A1A1A]">{d}</td>
                        <td className={`px-4 py-3 text-[13px] ${dest ? "font-bold text-[#005a54]" : "text-[#1A1A1A]"}`}>{full}</td>
                        <td className={`px-4 py-3 text-[13px] ${dest ? "font-bold text-[#1F3D2E]" : "text-[#1A1A1A]"}`}>{ass}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <span className="inline-block px-5 py-2 text-[13px] text-[#6e7b7c] border border-[#e8e4db] rounded-[2px]">
                A etapa 7 é a única diferença entre as duas modalidades.
              </span>
            </div>
          </div>
        </section>

        {/* 3 PLANOS */}
        <section className="bg-[#f4f1ec]" style={{ padding: "80px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#005a54]">· PLANOS / ESCOLHA O NÍVEL</span>
            <h2 className="font-display font-semibold text-[32px] lg:text-[40px] leading-[1.05] text-[#1A1A1A] mt-4 max-w-3xl">
              Três níveis.<br /><span className="italic font-normal text-[#c48b30]">Um único método.</span>
            </h2>
            <p className="text-[16px] text-[#1A1A1A]/80 mt-5 leading-relaxed max-w-2xl">
              A metodologia Cluny é a mesma nos três. O escopo e a profundidade de entrega variam conforme o faturamento e a maturidade da operação.
            </p>
          </div>

          <div className="mt-8">
            <ModalidadeToggle modalidade={modalidade} setModalidade={setModalidade} sticky />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlanCard plano="start" modalidade={modalidade} />
              <PlanCard plano="gestao" modalidade={modalidade} />
              <PlanCard plano="premium" modalidade={modalidade} />
            </div>

            <div className="mt-10 rounded-[4px] p-8 lg:px-10 grid md:grid-cols-[1fr_auto] items-center gap-6" style={{ background: "#1A1A1A" }}>
              <div>
                <h3 className="font-display font-semibold text-[22px] text-[#f4f1ec]">Não sabe qual plano escolher?</h3>
                <p className="text-[14px] text-[#6e7b7c] mt-2 leading-relaxed">
                  Faça o diagnóstico em 60 segundos e indicamos o caminho técnico correto para a sua operação.
                </p>
              </div>
              <Link to="/" hash="diagnostico" className="px-6 py-3 rounded-[2px] font-bold text-[14px] whitespace-nowrap" style={{ background: "#c48b30", color: "#1A1A1A" }}>
                Diagnóstico gratuito →
              </Link>
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="bg-white" style={{ padding: "80px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#005a54]">· COMPARATIVO / ESCOPO DETALHADO</span>
            <h2 className="font-display font-semibold text-[32px] lg:text-[40px] leading-[1.05] text-[#1A1A1A] mt-4 max-w-3xl">
              O que cada plano <span className="italic font-normal text-[#c48b30]">entrega.</span>
            </h2>

            <div className="mt-10 overflow-x-auto bg-white border border-[#e8e4db] rounded-[4px]">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#1A1A1A] text-[#f4f1ec]">
                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider">Entregável</th>
                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider w-[140px] text-center">Start</th>
                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider w-[160px] text-center">Gestão</th>
                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider w-[180px] text-center">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVO.map((g) => (
                    <Fragment key={g.cat}>
                      <tr className="bg-[#f4f1ec]" style={{ borderBottom: "2px solid #c48b30" }}>
                        <td colSpan={4} className="px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#6e7b7c]">{g.cat}</td>
                      </tr>
                      {g.rows.map(([n, s, gestao, prem], i) => (
                        <tr key={g.cat + n} style={{ background: i % 2 === 0 ? "#ffffff" : "#fbfaf6" }}>
                          <td className="px-5 py-3 text-[13px] text-[#1A1A1A]">{n}</td>
                          <td className="px-5 py-3 text-center"><CompCell v={s} /></td>
                          <td className="px-5 py-3 text-center"><CompCell v={gestao} /></td>
                          <td className="px-5 py-3 text-center"><CompCell v={prem} /></td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-[#6e7b7c] mt-4">
              Itens fora de escopo em todos os planos: folha de pagamento, apuração contábil, captação de crédito, auditoria externa, valuation e M&A.
            </p>
          </div>
        </section>

        {/* ONBOARDING */}
        <section className="bg-[#f4f1ec]" style={{ padding: "80px 0" }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#005a54]">· IMPLANTAÇÃO / COMO COMEÇAMOS</span>
            <h2 className="font-display font-semibold text-[32px] lg:text-[40px] leading-[1.05] text-[#1A1A1A] mt-4 max-w-3xl">
              Quatro fases. <span className="italic font-normal text-[#c48b30]">Método público.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
              {FASES.map((f) => (
                <div key={f.n} className="bg-white rounded-[4px] p-6 relative" style={{ border: "1px solid #e8e4db", borderTop: "3px solid #c48b30" }}>
                  <div className="font-mono-tech text-[24px] text-[#c48b30] leading-none">{f.n}</div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-[#6e7b7c] mt-3">{f.sem}</div>
                  <h3 className="font-display font-semibold text-[20px] text-[#1A1A1A] mt-1">{f.titulo}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {f.items.map((it) => (
                      <li key={it} className="flex gap-2 text-[12px] text-[#1A1A1A] leading-snug">
                        <span style={{ color: "#c48b30" }}>→</span><span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#1A1A1A] py-4 px-6 rounded-[4px] text-center">
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#cec9b8]">
                Start: 30 dias <span className="text-[#c48b30] mx-2">·</span> Gestão: 45 dias <span className="text-[#c48b30] mx-2">·</span> Premium: 60 dias
              </span>
            </div>
          </div>
        </section>

        {/* CALCULADORA */}
        <div id="calculadora">
          <Calculadora />
        </div>

        {/* CADASTRO */}
        <Cadastro />

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
