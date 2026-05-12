import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Calculadora, Depoimentos, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos/bpo")({
  head: () => ({
    meta: [
      { title: "BPO Financeiro — Cluny" },
      { name: "description", content: "BPO Financeiro Cluny: 3 planos (Start, Gestão, Premium) em modalidades Full e Assistido." },
    ],
  }),
  component: BpoPage,
});

type Modalidade = "full" | "assistido";

const PRECOS = {
  start:   { full: "4.800",  assistido: "3.900"  },
  gestao:  { full: "7.200",  assistido: "6.300"  },
  premium: { full: "12.500", assistido: "10.900" },
};

const ESCOPO_BASE = {
  start: {
    "Contas a Pagar": [
      "Cadastro e classificação de fornecedores",
      "Programação e agendamento de pagamentos",
      "Gestão de contratos recorrentes (básica)",
    ],
    "Contas a Receber": [
      "Emissão de NF e boletos",
      "Régua de cobrança automatizada (padrão)",
      "Gestão de inadimplência — relatório mensal",
    ],
    "Tesouraria": [
      "Conciliação bancária diária",
      "Fluxo de caixa realizado (semanal)",
      "Fluxo de caixa projetado 30 dias",
    ],
    "Relatórios": [
      "DRE gerencial mensal padrão",
      "5 KPIs financeiros padrão",
      "Relatório de inadimplência e aging mensal",
    ],
    "Reuniões": [
      "Reunião operacional semanal (20 min)",
      "Reunião de resultado mensal (60 min)",
      "SLA: resposta em até 24h úteis",
    ],
  },
  gestao: {
    "Contas a Pagar": [
      "Tudo do Start",
      "Workflow de aprovação dupla",
      "Gestão de contratos recorrentes (completa)",
    ],
    "Contas a Receber": [
      "Régua de cobrança customizada",
      "Gestão ativa de inadimplência (D+30)",
    ],
    "Tesouraria": [
      "Fluxo de caixa realizado diário",
      "Fluxo de caixa projetado 60 dias",
      "Gestão básica de aplicações financeiras",
    ],
    "Relatórios": [
      "DRE gerencial por centro de custo",
      "Balanço gerencial trimestral",
      "10 KPIs customizados",
      "Relatório de inadimplência quinzenal",
    ],
    "Reuniões": [
      "Reunião de resultado mensal (90 min)",
      "Analista + coordenador Cluny presentes",
      "SLA: resposta em até 8h úteis",
    ],
  },
  premium: {
    "Contas a Pagar": [
      "Tudo do Gestão",
      "Workflow de aprovação multi-nível",
    ],
    "Contas a Receber": [
      "Régua de cobrança customizada + ativa",
      "Gestão ativa de inadimplência + apoio jurídico",
    ],
    "Tesouraria": [
      "Conciliação bancária diária multi-conta (até 15)",
      "Fluxo de caixa projetado 90 dias rolante",
      "Gestão completa de aplicações financeiras",
    ],
    "Relatórios": [
      "DRE gerencial por projeto/cliente",
      "Balanço gerencial mensal",
      "15+ KPIs em dashboard (Power BI/Looker)",
      "Relatório de inadimplência semanal",
    ],
    "Reuniões": [
      "Reunião quinzenal de resultado (60 min)",
      "Coordenador dedicado + sócio Cluny trimestral",
      "SLA: resposta em até 4h úteis",
    ],
    "Inclui exclusivamente": [
      "Analista financeiro dedicado",
      "Coordenador de conta dedicado",
      "Auditoria interna trimestral",
      "Manual de processos do cliente",
    ],
  },
} as const;

const NAO_INCLUI = {
  start: ["Workflow de aprovação dupla", "Balanço gerencial", "Dashboard de KPIs customizados", "Analista dedicado"],
  gestao: ["Balanço gerencial mensal", "Dashboard avançado (BI)", "Analista dedicado exclusivo", "Auditoria interna"],
  premium: [],
};

const SETUP = { start: "R$ 3.500", gestao: "R$ 6.000", premium: "R$ 12.000" };

