import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Depoimentos, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — Cluny Gestão Empresarial" },
      { name: "description", content: "Dois serviços, mesma régua técnica. BPO Financeiro, Controladoria e Contabilidade Consultiva." },
    ],
  }),
  component: PlanosHub,
});

function HubCard({ to, badge, title, desc, dark, recomendado }: any) {
  const txt = dark ? "#f4f1ec" : "#1A1A1A";
  const sub = dark ? "#cec9b8" : "#6e7b7c";
  return (
    <Link to={to} className="block p-8 rounded-[4px] transition-all hover:-translate-y-1"
      style={{ background: dark ? "#1F3D2E" : "#ffffff", border: dark ? "none" : "1px solid #e8e4db" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="label-mono" style={{ color: sub }}>{badge}</span>
        {recomendado && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· RECOMENDADO</span>}
      </div>
      <h3 className="font-display font-semibold text-[24px]" style={{ color: txt }}>{title}</h3>
      <p className="text-[14px] mt-3 leading-relaxed" style={{ color: sub }}>{desc}</p>
      <div className="mt-6 text-[13px] font-bold tracking-wide" style={{ color: dark ? "#c48b30" : "#005a54" }}>
        Ver plano →
      </div>
    </Link>
  );
}

function PlanosHub() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20 lg:py-28">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· PLANOS / ESCOLHA O CAMINHO</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Dois serviços.<br /><span className="italic font-normal text-[#c48b30]">Mesma régua técnica.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              BPO Financeiro, Controladoria e Contabilidade são serviços distintos — operam em camadas diferentes da gestão. Podem ser contratados de forma independente ou combinada.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <HubCard to="/planos/bpo" badge="EXECUÇÃO" title="BPO Financeiro"
                desc="Operação financeira conduzida com método. 3 planos: Start, Gestão e Premium." />
              <HubCard to="/planos/controladoria" badge="TESE" title="Controladoria" dark recomendado
                desc="Inteligência financeira para decisão técnica do sócio." />
              <HubCard to="/planos/contabilidade" badge="CONSULTIVA" title="Contabilidade"
                desc="Apuração, planejamento tributário e suporte direto ao sócio." />
            </div>

            <div className="mt-8 p-6 rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "#c48b30", color: "#1F3D2E" }}>
              <span className="label-mono">· COMBO BPO + CONTROLADORIA · 15% de desconto</span>
              <Link to="/planos/bpo" className="btn-primary" style={{ background: "#1F3D2E", color: "#f4f1ec", borderColor: "#1F3D2E" }}>Conhecer →</Link>
            </div>
          </div>
        </section>

        <Depoimentos />
        <FAQ />
        <Cadastro />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
