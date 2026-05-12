import { createFileRoute } from "@tanstack/react-router";
import { Nav, Depoimentos, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";
import { CalcControladoria } from "@/components/cluny/CalcControladoria";

export const Route = createFileRoute("/planos/controladoria")({
  head: () => ({
    meta: [
      { title: "Controladoria — Cluny" },
      { name: "description", content: "Controladoria Cluny: KPIs sob medida, DRE gerencial comentado e reuniões técnicas com o sócio." },
    ],
  }),
  component: ControladoriaPage,
});

function ControladoriaPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· CONTROLADORIA / TESE</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Decisão com dado.<br /><span className="italic font-normal text-[#c48b30]">Não com intuição.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Conduzo a inteligência financeira da sua empresa — KPIs sob medida, DRE gerencial comentado e reuniões técnicas com o sócio. Para quem quer tese, não relatório.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="rounded-[4px] p-8 lg:p-12 bg-[#1F3D2E] text-[#f4f1ec] relative">
              <span className="absolute top-4 right-4 px-2 py-1 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· RECOMENDADO</span>
              <span className="label-mono text-[#c48b30]">SERVIÇO 02 · CAMADA TESE</span>
              <h2 className="font-display text-[32px] lg:text-[40px] mt-4">Controladoria Cluny</h2>
              <p className="font-display italic text-[16px] mt-2" style={{ color: "#cec9b8" }}>A inteligência financeira que orienta a decisão do sócio.</p>

              <div className="mt-8">
                <span className="text-[13px]" style={{ color: "#cec9b8" }}>a partir de </span>
                <span className="font-mono-tech text-[44px]">R$ 7.200</span>
                <span className="text-[14px]" style={{ color: "#cec9b8" }}>/mês</span>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Painel de KPIs sob medida",
                  "DRE gerencial mensal comentado",
                  "Análise de margem por linha/cliente",
                  "Orçamento anual com revisão trimestral",
                  "Modelagem de cenários (3 horizontes)",
                  "Reunião mensal com o sócio (90 min)",
                  "Sessão trimestral de tese (3 horas)",
                ].map((e) => (
                  <div key={e} className="flex gap-2 text-[14px]"><span style={{ color: "#c48b30" }}>→</span>{e}</div>
                ))}
              </div>

              <a href="#cadastro" className="inline-flex mt-10 px-6 py-3 rounded-[2px] font-bold text-[13px]" style={{ background: "#c48b30", color: "#1A1A1A" }}>
                Quero a Controladoria →
              </a>
            </div>
          </div>
        </section>

        <CalcControladoria />
        <Depoimentos />
        <FAQ />
        <Cadastro />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
