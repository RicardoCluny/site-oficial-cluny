import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Nav, Footer, Cadastro, FAQ } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos/bpo")({
  head: () => ({
    meta: [
      { title: "BPO Financeiro — Cluny Gestão Empresarial" },
      { name: "description", content: "Operação financeira completa para PMEs. Planos Start, Gestão e Premium nas modalidades Full e Assistido. Substitui analista CLT com método e previsibilidade." },
    ],
  }),
  component: BpoPage,
});

/* ── helpers ── */
function useCounterUp(to: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return { ref, val };
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── sub-components ── */

function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-5 border-r border-white/10 last:border-r-0">
      <span className="font-mono-tech text-[32px] text-[#c48b30] leading-none">{value}</span>
      <span className="text-[12px] text-[#6e7b7c] text-center">{label}</span>
    </div>
  );
}

function ModalidadeToggle({
  value,
  onChange,
  sticky,
}: {
  value: "full" | "assistido";
  onChange: (v: "full" | "assistido") => void;
  sticky?: boolean;
}) {
  return (
    <div
      className={`bg-[#f4f1ec] border-b border-[#e8e4db] py-4 z-40 ${sticky ? "sticky top-[64px]" : ""}`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-wrap items-center gap-4">
        <span className="font-bold text-[13px] text-[#1A1A1A]">Escolha a modalidade:</span>
        <div className="flex gap-2">
          {(["full", "assistido"] as const).map((m) => (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-wider border rounded-[2px] transition-all duration-200 ${
                value === m
                  ? "bg-[#005a54] text-[#f4f1ec] border-[#005a54]"
                  : "bg-white text-[#6e7b7c] border-[#e8e4db] hover:border-[#005a54]"
              }`}
            >
              {m === "full" ? "FULL" : "ASSISTIDO"}
            </button>
          ))}
        </div>
        <span
          className={`ml-auto px-3 py-1 rounded-[2px] text-[11px] font-bold ${
            value === "full"
              ? "bg-[#1F3D2E] text-[#f4f1ec]"
              : "bg-[#cec9b8] text-[#1A1A1A]"
          }`}
        >
          {value === "full"
            ? "Programação bancária pela Cluny"
            : "Cliente executa no internet banking"}
        </span>
      </div>
    </div>
  );
}

function PromessaCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white border border-[#e8e4db] rounded-[4px] p-7 border-l-[3px] border-l-[#c48b30]">
      <h3 className="font-display font-semibold text-[17px] text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-[13px] text-[#6e7b7c] leading-relaxed">{desc}</p>
    </div>
  );
}

const FLUXO = [
  { etapa: "01", desc: "Receber documento (NF, boleto)", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "02", desc: "Conferir e classificar", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "03", desc: "Lançar no sistema", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "04", desc: "Programar pagamento", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "05", desc: "Submeter aprovação ao cliente", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "06", desc: "Aprovar lote", full: "Cliente", assistido: "Cliente", destaque: false },
  { etapa: "07", desc: "Executar pagamento no banco", full: "Cluny ✓", assistido: "Cliente ✓", destaque: true },
  { etapa: "08", desc: "Conciliar baixa", full: "Cluny", assistido: "Cluny", destaque: false },
  { etapa: "09", desc: "Registrar comprovante", full: "Cluny", assistido: "Cluny", destaque: false },
];

type Plano = {
  key: string;
  nome: string;
  badge: string;
  destaque?: boolean;
  icp: string;
  subtituloFull: string;
  subtituloAssistido: string;
  escopo: { grupo: string; items: string[] }[];
  naoInclui: string[];
  setup: string;
  volume: string;
};

const PLANOS: Plano[] = [
  {
    key: "start",
    nome: "BPO Start",
    badge: "BPO · START",
    icp: "Faturamento R$ 2M a R$ 4,8M/ano · Simples ou Presumido",
    subtituloFull: "Operação completa com programação bancária",
    subtituloAssistido: "Operação completa — você executa no banco",
    escopo: [
      { grupo: "CONTAS A PAGAR", items: ["Cadastro e classificação de fornecedores", "Programação e agendamento de pagamentos", "Gestão de contratos recorrentes (básica)"] },
      { grupo: "CONTAS A RECEBER", items: ["Emissão de NF e boletos", "Régua de cobrança automatizada padrão", "Gestão de inadimplência — relatório mensal (D+30)"] },
      { grupo: "TESOURARIA", items: ["Conciliação bancária diária (até 3 contas)", "Fluxo de caixa realizado semanal", "Fluxo de caixa projetado 30 dias"] },
      { grupo: "RELATÓRIOS", items: ["DRE gerencial mensal padrão", "5 KPIs financeiros padrão", "Relatório de inadimplência e aging mensal"] },
      { grupo: "ATENDIMENTO", items: ["SLA de resposta: 24h úteis", "Reunião operacional semanal (20 min)", "Reunião de resultado mensal (60 min — analista Cluny)"] },
    ],
    naoInclui: ["Workflow de aprovação dupla", "Balanço gerencial", "KPIs customizados", "Analista dedicado ou parcial"],
    setup: "Setup de implantação: R$ 3.500",
    volume: "Até 150 lançamentos/mês · até 3 contas bancárias",
  },
  {
    key: "gestao",
    nome: "BPO Gestão",
    badge: "BPO · GESTÃO",
    destaque: true,
    icp: "Faturamento R$ 4,8M a R$ 8M/ano · Presumido",
    subtituloFull: "Operação completa com programação bancária",
    subtituloAssistido: "Operação completa — você executa no banco",
    escopo: [
      { grupo: "CONTAS A PAGAR", items: ["Tudo do Start", "Workflow de aprovação dupla", "Gestão de contratos recorrentes completa"] },
      { grupo: "CONTAS A RECEBER", items: ["Régua de cobrança customizada", "Gestão ativa de inadimplência (D+30)"] },
      { grupo: "TESOURARIA", items: ["Fluxo de caixa realizado diário", "Fluxo de caixa projetado 60 dias", "Gestão básica de aplicações financeiras", "Até 6 contas bancárias"] },
      { grupo: "RELATÓRIOS", items: ["DRE gerencial por centro de custo", "Balanço gerencial trimestral", "10 KPIs customizados", "Relatório de inadimplência quinzenal"] },
      { grupo: "ATENDIMENTO", items: ["SLA de resposta: 8h úteis", "Reunião mensal 90 min (analista + coordenador Cluny)", "Revisão trimestral de SLA e NPS"] },
    ],
    naoInclui: ["Dashboard BI avançado", "Analista dedicado exclusivo", "Auditoria interna", "Balanço gerencial mensal"],
    setup: "Setup de implantação: R$ 6.000",
    volume: "Até 400 lançamentos/mês · até 6 contas",
  },
  {
    key: "premium",
    nome: "BPO Premium",
    badge: "BPO · PREMIUM",
    icp: "Faturamento R$ 8M a R$ 30M/ano · Presumido ou Real",
    subtituloFull: "Operação dedicada com programação bancária",
    subtituloAssistido: "Operação dedicada — você executa no banco",
    escopo: [
      { grupo: "CONTAS A PAGAR", items: ["Tudo do Gestão", "Workflow de aprovação multi-nível com trilha de auditoria"] },
      { grupo: "CONTAS A RECEBER", items: ["Régua de cobrança customizada + ativa", "Gestão ativa de inadimplência + apoio jurídico"] },
      { grupo: "TESOURARIA", items: ["Conciliação bancária diária multi-conta (até 15)", "Fluxo de caixa projetado 90 dias rolante", "Gestão completa de aplicações financeiras"] },
      { grupo: "RELATÓRIOS", items: ["DRE gerencial por projeto e por cliente", "Balanço gerencial mensal", "15+ KPIs em dashboard Power BI / Looker Studio", "Relatório de inadimplência semanal"] },
      { grupo: "EXCLUSIVO PREMIUM", items: ["Analista financeiro dedicado", "Coordenador de conta dedicado", "Manual de processos do cliente", "Auditoria interna trimestral", "Integração com ERP corporativo (Totvs, SAP B1, Sankhya)"] },
      { grupo: "ATENDIMENTO", items: ["SLA de resposta: 4h úteis", "Reunião quinzenal 60 min (coordenador + sócio Cluny trimestral)"] },
    ],
    naoInclui: [],
    setup: "Setup de implantação: R$ 12.000",
    volume: "Até 1.000 lançamentos/mês · até 15 contas",
  },
];

function PlanoCard({ plano, modalidade }: { plano: Plano; modalidade: "full" | "assistido" }) {
  const dark = plano.destaque;
  return (
    <div
      className={`relative flex flex-col rounded-[4px] p-8 h-full ${
        dark
          ? "bg-[#1F3D2E] overflow-hidden"
          : "bg-white border border-[#e8e4db]"
      }`}
    >
      {dark && (
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "rgba(196,139,48,0.08)", transform: "translate(30%, -30%)" }}
        />
      )}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`label-mono ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>{plano.badge}</span>
        {plano.destaque && (
          <span className="bg-[#c48b30] text-[#1A1A1A] label-mono px-2 py-0.5 rounded-[2px]">· MAIS CONTRATADO</span>
        )}
      </div>
      <p className={`text-[11px] mb-5 font-mono-tech ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>{plano.icp}</p>
      <h2 className={`font-display font-semibold text-[28px] mb-1 ${dark ? "text-[#f4f1ec]" : "text-[#1A1A1A]"}`}>
        {plano.nome}
      </h2>
      <p className={`text-[13px] italic mb-6 ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>
        {modalidade === "full" ? plano.subtituloFull : plano.subtituloAssistido}
      </p>

      <div className={`h-px mb-6 ${dark ? "bg-white/10" : "bg-[#e8e4db]"}`} />

      <div className="flex-1 space-y-5">
        {plano.escopo.map((g) => (
          <div key={g.grupo}>
            <p className={`label-mono mb-2 ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>{g.grupo}</p>
            <ul className="space-y-1">
              {g.items.map((item) => (
                <li key={item} className={`flex gap-2 text-[13px] ${dark ? "text-[#f4f1ec]" : "text-[#1A1A1A]"}`}>
                  <span className="text-[#c48b30] font-bold flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {plano.naoInclui.length > 0 && (
          <div>
            <p className={`label-mono mb-2 ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>NÃO INCLUI</p>
            <ul className="space-y-1">
              {plano.naoInclui.map((item) => (
                <li key={item} className="flex gap-2 text-[12px] text-[#6e7b7c]">
                  <span>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={`mt-6 pt-4 border-t ${dark ? "border-white/10" : "border-[#e8e4db]"}`}>
        <p className={`text-[12px] mb-2 ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>{plano.volume}</p>
        <p className={`text-[11px] mb-5 ${dark ? "text-[#6e7b7c]" : "text-[#6e7b7c]"}`}>{plano.setup}</p>
        <button
          onClick={() => scrollTo("cadastro")}
          className={`w-full py-3 rounded-[2px] font-bold text-[13px] transition-all duration-200 ${
            plano.destaque
              ? "bg-[#c48b30] text-[#1A1A1A] hover:bg-[#b37d28]"
              : plano.key === "premium"
              ? "bg-[#005a54] text-[#f4f1ec] hover:bg-[#004a45]"
              : "border-2 border-[#005a54] text-[#005a54] hover:bg-[#005a54] hover:text-[#f4f1ec]"
          }`}
        >
          Quero conversar sobre o {plano.nome.replace("BPO ", "")} →
        </button>
      </div>
    </div>
  );
}

/* Tabela comparativa */
type Linha = { label: string; start: string; gestao: string; premium: string; categoria?: boolean };
const TABELA: Linha[] = [
  { label: "CONTAS A PAGAR", start: "", gestao: "", premium: "", categoria: true },
  { label: "Cadastro e classificação de fornecedores", start: "✓", gestao: "✓", premium: "✓" },
  { label: "Programação e agendamento", start: "✓", gestao: "✓", premium: "✓" },
  { label: "Workflow de aprovação dupla", start: "—", gestao: "✓", premium: "✓" },
  { label: "Gestão de contratos recorrentes", start: "Básica", gestao: "Completa", premium: "Completa" },
  { label: "CONTAS A RECEBER", start: "", gestao: "", premium: "", categoria: true },
  { label: "Emissão de NF e boletos", start: "✓", gestao: "✓", premium: "✓" },
  { label: "Régua de cobrança", start: "Padrão", gestao: "Customizada", premium: "Customizada + ativa" },
  { label: "Gestão de inadimplência D+30", start: "Relatório", gestao: "Ativa", premium: "Ativa + apoio jurídico" },
  { label: "TESOURARIA", start: "", gestao: "", premium: "", categoria: true },
  { label: "Conciliação bancária", start: "Diária (3 contas)", gestao: "Diária (6 contas)", premium: "Diária (até 15 contas)" },
  { label: "Fluxo de caixa realizado", start: "Semanal", gestao: "Diário", premium: "Diário" },
  { label: "Fluxo de caixa projetado", start: "30 dias", gestao: "60 dias", premium: "90 dias rolante" },
  { label: "Gestão de aplicações financeiras", start: "—", gestao: "Básica", premium: "Completa" },
  { label: "RELATÓRIOS", start: "", gestao: "", premium: "", categoria: true },
  { label: "DRE gerencial mensal", start: "Padrão", gestao: "Por centro de custo", premium: "Por projeto/cliente" },
  { label: "Balanço gerencial", start: "—", gestao: "Trimestral", premium: "Mensal" },
  { label: "KPIs financeiros", start: "5 padrão", gestao: "10 customizados", premium: "15+ dashboard" },
  { label: "Relatório inadimplência e aging", start: "Mensal", gestao: "Quinzenal", premium: "Semanal" },
  { label: "PROCESSOS", start: "", gestao: "", premium: "", categoria: true },
  { label: "SLA de resposta", start: "24h úteis", gestao: "8h úteis", premium: "4h úteis" },
  { label: "Workflow de aprovação dupla", start: "—", gestao: "✓", premium: "✓" },
  { label: "Manual de processos do cliente", start: "—", gestao: "—", premium: "✓" },
  { label: "Auditoria interna trimestral", start: "—", gestao: "—", premium: "✓" },
  { label: "EQUIPE", start: "", gestao: "", premium: "", categoria: true },
  { label: "Analista financeiro", start: "Compartilhado", gestao: "Parcial dedicado", premium: "Dedicado" },
  { label: "Coordenador da conta", start: "Compartilhado", gestao: "Compartilhado", premium: "Dedicado" },
  { label: "Participação do sócio Cluny", start: "—", gestao: "—", premium: "Trimestral" },
  { label: "REUNIÕES", start: "", gestao: "", premium: "", categoria: true },
  { label: "Reunião operacional semanal", start: "20 min", gestao: "20 min", premium: "20 min" },
  { label: "Reunião de resultado", start: "Mensal 60min", gestao: "Mensal 90min", premium: "Quinzenal 60min" },
  { label: "Revisão trimestral SLA/NPS", start: "✓", gestao: "✓", premium: "✓" },
  { label: "VOLUME", start: "", gestao: "", premium: "", categoria: true },
  { label: "Lançamentos mensais", start: "Até 150", gestao: "Até 400", premium: "Até 1.000" },
  { label: "Contas bancárias", start: "Até 3", gestao: "Até 6", premium: "Até 15" },
  { label: "Setup de implantação", start: "R$ 3.500", gestao: "R$ 6.000", premium: "R$ 12.000" },
  { label: "Prazo de implantação", start: "30 dias", gestao: "45 dias", premium: "60 dias" },
];

function CellVal({ v }: { v: string }) {
  if (v === "✓") return <span className="text-[#005a54] font-bold text-[15px]">✓</span>;
  if (v === "—") return <span className="text-[#cec9b8]">—</span>;
  if (v === "") return null;
  return <span>{v}</span>;
}

/* Calculadora CLT vs BPO */
function CalculadoraCLT() {
  const [salario, setSalario] = useState(5000);
  const [encargos] = useState(0.72); // encargos ~72% sobre salário
  const [bpo, setBpo] = useState(3500);

  const custoCLT = Math.round(salario * (1 + encargos));
  const economia = custoCLT - bpo;
  const economiaAnual = economia * 12;

  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <span className="label-mono text-[#6e7b7c]">· CALCULADORA / CLT vs BPO CLUNY</span>
        <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-3 text-[#1A1A1A] leading-[1.1]">
          Contratar CLT ou <em className="italic font-normal text-[#c48b30]">terceirizar com a Cluny?</em>
        </h2>
        <p className="text-[15px] text-[#1A1A1A]/75 mb-12 max-w-xl">
          Simule o custo real de um analista financeiro CLT versus o BPO Financeiro Cluny.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="space-y-8 bg-white rounded-[4px] p-8 border border-[#e8e4db]">
            <div>
              <label className="label-mono text-[#6e7b7c] block mb-1">Salário bruto do analista (R$)</label>
              <p className="text-[11px] text-[#6e7b7c] mb-3">Salário mensal sem encargos</p>
              <input
                type="range" min={2000} max={15000} step={500}
                value={salario}
                onChange={(e) => setSalario(+e.target.value)}
                className="w-full accent-[#005a54]"
              />
              <div className="flex justify-between mt-1">
                <span className="font-mono-tech text-[10px] text-[#6e7b7c]">R$2.000</span>
                <span className="font-mono-tech text-[18px] text-[#005a54] font-semibold">
                  R$ {salario.toLocaleString("pt-BR")}
                </span>
                <span className="font-mono-tech text-[10px] text-[#6e7b7c]">R$15.000</span>
              </div>
            </div>

            <div>
              <label className="label-mono text-[#6e7b7c] block mb-1">Honorário BPO Cluny estimado (R$)</label>
              <p className="text-[11px] text-[#6e7b7c] mb-3">Ajuste conforme o plano de interesse</p>
              <input
                type="range" min={2800} max={12000} step={100}
                value={bpo}
                onChange={(e) => setBpo(+e.target.value)}
                className="w-full accent-[#c48b30]"
              />
              <div className="flex justify-between mt-1">
                <span className="font-mono-tech text-[10px] text-[#6e7b7c]">R$2.800</span>
                <span className="font-mono-tech text-[18px] text-[#c48b30] font-semibold">
                  R$ {bpo.toLocaleString("pt-BR")}
                </span>
                <span className="font-mono-tech text-[10px] text-[#6e7b7c]">R$12.000</span>
              </div>
            </div>

            <div className="bg-[#f4f1ec] rounded-[4px] p-4 text-[12px] text-[#6e7b7c] leading-relaxed">
              <strong className="text-[#1A1A1A]">Encargos considerados no CLT (~72%):</strong><br />
              INSS patronal, FGTS, férias + 1/3, 13º salário, aviso prévio provisionado e benefícios médios (VT + VR).
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-[#1F3D2E] rounded-[4px] p-8 space-y-6">
            <span className="label-mono text-[#6e7b7c]">· COMPARATIVO MENSAL</span>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-[14px] text-[#f4f1ec]">Custo CLT total/mês</span>
                <span className="font-mono-tech text-[22px] text-[#f4f1ec]">
                  R$ {custoCLT.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-[14px] text-[#f4f1ec]">BPO Financeiro Cluny/mês</span>
                <span className="font-mono-tech text-[22px] text-[#c48b30]">
                  R$ {bpo.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-[4px] p-6">
              <p className="label-mono text-[#6e7b7c] mb-2">ECONOMIA MENSAL</p>
              <p className="font-mono-tech text-[48px] leading-none text-[#c48b30]">
                R$ {Math.max(0, economia).toLocaleString("pt-BR")}
              </p>
              <p className="text-[12px] text-[#6e7b7c] mt-2">
                {economia > 0
                  ? `R$ ${economiaAnual.toLocaleString("pt-BR")}/ano · ${Math.round((economia / custoCLT) * 100)}% de redução de custo`
                  : "Ajuste os parâmetros acima"}
              </p>
            </div>

            <div className="space-y-2 text-[12px] text-[#6e7b7c]">
              <p className="font-bold text-[#f4f1ec] text-[13px]">Com o BPO Cluny você ainda tem:</p>
              {[
                "Equipe estruturada — não dependência de 1 pessoa",
                "Backup automático em caso de ausência",
                "Metodologia documentada e auditável",
                "Integração nativa com a Contabilidade Cluny",
                "Sem encargos trabalhistas e rescisória",
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <span className="text-[#c48b30] font-bold">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("cadastro")}
              className="w-full py-3 bg-[#c48b30] text-[#1A1A1A] font-bold text-[13px] rounded-[2px] hover:bg-[#b37d28] transition-colors"
            >
              Quero agendar uma conversa →
            </button>

            <p className="text-[10px] text-[#6e7b7c]">
              Estimativa ilustrativa. Encargos reais variam por regime e benefícios contratados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
function BpoPage() {
  const [modalidade, setModalidade] = useState<"full" | "assistido">("full");

  return (
    <div style={{ background: "#f4f1ec" }}>
      <Nav />

      {/* HERO */}
      <section className="bg-[#1F3D2E] pt-32 pb-0">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pb-16">
          <span className="label-mono text-[#6e7b7c]">· BPO FINANCEIRO / EXECUÇÃO</span>
          <h1 className="font-display font-semibold text-[52px] lg:text-[64px] leading-[1.05] mt-6 mb-6 text-[#f4f1ec] max-w-2xl">
            Tiramos o sócio da<br />
            <em className="italic font-normal text-[#c48b30]">operação financeira.</em>
          </h1>
          <p className="text-[16px] text-[#f4f1ec]/80 max-w-xl leading-relaxed mb-10">
            Operação financeira completa, executada pela equipe Cluny, dimensionada para o estágio da sua empresa. Substitui a contratação de analista financeiro CLT com previsibilidade de custo e resultado em até 90 dias.
          </p>
          <button
            onClick={() => scrollTo("cadastro")}
            className="bg-[#c48b30] text-[#1A1A1A] font-bold text-[14px] px-8 py-4 rounded-[2px] hover:bg-[#b37d28] transition-colors"
          >
            Quero agendar uma conversa →
          </button>
        </div>

        {/* Métricas */}
        <div className="bg-[#1A1A1A]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <MetricItem value="90 dias" label="para operação estabilizada" />
              <MetricItem value="3 planos" label="Start, Gestão e Premium" />
              <MetricItem value="2 modalidades" label="Full e Assistido" />
              <MetricItem value="12 meses" label="contrato mínimo" />
            </div>
          </div>
        </div>
      </section>

      {/* PROMESSA DE VALOR */}
      <section className="py-20 lg:py-28 bg-[#f4f1ec]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="label-mono text-[#6e7b7c]">· EM ATÉ 90 DIAS, VOCÊ TERÁ</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-12 text-[#1A1A1A] leading-[1.1] max-w-xl">
            O que <em className="italic font-normal text-[#c48b30]">muda na prática.</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <PromessaCard title="Operação rodando sem CLT" desc="Fluxo de caixa diário e DRE gerencial mensal entregues no prazo, sem depender de profissional interno." />
            <PromessaCard title="Processos documentados" desc="Rotinas auditáveis, aprovação dupla e trilha completa de auditoria — do documento à baixa contábil." />
            <PromessaCard title="Sócio fora da execução" desc="Você aprova. A Cluny executa. Sua atenção volta para o que gera receita." />
            <PromessaCard title="Custo inferior à contratação CLT" desc="Operação que substitui analista interno com previsibilidade de custo e sem encargos trabalhistas." />
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="label-mono text-[#6e7b7c]">· MODALIDADES / COMO FUNCIONA</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-4 text-[#1A1A1A] leading-[1.1]">
            Full ou Assistido. <em className="italic font-normal text-[#c48b30]">Uma etapa de diferença.</em>
          </h2>
          <p className="text-[15px] text-[#6e7b7c] mb-12 max-w-xl">
            As duas modalidades são idênticas em 8 das 9 etapas do processo. A diferença está em quem executa o pagamento no banco.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Full */}
            <div className="bg-[#1F3D2E] rounded-[4px] p-8">
              <span className="label-mono text-[#c48b30]">MODALIDADE FULL</span>
              <h3 className="font-display font-semibold text-[24px] text-[#f4f1ec] mt-3 mb-3">Cluny executa</h3>
              <p className="text-[14px] text-[#f4f1ec]/80 mb-6 leading-relaxed">
                A Cluny acessa o banco do cliente mediante procuração específica e executa todos os pagamentos aprovados. 100% da rotina financeira terceirizada.
              </p>
              <p className="label-mono text-[#6e7b7c] mb-3">QUANDO INDICAR</p>
              {["Sócio quer sair 100% da operação financeira", "Empresa sem profissional interno disponível", "Prioridade em velocidade e centralização"].map((i) => (
                <div key={i} className="flex gap-2 text-[13px] text-[#cec9b8] mb-1">
                  <span className="text-[#c48b30] font-bold">→</span><span>{i}</span>
                </div>
              ))}
            </div>
            {/* Assistido */}
            <div className="bg-[#f4f1ec] border border-[#e8e4db] rounded-[4px] p-8">
              <span className="label-mono text-[#6e7b7c]">MODALIDADE ASSISTIDO</span>
              <h3 className="font-display font-semibold text-[24px] text-[#1A1A1A] mt-3 mb-3">Cliente executa</h3>
              <p className="text-[14px] text-[#1A1A1A]/75 mb-6 leading-relaxed">
                A Cluny prepara, classifica, agenda e submete aprovação. O cliente acessa o banco e efetiva o pagamento. Cluny não possui poderes de movimentação bancária.
              </p>
              <p className="label-mono text-[#6e7b7c] mb-3">QUANDO INDICAR</p>
              {["Governança bancária restritiva ou conselho deliberativo", "Sociedade com múltiplos sócios e aprovação interna", "Empresas em M&A, due diligence ou auditoria externa", "Início gradual da terceirização"].map((i) => (
                <div key={i} className="flex gap-2 text-[13px] text-[#1A1A1A]/70 mb-1">
                  <span className="text-[#c48b30] font-bold">→</span><span>{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de fluxo */}
          <div className="overflow-x-auto rounded-[4px] border border-[#e8e4db]">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead>
                <tr className="bg-[#1A1A1A] text-[#f4f1ec]">
                  <th className="label-mono py-3 px-4 text-left">ETAPA</th>
                  <th className="label-mono py-3 px-4 text-left">DESCRIÇÃO</th>
                  <th className="label-mono py-3 px-4 text-center">FULL</th>
                  <th className="label-mono py-3 px-4 text-center">ASSISTIDO</th>
                </tr>
              </thead>
              <tbody>
                {FLUXO.map((row, i) => (
                  <tr
                    key={row.etapa}
                    className={`border-b border-[#e8e4db] last:border-b-0 ${
                      row.destaque
                        ? "bg-[#c48b3008] border-l-[3px] border-l-[#c48b30]"
                        : i % 2 === 0 ? "bg-white" : "bg-[#f4f1ec]"
                    }`}
                  >
                    <td className="font-mono-tech py-3 px-4 text-[#6e7b7c]">{row.etapa}</td>
                    <td className={`py-3 px-4 ${row.destaque ? "font-bold text-[#1A1A1A]" : "text-[#1A1A1A]"}`}>{row.desc}</td>
                    <td className="py-3 px-4 text-center text-[#005a54] font-semibold">{row.full}</td>
                    <td className="py-3 px-4 text-center text-[#005a54] font-semibold">{row.assistido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-[12px] text-[#6e7b7c] mt-4 border border-[#e8e4db] inline-block px-5 py-2 rounded-[2px]">
            A etapa 07 é a única diferença entre as duas modalidades.
          </p>
        </div>
      </section>

      {/* TOGGLE + PLANOS */}
      <ModalidadeToggle value={modalidade} onChange={setModalidade} sticky />

      <section className="py-20 lg:py-28 bg-[#f4f1ec]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="label-mono text-[#6e7b7c]">· PLANOS / ESCOLHA O NÍVEL</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-4 text-[#1A1A1A] leading-[1.1]">
            Três níveis. <em className="italic font-normal text-[#c48b30]">Um único método.</em>
          </h2>
          <p className="text-[15px] text-[#6e7b7c] mb-12 max-w-xl">
            A metodologia Cluny é a mesma nos três. O escopo e a profundidade de entrega variam conforme o faturamento e a maturidade da operação.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PLANOS.map((p) => (
              <PlanoCard key={p.key} plano={p} modalidade={modalidade} />
            ))}
          </div>

          {/* Banner diagnóstico */}
          <div className="mt-10 bg-[#1A1A1A] rounded-[4px] p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-display font-semibold text-[22px] text-[#f4f1ec] mb-2">Não sabe qual plano escolher?</h3>
              <p className="text-[14px] text-[#6e7b7c]">
                Faça o diagnóstico gratuito em 60 segundos e indicamos o caminho técnico correto para a sua operação.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <a href="/#diagnostico" className="bg-[#c48b30] text-[#1A1A1A] font-bold text-[13px] px-6 py-3 rounded-[2px] hover:bg-[#b37d28] transition-colors">
                Diagnóstico gratuito →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TABELA COMPARATIVA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="label-mono text-[#6e7b7c]">· COMPARATIVO / ESCOPO DETALHADO</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-12 text-[#1A1A1A] leading-[1.1]">
            O que cada plano <em className="italic font-normal text-[#c48b30]">entrega.</em>
          </h2>

          <div className="overflow-x-auto rounded-[4px] border border-[#e8e4db]">
            <table className="w-full text-[13px] min-w-[640px]">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  <th className="label-mono py-3 px-4 text-left text-[#f4f1ec] w-[45%]">ENTREGÁVEL</th>
                  <th className="label-mono py-3 px-4 text-center text-[#f4f1ec]">START</th>
                  <th className="label-mono py-3 px-4 text-center text-[#f4f1ec]">GESTÃO</th>
                  <th className="label-mono py-3 px-4 text-center text-[#f4f1ec]">PREMIUM</th>
                </tr>
              </thead>
              <tbody>
                {TABELA.map((row, i) =>
                  row.categoria ? (
                    <tr key={row.label} className="bg-[#f4f1ec] border-b-2 border-b-[#c48b30]">
                      <td colSpan={4} className="label-mono py-3 px-4 text-[#6e7b7c]">{row.label}</td>
                    </tr>
                  ) : (
                    <tr key={row.label + i} className={`border-b border-[#e8e4db] ${i % 2 === 0 ? "bg-white" : "bg-[#fafaf8]"}`}>
                      <td className="py-3 px-4 text-[#1A1A1A]">{row.label}</td>
                      <td className="py-3 px-4 text-center text-[#6e7b7c]"><CellVal v={row.start} /></td>
                      <td className="py-3 px-4 text-center text-[#6e7b7c]"><CellVal v={row.gestao} /></td>
                      <td className="py-3 px-4 text-center text-[#6e7b7c]"><CellVal v={row.premium} /></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-[#6e7b7c] mt-4">
            * Itens fora de escopo em todos os planos: folha de pagamento, apuração contábil, captação de crédito, auditoria externa, valuation e M&A.
          </p>
        </div>
      </section>

      {/* ONBOARDING */}
      <section className="py-20 lg:py-28 bg-[#f4f1ec]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <span className="label-mono text-[#6e7b7c]">· IMPLANTAÇÃO / COMO COMEÇAMOS</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[44px] mt-4 mb-12 text-[#1A1A1A] leading-[1.1]">
            Quatro fases. <em className="italic font-normal text-[#c48b30]">Método público.</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { fase: "01", titulo: "Diagnóstico", semana: "Semana 1", items: ["Reunião de kickoff com sócio", "Mapeamento do processo atual", "Levantamento de sistemas e volumes", "Definição de modalidade Full ou Assistido"] },
              { fase: "02", titulo: "Configuração", semana: "Semanas 2–3", items: ["Configuração do ERP do cliente", "Plataforma de aprovação", "Centros de custo e classificações", "Formalização de procurações (Full)"] },
              { fase: "03", titulo: "Migração", semana: "Semanas 3–5", items: ["Importação de saldos e títulos", "Operação em paralelo por 15 dias", "Validação de primeiros pagamentos", "Ajustes finos no fluxo"] },
              { fase: "04", titulo: "Go-live", semana: "Semanas 5–12", items: ["Cluny assume integralmente", "Primeira reunião de resultado", "Acompanhamento intensivo", "Termo de aceite formal"] },
            ].map((f) => (
              <div key={f.fase} className="bg-white border border-[#e8e4db] rounded-[4px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono-tech text-[32px] text-[#cec9b8] leading-none">{f.fase}</span>
                  <div>
                    <p className="font-display font-semibold text-[18px] text-[#1A1A1A]">{f.titulo}</p>
                    <p className="label-mono text-[#c48b30]">{f.semana}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {f.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] text-[#6e7b7c]">
                      <span className="text-[#c48b30]">·</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#1A1A1A] rounded-[2px] px-6 py-3 inline-block">
            <span className="font-mono-tech text-[11px] text-[#f4f1ec] uppercase tracking-widest">
              Start: 30 dias · Gestão: 45 dias · Premium: 60 dias
            </span>
          </div>
        </div>
      </section>

      {/* CALCULADORA CLT */}
      <CalculadoraCLT />

      {/* CADASTRO */}
      <Cadastro />

      {/* FAQ */}
      <FAQ />

      <Footer />
    </div>
  );
}
