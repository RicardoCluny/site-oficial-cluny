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

const PLANOS_DATA = {
  start: {
    full:      { preco: "4.800", entregaveis: ["Contas a pagar/receber", "Conciliação bancária", "Programação bancária", "Fluxo de caixa diário", "Reunião quinzenal"] },
    assistido: { preco: "3.900", entregaveis: ["Contas a pagar/receber", "Conciliação bancária", "Cliente opera o banco", "Fluxo de caixa diário", "Reunião quinzenal"] },
  },
  gestao: {
    full:      { preco: "7.200", entregaveis: ["Tudo do Start", "DRE gerencial mensal", "Painel de KPIs", "Gestor de conta dedicado", "Reunião semanal", "Relatório executivo", "Suporte ao sócio"] },
    assistido: { preco: "6.300", entregaveis: ["Tudo do Start", "DRE gerencial mensal", "Painel de KPIs", "Gestor de conta dedicado", "Reunião semanal", "Relatório executivo", "Suporte ao sócio"] },
  },
  premium: {
    full:      { preco: "12.500", entregaveis: ["Tudo do Gestão", "Controladoria embarcada", "Orçamento anual", "Modelagem de cenários", "Reunião com o sócio", "Sessão trimestral de tese", "Análise por unidade de negócio", "Plano 90/365", "Acesso direto ao sócio Cluny"] },
    assistido: { preco: "10.900", entregaveis: ["Tudo do Gestão", "Controladoria embarcada", "Orçamento anual", "Modelagem de cenários", "Reunião com o sócio", "Sessão trimestral de tese", "Análise por unidade de negócio", "Plano 90/365", "Acesso direto ao sócio Cluny"] },
  },
};

function PlanCard({ plano, modalidade, dark }: { plano: keyof typeof PLANOS_DATA; modalidade: Modalidade; dark?: boolean }) {
  const data = PLANOS_DATA[plano][modalidade];
  const titulos: Record<typeof plano, string> = { start: "BPO Start", gestao: "BPO Gestão", premium: "BPO Premium" };
  const indicado: Record<typeof plano, string> = {
    start: "Faturamento até R$ 5M · Operação em estruturação",
    gestao: "Faturamento R$ 5M–15M · Operação em crescimento",
    premium: "Faturamento acima de R$ 15M · Operação complexa",
  };
  const subt = modalidade === "full" ? "Operação completa com programação bancária" : "Operação completa com acesso assistido";

  const txt = dark ? "#f4f1ec" : "#1A1A1A";
  const sub = dark ? "#cec9b8" : "#6e7b7c";

  return (
    <div className="relative p-8 rounded-[4px] flex flex-col h-full"
      style={{ background: dark ? "#1F3D2E" : "#ffffff", border: dark ? "none" : "1px solid #e8e4db" }}>
      {dark && <div className="absolute top-0 right-0 w-[80px] h-[80px] rounded-full pointer-events-none" style={{ background: "rgba(196,139,48,0.20)", transform: "translate(30%,-30%)" }} />}
      <div className="flex items-center gap-2 mb-3 relative">
        <span className="label-mono" style={{ color: sub }}>BPO · {plano.toUpperCase()}</span>
        {plano === "gestao" && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· MAIS CONTRATADO</span>}
      </div>
      <h3 className="font-display font-semibold text-[24px]" style={{ color: txt }}>{titulos[plano]}</h3>
      <p className="font-display italic text-[14px] mt-1" style={{ color: sub }}>{subt}</p>

      <div className="mt-6 transition-opacity duration-200" key={modalidade + plano}>
        <span className="text-[13px]" style={{ color: sub }}>a partir de </span>
        <span className="font-mono-tech text-[36px]" style={{ color: txt }}>R$ {data.preco}</span>
        <span className="text-[13px]" style={{ color: sub }}>/mês</span>
      </div>

      <div className="label-mono mt-6 mb-3" style={{ color: sub }}>ESCOPO · MODALIDADE {modalidade.toUpperCase()}</div>
      <ul className="space-y-2 mb-6 flex-1">
        {data.entregaveis.map((e) => (
          <li key={e} className="flex gap-2 text-[13px]" style={{ color: txt }}>
            <span style={{ color: "#c48b30" }}>→</span>{e}
          </li>
        ))}
      </ul>

      <div className="text-[12px] pt-4 mb-4 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db", color: sub }}>
        <div className="label-mono mb-1">INDICADO PARA</div>
        {indicado[plano]}
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
    <div className="sticky top-[95px] z-40 bg-[#f4f1ec] border-b border-[#e8e4db] py-4">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] font-bold text-[#1A1A1A]">Escolha a modalidade:</span>
        <div className="flex gap-0">
          {(["full", "assistido"] as const).map((k) => (
            <button key={k} onClick={() => setModalidade(k)} title={k === "full" ? "Cluny opera o internet banking" : "Você opera o internet banking"}
              className="px-5 py-2 text-[12px] font-bold tracking-wide transition-all"
              style={modalidade === k
                ? { background: "#005a54", color: "#f4f1ec", border: "1px solid #005a54", borderRadius: 2 }
                : { background: "#ffffff", color: "#6e7b7c", border: "1px solid #e8e4db", borderRadius: 2 }}>
              {k.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="px-3 py-1 text-[11px] font-bold tracking-wide rounded-[2px]"
          style={modalidade === "full"
            ? { background: "#1F3D2E", color: "#f4f1ec" }
            : { background: "#cec9b8", color: "#1A1A1A" }}>
          {modalidade === "full" ? "Programação bancária incluída" : "Cliente opera o internet banking"}
        </span>
      </div>
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
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· BPO FINANCEIRO / EXECUÇÃO</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Tiramos o sócio<br /> da <span className="italic font-normal text-[#c48b30]">operação financeira.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Conduzimos as rotinas financeiras da sua empresa com método, equipe dedicada e tecnologia. Você decide com dado — não com pilha de boleto na mesa.
            </p>
          </div>
        </section>

        <StickyToggle modalidade={modalidade} setModalidade={setModalidade} />

        {/* PLANOS */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· PLANOS / BPO FINANCEIRO</span>
              <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
                Três níveis.<br /><span className="italic text-[#c48b30]">Um único método.</span>
              </h2>
              <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
                Escolha conforme a maturidade da sua operação. A metodologia Cluny é a mesma nos três — o escopo é que varia.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlanCard plano="start" modalidade={modalidade} />
              <PlanCard plano="gestao" modalidade={modalidade} dark />
              <PlanCard plano="premium" modalidade={modalidade} />
            </div>

            <div className="mt-10 rounded-[4px] p-8 bg-[#1A1A1A] grid md:grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <h3 className="font-display font-semibold text-[20px] text-[#f4f1ec]">Não sabe qual escolher?</h3>
                <p className="text-[14px] text-[#6e7b7c] mt-2">Faça o diagnóstico gratuito em 60 segundos e eu indico o plano técnico correto para a sua operação.</p>
              </div>
              <Link to="/" hash="diagnostico" className="px-6 py-3 rounded-[2px] font-bold text-[14px] whitespace-nowrap" style={{ background: "#c48b30", color: "#1A1A1A" }}>
                Fazer diagnóstico →
              </Link>
            </div>
          </div>
        </section>

        <Calculadora />
        <Depoimentos />
        <FAQ />
        <Cadastro />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