const ICP = {
  start: "R$ 2M a R$ 4,8M faturamento anual",
  gestao: "R$ 4,8M a R$ 8M faturamento anual",
  premium: "R$ 8M a R$ 30M faturamento anual",
};

function PlanCard({ plano, modalidade }: { plano: keyof typeof PRECOS; modalidade: Modalidade }) {
  const dark = plano === "gestao";
  const txt = dark ? "#f4f1ec" : "#1A1A1A";
  const sub = dark ? "#cec9b8" : "#6e7b7c";
  const titulos = { start: "BPO Start", gestao: "BPO Gestão", premium: "BPO Premium" };
  const subt = modalidade === "full"
    ? "Operação completa com programação bancária"
    : "Operação completa — você executa no banco";
  const escopo = ESCOPO_BASE[plano] as Record<string, readonly string[]>;

  return (
    <div className="relative p-8 rounded-[4px] flex flex-col h-full"
      style={{ background: dark ? "#1F3D2E" : "#ffffff", border: dark ? "none" : "1px solid #e8e4db" }}>
      {dark && <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full pointer-events-none" style={{ background: "rgba(196,139,48,0.15)", transform: "translate(30%,-30%)" }} />}

      <div className="flex items-center gap-2 mb-2 relative">
        <span className="label-mono" style={{ color: sub }}>BPO · {plano.toUpperCase()}</span>
        {plano === "gestao" && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· MAIS CONTRATADO</span>}
      </div>
      <p className="text-[11px] mb-3" style={{ color: sub }}>{ICP[plano]}</p>

      <h3 className="font-display font-semibold text-[28px]" style={{ color: txt }}>{titulos[plano]}</h3>
      <p className="font-display italic text-[14px] mt-1" style={{ color: sub }}>{subt}</p>

      <div className="mt-6 transition-opacity duration-200" key={modalidade + plano}>
        <span className="text-[12px]" style={{ color: sub }}>a partir de </span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-mono-tech text-[40px]" style={{ color: txt }}>R$ {PRECOS[plano][modalidade]}</span>
          <span className="text-[14px]" style={{ color: sub }}>/mês</span>
        </div>
        <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-[2px]"
          style={modalidade === "full"
            ? { background: dark ? "rgba(196,139,48,0.18)" : "rgba(0,90,84,0.10)", color: dark ? "#c48b30" : "#005a54" }
            : { background: dark ? "rgba(206,201,184,0.15)" : "rgba(110,123,124,0.12)", color: dark ? "#cec9b8" : "#6e7b7c" }}>
          Modalidade {modalidade === "full" ? "Full" : "Assistido"}
        </span>
      </div>

      <div className="my-6 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db" }} />

      <div className="label-mono mb-3" style={{ color: sub }}>ESCOPO INCLUÍDO</div>
      <div className="space-y-4 flex-1">
        {Object.entries(escopo).map(([cat, items]) => (
          <div key={cat}>
            <div className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: dark ? "#cec9b8" : "#6e7b7c" }}>{cat}</div>
            <ul className="space-y-1">
              {items.map((e) => (
                <li key={e} className="flex gap-2 text-[13px]" style={{ color: txt }}>
                  <span style={{ color: "#c48b30" }}>→</span>{e}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {NAO_INCLUI[plano].length > 0 && (
        <div className="mt-5">
          <div className="label-mono mb-2" style={{ color: sub }}>NÃO INCLUI</div>
          <ul className="space-y-1">
            {NAO_INCLUI[plano].map((e) => (
              <li key={e} className="text-[12px]" style={{ color: sub }}>— {e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-[12px] pt-4 mt-5 mb-4 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db", color: sub }}>
        Setup de implantação: {SETUP[plano]}
      </div>

      <a href="#cadastro" className="w-full text-center py-3 rounded-[2px] font-bold text-[13px] transition-all"
        style={
          plano === "gestao" ? { background: "#c48b30", color: "#1A1A1A" }
          : plano === "premium" ? { background: "#005a54", color: "#f4f1ec" }
          : { background: "transparent", color: "#005a54", border: "2px solid #005a54" }
        }>
        Quero o {titulos[plano]} →
      </a>
    </div>
  );
}

function StickyToggle({ modalidade, setModalidade }: { modalidade: Modalidade; setModalidade: (m: Modalidade) => void }) {
  return (
    <div className="sticky top-[80px] z-40 bg-[#f4f1ec] border-b border-[#e8e4db] py-3.5">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] font-bold text-[#1A1A1A]">Escolha a modalidade:</span>
        <div className="flex gap-0">
          {(["full", "assistido"] as const).map((k) => (
            <button key={k} onClick={() => setModalidade(k)}
              title={k === "full" ? "Cluny acessa o banco e executa os pagamentos" : "Cluny prepara tudo. Você executa no banco"}
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
          {modalidade === "full" ? "Programação bancária pela Cluny" : "Cliente executa no internet banking"}
        </span>
      </div>
    </div>
  );
}

const FLUXO: Array<[string, string, string, string, boolean]> = [
  ["1", "Receber documento (NF, boleto)", "Cluny ✓", "Cluny ✓", false],
  ["2", "Conferir e classificar", "Cluny ✓", "Cluny ✓", false],
  ["3", "Lançar no sistema", "Cluny ✓", "Cluny ✓", false],
  ["4", "Programar pagamento", "Cluny ✓", "Cluny ✓", false],
  ["5", "Submeter aprovação ao cliente", "Cluny ✓", "Cluny ✓", false],
  ["6", "Aprovar lote", "Cliente ✓", "Cliente ✓", false],
  ["7", "Executar pagamento no banco", "Cluny ✓", "Cliente ✓", true],
  ["8", "Conciliar baixa", "Cluny ✓", "Cluny ✓", false],
  ["9", "Registrar comprovante", "Cluny ✓", "Cluny ✓", false],
];

const COMPARATIVO: Array<{ cat: string; rows: Array<[string, boolean | string, boolean | string, boolean | string]> }> = [
  { cat: "Contas a Pagar", rows: [
    ["Programação e agendamento", true, true, true],
    ["Workflow de aprovação dupla", false, true, true],
    ["Workflow multi-nível", false, false, true],
    ["Gestão de contratos recorrentes", "Básica", "Completa", "Completa"],
  ]},
  { cat: "Contas a Receber", rows: [
    ["Emissão de NF e boletos", true, true, true],
    ["Régua de cobrança", "Padrão", "Customizada", "Customizada + ativa"],
    ["Apoio jurídico em inadimplência", false, false, true],
  ]},
  { cat: "Tesouraria", rows: [
    ["Conciliação bancária diária", true, true, "Multi-conta (até 15)"],
    ["Fluxo de caixa projetado", "30 dias", "60 dias", "90 dias rolante"],
    ["Gestão de aplicações financeiras", false, "Básica", "Completa"],
  ]},
  { cat: "Relatórios", rows: [
    ["DRE gerencial", "Padrão", "Por centro de custo", "Por projeto/cliente"],
    ["Balanço gerencial", false, "Trimestral", "Mensal"],
    ["KPIs", "5 padrão", "10 customizados", "15+ em dashboard BI"],
  ]},
  { cat: "SLA e Reuniões", rows: [
    ["SLA de resposta", "24h", "8h", "4h"],
    ["Reunião de resultado", "Mensal 60min", "Mensal 90min", "Quinzenal 60min"],
    ["Sócio Cluny presente", false, false, "Trimestral*"],
  ]},
];

function CompCell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="text-[#005a54] text-[16px]">✓</span>;
  if (v === false) return <span className="text-[#cec9b8]">—</span>;
  return <span className="text-[12px] text-[#6e7b7c]">{v}</span>;
}

function BpoPage() {
  const [modalidade, setModalidade] = useState<Modalidade>("full");

  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        {/* HERO */}
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· BPO FINANCEIRO / EXECUÇÃO</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Tiramos o sócio da<br /><span className="italic font-normal text-[#c48b30]">operação financeira.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Operação financeira completa, executada pela equipe Cluny, dimensionada para o estágio da sua empresa. Substitui a contratação de analista financeiro CLT com previsibilidade de custo e resultado em até 90 dias.
            </p>
          </div>

          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 mt-12">
            <div className="bg-[#1A1A1A] rounded-[4px] p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                ["90 dias", "para operação estabilizada"],
                ["3 planos", "Start, Gestão e Premium"],
                ["2 modalidades", "Full e Assistido"],
                ["12 meses", "contrato mínimo"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-mono-tech text-[28px] lg:text-[32px] text-[#c48b30] leading-none">{v}</div>
                  <div className="text-[12px] text-[#cec9b8] mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StickyToggle modalidade={modalidade} setModalidade={setModalidade} />

        {/* MODALIDADES — TABELA DE FLUXO */}
        <section className="py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-10 max-w-3xl">
              <span className="label-mono text-[#005a54]">· MODALIDADES / COMO FUNCIONA</span>
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[#1F3D2E] mt-4">
                Uma diferença. <span className="italic text-[#c48b30]">Uma etapa.</span>
              </h2>
              <p className="text-[15px] text-[#1A1A1A]/80 mt-5 leading-relaxed">
                As duas modalidades são idênticas em 8 das 9 etapas do processo. A diferença está em quem executa o pagamento no banco.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-[#1A1A1A] text-[#f4f1ec]">
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[60px]">Etapa</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Descrição</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[140px]">Full</th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider w-[140px]">Assistido</th>
                  </tr>
                </thead>
                <tbody>
                  {FLUXO.map(([n, d, full, ass, dest], i) => (
                    <tr key={n}
                      style={dest
                        ? { background: "rgba(196,139,48,0.06)", borderLeft: "3px solid #c48b30" }
                        : { background: i % 2 === 0 ? "#ffffff" : "#f4f1ec" }}>
                      <td className="px-4 py-3 font-mono-tech text-[13px] text-[#1F3D2E]">{n}</td>
                      <td className="px-4 py-3 text-[13px] text-[#1A1A1A]">{d}</td>
                      <td className="px-4 py-3 text-[13px] text-[#005a54] font-bold">{full}</td>
                      <td className="px-4 py-3 text-[13px] text-[#1F3D2E] font-bold">{ass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <span className="inline-block px-5 py-2.5 text-[13px] font-bold text-[#6e7b7c] border border-[#e8e4db] rounded-[2px]">
                A etapa 7 é a única diferença entre Full e Assistido.
              </span>
            </div>
          </div>
        </section>

        {/* 3 PLANOS */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· PLANOS / BPO FINANCEIRO</span>
              <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
                Três níveis. <span className="italic text-[#c48b30]">Um único método.</span>
              </h2>
              <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
                Escolha conforme a maturidade da sua operação. A metodologia Cluny é a mesma nos três — o escopo e a profundidade de entrega é que variam.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlanCard plano="start" modalidade={modalidade} />
              <PlanCard plano="gestao" modalidade={modalidade} />
              <PlanCard plano="premium" modalidade={modalidade} />
            </div>

            <div className="mt-6 bg-[#1A1A1A] py-5 px-6 text-center">
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#f4f1ec]">
                Diagnóstico completo · 30 a 60 dias conforme plano → Entrega: operação rodando + primeiro fechamento mensal
              </span>
            </div>

            <div className="mt-10 bg-white border border-[#e8e4db] rounded-[4px] p-8 lg:p-10 grid md:grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <h3 className="font-display font-semibold text-[22px] text-[#1A1A1A]">Não sabe qual escolher?</h3>
                <p className="text-[14px] text-[#6e7b7c] mt-2 leading-relaxed">
                  Faça o diagnóstico gratuito em 60 segundos e indicamos o plano técnico correto para a sua operação.
                </p>
              </div>
              <Link to="/" hash="diagnostico" className="px-6 py-3 rounded-[2px] font-bold text-[14px] whitespace-nowrap" style={{ background: "#c48b30", color: "#1A1A1A" }}>
                Fazer diagnóstico gratuito →
              </Link>
            </div>
          </div>
        </section>

        {/* COMPARATIVO COMPLETO */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· COMPARATIVO / ESCOPO DETALHADO</span>
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[#1F3D2E] mt-4">
                O que cada plano <span className="italic text-[#c48b30]">entrega.</span>
              </h2>
            </div>

            <div className="overflow-x-auto bg-white border border-[#e8e4db] rounded-[4px]">
              <table className="w-full text-left border-collapse min-w-[720px]">
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
                    <>
                      <tr key={g.cat} className="bg-[#f4f1ec]" style={{ borderBottom: "2px solid #c48b30" }}>
                        <td colSpan={4} className="px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#6e7b7c]">{g.cat}</td>
                      </tr>
                      {g.rows.map(([n, s, gestao, prem], i) => {
                        const sla = g.cat === "SLA e Reuniões";
                        return (
                          <tr key={g.cat + n} style={{
                            background: sla ? "rgba(31,61,46,0.08)" : (i % 2 === 0 ? "#ffffff" : "#fbfaf6"),
                          }}>
                            <td className="px-5 py-3 text-[13px] font-bold text-[#1A1A1A]">{n}</td>
                            <td className="px-5 py-3 text-center"><CompCell v={s} /></td>
                            <td className="px-5 py-3 text-center"><CompCell v={gestao} /></td>
                            <td className="px-5 py-3 text-center"><CompCell v={prem} /></td>
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-[#6e7b7c] mt-3">
              * No plano Premium, o sócio Cluny participa trimestralmente das reuniões de resultado.
            </p>
          </div>
        </section>

        {/* CALCULADORA BPO vs CLT */}
        <Calculadora />

        {/* SLAs E GOVERNANÇA */}
        <section className="py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-10 max-w-3xl">
              <span className="label-mono text-[#005a54]">· OPERAÇÃO / SLAs E PROCESSOS</span>
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[#1F3D2E] mt-4">
                Método público. <span className="italic text-[#c48b30]">SLA contratual.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { p: "Start", sla: "24h", reu: "Mensal 60min", setup: "30 dias" },
                { p: "Gestão", sla: "8h", reu: "Mensal 90min", setup: "45 dias" },
                { p: "Premium", sla: "4h", reu: "Quinzenal 60min", setup: "60 dias" },
              ].map((s) => (
                <div key={s.p} className="border border-[#e8e4db] rounded-[4px] p-6 bg-[#f4f1ec]">
                  <span className="label-mono text-[#6e7b7c]">BPO · {s.p.toUpperCase()}</span>
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    <div>
                      <div className="font-mono-tech text-[20px] text-[#1F3D2E]">{s.sla}</div>
                      <div className="text-[10px] text-[#6e7b7c] mt-1">SLA</div>
                    </div>
                    <div>
                      <div className="font-mono-tech text-[14px] text-[#1F3D2E]">{s.reu}</div>
                      <div className="text-[10px] text-[#6e7b7c] mt-1">Reunião</div>
                    </div>
                    <div>
                      <div className="font-mono-tech text-[14px] text-[#1F3D2E]">{s.setup}</div>
                      <div className="text-[10px] text-[#6e7b7c] mt-1">Setup</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {[
                ["Previsibilidade", "calendário e prazos cumpridos com rigor"],
                ["Conformidade", "rotinas auditáveis, dupla aprovação"],
                ["Inteligência operacional", "informação que vira decisão"],
                ["Eficiência de custo", "substitui CLT sem perda de qualidade"],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3 p-5 bg-[#f4f1ec] rounded-[2px]">
                  <span className="text-[#c48b30] font-mono-tech mt-0.5">→</span>
                  <div>
                    <span className="font-bold text-[14px] text-[#1F3D2E]">{t}: </span>
                    <span className="text-[14px] text-[#1A1A1A]/75">{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Cadastro />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
