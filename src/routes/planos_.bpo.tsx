import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Nav, Footer, Cadastro, FAQ } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos_/bpo")({
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
  const [salario, setSalario] = useState(5000);
  const [bpo, setBpo] = useState(3500);

  const promessas: [string, string][] = [
    ["Operação rodando sem CLT", "Fluxo de caixa diário e DRE gerencial mensal entregues no prazo, sem depender de profissional interno."],
    ["Processos documentados", "Rotinas auditáveis, aprovação dupla e trilha completa de auditoria — do documento à baixa contábil."],
    ["Sócio fora da execução", "Você aprova. A Cluny executa. Sua atenção volta para o que gera receita."],
    ["Custo inferior à contratação CLT", "Operação que substitui analista interno com previsibilidade de custo e sem encargos trabalhistas."],
  ];

  const etapas: [string, string, string, string, boolean][] = [
    ["01", "Receber documento (NF, boleto)", "Cluny", "Cluny", false],
    ["02", "Conferir e classificar", "Cluny", "Cluny", false],
    ["03", "Lançar no sistema", "Cluny", "Cluny", false],
    ["04", "Programar pagamento", "Cluny", "Cluny", false],
    ["05", "Submeter aprovação ao cliente", "Cluny", "Cluny", false],
    ["06", "Aprovar lote", "Cliente", "Cliente", false],
    ["07", "Executar pagamento no banco", "Cluny ✓", "Cliente ✓", true],
    ["08", "Conciliar baixa", "Cluny", "Cluny", false],
    ["09", "Registrar comprovante", "Cluny", "Cluny", false],
  ];

  return (
    <div style={{ background: "#f4f1ec", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Nav />

      {/* HERO */}
      <section style={{ background: "#1F3D2E", padding: "120px 0 100px", color: "#f4f1ec" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c48b30", marginBottom: 24 }}>
            · BPO FINANCEIRO / EXECUÇÃO
          </div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 64, lineHeight: 1.05, margin: 0, maxWidth: 880 }}>
            Tiramos o sócio da{" "}
            <span style={{ fontStyle: "italic", color: "#c48b30" }}>operação financeira.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#d8d2c4", maxWidth: 720, marginTop: 32 }}>
            Operação financeira completa, executada pela equipe Cluny, dimensionada para o estágio da sua empresa. Substitui a contratação de analista financeiro CLT com previsibilidade de custo e resultado em até 90 dias.
          </p>
          <button
            onClick={() => scrollTo("cadastro")}
            style={{ marginTop: 40, background: "#c48b30", color: "#1A1A1A", fontFamily: "Inter", fontWeight: 700, fontSize: 14, padding: "16px 32px", borderRadius: 2, border: "none", cursor: "pointer" }}
          >
            Quero agendar uma conversa →
          </button>
        </div>

        {/* METRICS BAR */}
        <div style={{ maxWidth: 1180, margin: "80px auto 0", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, borderTop: "1px solid rgba(196,139,48,0.3)", borderBottom: "1px solid rgba(196,139,48,0.3)" }}>
            {[["90 dias", "para operação estabilizada"], ["3 planos", "Start, Gestão e Premium"], ["2 modalidades", "Full e Assistido"], ["12 meses", "contrato mínimo"]].map(([v, l], i) => (
              <div key={i} style={{ padding: "32px 24px", borderRight: i < 3 ? "1px solid rgba(196,139,48,0.2)" : "none" }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 32, color: "#c48b30", fontWeight: 600 }}>{v}</div>
                <div style={{ fontSize: 13, color: "#d8d2c4", marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE MUDA NA PRÁTICA */}
      <section style={{ background: "#f4f1ec", padding: "80px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6e7b7c", marginBottom: 16 }}>
            · EM ATÉ 90 DIAS, VOCÊ TERÁ
          </div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 44, lineHeight: 1.1, color: "#1A1A1A", margin: "0 0 48px" }}>
            O que <span style={{ fontStyle: "italic", color: "#c48b30" }}>muda na prática.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {promessas.map(([t, d]) => (
              <div key={t} style={{ background: "white", border: "1px solid #e8e4db", borderLeft: "3px solid #c48b30", borderRadius: 4, padding: 28 }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 600, color: "#1A1A1A", marginBottom: 12 }}>{t}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: "#4a5253" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6e7b7c", marginBottom: 16 }}>
            · MODALIDADES / COMO FUNCIONA
          </div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 44, lineHeight: 1.1, color: "#1A1A1A", margin: "0 0 16px" }}>
            Full ou Assistido. <span style={{ fontStyle: "italic", color: "#c48b30" }}>Uma etapa de diferença.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#4a5253", maxWidth: 720, marginBottom: 48 }}>
            As duas modalidades são idênticas em 8 das 9 etapas do processo. A diferença está em quem executa o pagamento no banco.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24, marginBottom: 64 }}>
            {[
              { tag: "MODALIDADE FULL", title: "Cluny executa", desc: "A Cluny acessa o banco do cliente mediante procuração específica e executa todos os pagamentos aprovados. 100% da rotina financeira terceirizada.", items: ["Sócio quer sair 100% da operação financeira", "Empresa sem profissional interno disponível", "Prioridade em velocidade e centralização"] },
              { tag: "MODALIDADE ASSISTIDO", title: "Cliente executa", desc: "A Cluny prepara, classifica, agenda e submete aprovação. O cliente acessa o banco e efetiva o pagamento. Cluny não possui poderes de movimentação bancária.", items: ["Governança bancária restritiva ou conselho deliberativo", "Sociedade com múltiplos sócios e aprovação interna", "Empresas em M&A, due diligence ou auditoria externa", "Início gradual da terceirização"] },
            ].map((c) => (
              <div key={c.tag} style={{ background: "#f4f1ec", border: "1px solid #e8e4db", borderRadius: 4, padding: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "#c48b30", marginBottom: 12 }}>{c.tag}</div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 600, color: "#1A1A1A", marginBottom: 16 }}>{c.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#4a5253", marginBottom: 20 }}>{c.desc}</p>
                {c.items.map((i) => (
                  <div key={i} style={{ fontSize: 13, color: "#1A1A1A", padding: "8px 0", borderTop: "1px solid #e8e4db" }}>→ {i}</div>
                ))}
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div style={{ overflowX: "auto", border: "1px solid #e8e4db", borderRadius: 4 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#1F3D2E", color: "#f4f1ec" }}>
                  {["ETAPA", "DESCRIÇÃO", "FULL", "ASSISTIDO"].map((h) => (
                    <th key={h} style={{ padding: "16px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {etapas.map(([e, d, f, a, dest]) => (
                  <tr key={e} style={{ background: dest ? "#fdf6e8" : "white", borderTop: "1px solid #e8e4db" }}>
                    <td style={{ padding: "14px 20px", fontFamily: "Fraunces, serif", color: "#c48b30", fontWeight: 600 }}>{e}</td>
                    <td style={{ padding: "14px 20px", color: "#1A1A1A" }}>{d}</td>
                    <td style={{ padding: "14px 20px", color: "#4a5253", fontWeight: dest ? 700 : 400 }}>{f}</td>
                    <td style={{ padding: "14px 20px", color: "#4a5253", fontWeight: dest ? 700 : 400 }}>{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#6e7b7c", marginTop: 24 }}>
            A etapa 07 é a única diferença entre as duas modalidades.
          </p>
        </div>
      </section>

      {/* MODALIDADE TOGGLE */}
      <section style={{ background: "#f4f1ec", padding: "60px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#4a5253", marginBottom: 16 }}>Escolha a modalidade:</div>
          <div style={{ display: "inline-flex", gap: 12 }}>
            {(["full", "assistido"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModalidade(m)}
                style={{ padding: "8px 20px", fontSize: 12, fontWeight: 700, fontFamily: "Inter", textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: 2, border: modalidade === m ? "2px solid #005a54" : "2px solid #e8e4db", background: modalidade === m ? "#005a54" : "white", color: modalidade === m ? "#f4f1ec" : "#6e7b7c", cursor: "pointer", transition: "all 200ms" }}
              >
                {m === "full" ? "FULL" : "ASSISTIDO"}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: "#6e7b7c", fontStyle: "italic" }}>
            {modalidade === "full" ? "Programação bancária pela Cluny" : "Cliente executa no internet banking"}
          </div>
        </div>
      </section>

      <FAQ />

      <section style={{ background: "#f4f1ec", padding: "80px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 16px" }}>· PLANOS / ESCOLHA O NÍVEL</p>
          <h2 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 44, color: "#1A1A1A", margin: "0 0 16px", lineHeight: 1.1 }}>
            Três níveis. <em style={{ fontStyle: "italic", fontWeight: 400, color: "#c48b30" }}>Um único método.</em>
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 15, color: "#6e7b7c", marginBottom: 48, maxWidth: 560 }}>A metodologia Cluny é a mesma nos três. O escopo e a profundidade de entrega variam conforme o faturamento e a maturidade da operação.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "start" }}>
            {/* START */}
            <div style={{ background: "white", border: "1px solid #e8e4db", borderRadius: 4, padding: 32, display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>BPO · START</p>
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 16px" }}>Faturamento R$ 2M a R$ 4,8M/ano</p>
              <h3 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 28, color: "#1A1A1A", margin: "0 0 6px" }}>BPO Start</h3>
              <p style={{ fontFamily: "Fraunces,Georgia,serif", fontStyle: "italic", fontSize: 14, color: "#6e7b7c", margin: "0 0 24px" }}>{modalidade === "full" ? "Operação completa com programação bancária" : "Operação completa — você executa no banco"}</p>
              <div style={{ height: 1, background: "#e8e4db", margin: "0 0 24px" }} />
              {([["CONTAS A PAGAR", ["Cadastro e classificação de fornecedores", "Programação e agendamento de pagamentos", "Gestão de contratos recorrentes (básica)"]], ["CONTAS A RECEBER", ["Emissão de NF e boletos", "Régua de cobrança automatizada padrão", "Gestão de inadimplência — relatório mensal"]], ["TESOURARIA", ["Conciliação bancária diária (até 3 contas)", "Fluxo de caixa realizado semanal", "Fluxo de caixa projetado 30 dias"]], ["RELATÓRIOS", ["DRE gerencial mensal padrão", "5 KPIs financeiros padrão", "Relatório de inadimplência mensal"]], ["ATENDIMENTO", ["SLA de resposta: 24h úteis", "Reunião operacional semanal (20 min)", "Reunião de resultado mensal (60 min)"]]] as [string, string[]][]).map(([g, items]) => (
                <div key={g} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>{g}</p>
                  {items.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, marginBottom: 4, fontFamily: "Inter", fontSize: 12, color: "#1A1A1A" }}>
                      <span style={{ color: "#c48b30", fontWeight: 700, flexShrink: 0 }}>→</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ height: 1, background: "#e8e4db", margin: "16px 0" }} />
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 4px" }}>Até 150 lançamentos/mês · até 3 contas</p>
              <p style={{ fontFamily: "Inter", fontSize: 11, color: "#6e7b7c", margin: "0 0 20px" }}>Setup de implantação: R$ 3.500 (one-time)</p>
              <button onClick={() => document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", padding: "12px", border: "2px solid #005a54", background: "transparent", color: "#005a54", fontFamily: "Inter", fontWeight: 700, fontSize: 13, borderRadius: 2, cursor: "pointer" }}>
                Quero conversar sobre o Start →
              </button>
            </div>

            {/* GESTÃO */}
            <div style={{ background: "#1F3D2E", borderRadius: 4, padding: 32, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, borderRadius: "50%", background: "rgba(196,139,48,0.08)", transform: "translate(30%,-30%)", pointerEvents: "none" }} />
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: 0 }}>BPO · GESTÃO</p>
                <span style={{ background: "#c48b30", color: "#1A1A1A", fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 2 }}>· MAIS CONTRATADO</span>
              </div>
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 16px" }}>Faturamento R$ 4,8M a R$ 8M/ano</p>
              <h3 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 28, color: "#f4f1ec", margin: "0 0 6px" }}>BPO Gestão</h3>
              <p style={{ fontFamily: "Fraunces,Georgia,serif", fontStyle: "italic", fontSize: 14, color: "#6e7b7c", margin: "0 0 24px" }}>{modalidade === "full" ? "Operação completa com programação bancária" : "Operação completa — você executa no banco"}</p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 0 24px" }} />
              {([["CONTAS A PAGAR", ["Tudo do Start", "Workflow de aprovação dupla", "Gestão de contratos recorrentes completa"]], ["CONTAS A RECEBER", ["Régua de cobrança customizada", "Gestão ativa de inadimplência (D+30)"]], ["TESOURARIA", ["Fluxo de caixa realizado diário", "Fluxo de caixa projetado 60 dias", "Gestão básica de aplicações financeiras", "Até 6 contas bancárias"]], ["RELATÓRIOS", ["DRE gerencial por centro de custo", "Balanço gerencial trimestral", "10 KPIs customizados", "Relatório de inadimplência quinzenal"]], ["ATENDIMENTO", ["SLA de resposta: 8h úteis", "Reunião mensal 90 min (analista + coordenador)"]]] as [string, string[]][]).map(([g, items]) => (
                <div key={g} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>{g}</p>
                  {items.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, marginBottom: 4, fontFamily: "Inter", fontSize: 12, color: "#f4f1ec" }}>
                      <span style={{ color: "#c48b30", fontWeight: 700, flexShrink: 0 }}>→</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "16px 0" }} />
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 4px" }}>Até 400 lançamentos/mês · até 6 contas</p>
              <p style={{ fontFamily: "Inter", fontSize: 11, color: "#6e7b7c", margin: "0 0 20px" }}>Setup de implantação: R$ 6.000 (one-time)</p>
              <button onClick={() => document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", padding: "12px", border: "none", background: "#c48b30", color: "#1A1A1A", fontFamily: "Inter", fontWeight: 700, fontSize: 13, borderRadius: 2, cursor: "pointer" }}>
                Quero conversar sobre o Gestão →
              </button>
            </div>

            {/* PREMIUM */}
            <div style={{ background: "white", border: "1px solid #e8e4db", borderRadius: 4, padding: 32, display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>BPO · PREMIUM</p>
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 16px" }}>Faturamento R$ 8M a R$ 30M/ano</p>
              <h3 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 28, color: "#1A1A1A", margin: "0 0 6px" }}>BPO Premium</h3>
              <p style={{ fontFamily: "Fraunces,Georgia,serif", fontStyle: "italic", fontSize: 14, color: "#6e7b7c", margin: "0 0 24px" }}>{modalidade === "full" ? "Operação dedicada com programação bancária" : "Operação dedicada — você executa no banco"}</p>
              <div style={{ height: 1, background: "#e8e4db", margin: "0 0 24px" }} />
              {([["CONTAS A PAGAR", ["Tudo do Gestão", "Workflow de aprovação multi-nível com trilha de auditoria"]], ["CONTAS A RECEBER", ["Régua de cobrança customizada + ativa", "Gestão ativa de inadimplência + apoio jurídico"]], ["TESOURARIA", ["Conciliação bancária diária multi-conta (até 15)", "Fluxo de caixa projetado 90 dias rolante", "Gestão completa de aplicações financeiras"]], ["RELATÓRIOS", ["DRE gerencial por projeto e por cliente", "Balanço gerencial mensal", "15+ KPIs em dashboard Power BI / Looker", "Relatório de inadimplência semanal"]], ["EXCLUSIVO PREMIUM", ["Analista financeiro dedicado", "Coordenador de conta dedicado", "Manual de processos do cliente", "Auditoria interna trimestral"]], ["ATENDIMENTO", ["SLA de resposta: 4h úteis", "Reunião quinzenal 60 min + sócio Cluny trimestral"]]] as [string, string[]][]).map(([g, items]) => (
                <div key={g} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>{g}</p>
                  {items.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, marginBottom: 4, fontFamily: "Inter", fontSize: 12, color: "#1A1A1A" }}>
                      <span style={{ color: "#c48b30", fontWeight: 700, flexShrink: 0 }}>→</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ height: 1, background: "#e8e4db", margin: "16px 0" }} />
              <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#6e7b7c", margin: "0 0 4px" }}>Até 1.000 lançamentos/mês · até 15 contas</p>
              <p style={{ fontFamily: "Inter", fontSize: 11, color: "#6e7b7c", margin: "0 0 20px" }}>Setup de implantação: R$ 12.000 (one-time)</p>
              <button onClick={() => document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", padding: "12px", border: "none", background: "#005a54", color: "#f4f1ec", fontFamily: "Inter", fontWeight: 700, fontSize: 13, borderRadius: 2, cursor: "pointer" }}>
                Quero conversar sobre o Premium →
              </button>
            </div>
          </div>

          <div style={{ marginTop: 40, background: "#1A1A1A", borderRadius: 4, padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
            <div>
              <h3 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 22, color: "#f4f1ec", margin: "0 0 8px" }}>Não sabe qual plano escolher?</h3>
              <p style={{ fontFamily: "Inter", fontSize: 14, color: "#6e7b7c", margin: 0 }}>Faça o diagnóstico gratuito em 60 segundos e indicamos o caminho técnico correto para a sua operação.</p>
            </div>
            <a href="/#diagnostico" style={{ background: "#c48b30", color: "#1A1A1A", fontFamily: "Inter", fontWeight: 700, fontSize: 13, padding: "12px 24px", borderRadius: 2, textDecoration: "none", whiteSpace: "nowrap" }}>
              Diagnóstico gratuito →
            </a>
          </div>
        </div>
      </section>

      <section style={{ background: "#cec9b8", padding: "80px 0" }} id="calculadora">
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 16px" }}>· CALCULADORA / CLT vs BPO CLUNY</p>
          <h2 style={{ fontFamily: "Fraunces,Georgia,serif", fontWeight: 600, fontSize: 44, color: "#1A1A1A", margin: "0 0 12px", lineHeight: 1.1 }}>
            Contratar CLT ou <em style={{ fontStyle: "italic", fontWeight: 400, color: "#c48b30" }}>terceirizar com a Cluny?</em>
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: 15, color: "rgba(26,26,26,0.75)", marginBottom: 48, maxWidth: 520 }}>Simule o custo real de um analista financeiro CLT versus o BPO Financeiro Cluny.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            <div style={{ background: "white", borderRadius: 4, padding: 32, border: "1px solid #e8e4db" }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 6px" }}>Salário bruto do analista (R$)</p>
                <p style={{ fontFamily: "Inter", fontSize: 11, color: "#6e7b7c", margin: "0 0 12px" }}>Salário mensal sem encargos</p>
                <input type="range" min={2000} max={15000} step={500} value={salario} onChange={e => setSalario(+e.target.value)} style={{ width: "100%", accentColor: "#005a54" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#6e7b7c" }}>R$2.000</span>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 18, color: "#005a54", fontWeight: 600 }}>R$ {salario.toLocaleString("pt-BR")}</span>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#6e7b7c" }}>R$15.000</span>
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 6px" }}>Honorário BPO Cluny estimado (R$)</p>
                <p style={{ fontFamily: "Inter", fontSize: 11, color: "#6e7b7c", margin: "0 0 12px" }}>Ajuste conforme o plano de interesse</p>
                <input type="range" min={2800} max={12000} step={100} value={bpo} onChange={e => setBpo(+e.target.value)} style={{ width: "100%", accentColor: "#c48b30" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#6e7b7c" }}>R$2.800</span>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 18, color: "#c48b30", fontWeight: 600 }}>R$ {bpo.toLocaleString("pt-BR")}</span>
                  <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#6e7b7c" }}>R$12.000</span>
                </div>
              </div>
              <div style={{ background: "#f4f1ec", borderRadius: 4, padding: 16, fontSize: 12, color: "#6e7b7c", lineHeight: 1.6 }}>
                <strong style={{ color: "#1A1A1A" }}>Encargos considerados no CLT (~72%):</strong><br />
                INSS patronal, FGTS, férias + 1/3, 13º salário, aviso prévio provisionado e benefícios médios (VT + VR).
              </div>
            </div>
            <div style={{ background: "#1F3D2E", borderRadius: 4, padding: 32 }}>
              <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 24px" }}>· COMPARATIVO MENSAL</p>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter", fontSize: 14, color: "#f4f1ec" }}>Custo CLT total/mês</span>
                <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 22, color: "#f4f1ec" }}>R$ {Math.round(salario * 1.72).toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter", fontSize: 14, color: "#f4f1ec" }}>BPO Financeiro Cluny/mês</span>
                <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 22, color: "#c48b30" }}>R$ {bpo.toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ background: "#1A1A1A", borderRadius: 4, padding: 24, marginBottom: 24 }}>
                <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6e7b7c", margin: "0 0 8px" }}>ECONOMIA MENSAL</p>
                <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 48, color: "#c48b30", margin: "0 0 8px", lineHeight: 1 }}>R$ {Math.max(0, Math.round(salario * 1.72) - bpo).toLocaleString("pt-BR")}</p>
                <p style={{ fontFamily: "Inter", fontSize: 12, color: "#6e7b7c", margin: 0 }}>R$ {Math.max(0, (Math.round(salario * 1.72) - bpo) * 12).toLocaleString("pt-BR")}/ano · {Math.round(Math.max(0, (Math.round(salario * 1.72) - bpo)) / Math.round(salario * 1.72) * 100)}% de redução de custo</p>
              </div>
              <p style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13, color: "#f4f1ec", margin: "0 0 12px" }}>Com o BPO Cluny você ainda tem:</p>
              {["Equipe estruturada — não dependência de 1 pessoa", "Backup automático em caso de ausência", "Metodologia documentada e auditável", "Integração nativa com a Contabilidade Cluny", "Sem encargos trabalhistas e rescisória"].map(i => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontFamily: "Inter", fontSize: 12, color: "#6e7b7c" }}>
                  <span style={{ color: "#c48b30", fontWeight: 700 }}>→</span><span>{i}</span>
                </div>
              ))}
              <button onClick={() => document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", marginTop: 24, padding: "14px", background: "#c48b30", color: "#1A1A1A", fontFamily: "Inter", fontWeight: 700, fontSize: 13, borderRadius: 2, border: "none", cursor: "pointer" }}>
                Quero agendar uma conversa →
              </button>
              <p style={{ fontFamily: "Inter", fontSize: 10, color: "#6e7b7c", marginTop: 12, textAlign: "center" }}>Estimativa ilustrativa. Encargos reais variam por regime e benefícios contratados.</p>
            </div>
          </div>
        </div>
      </section>

      <Cadastro />
      <Footer />
    </div>
  );
}
