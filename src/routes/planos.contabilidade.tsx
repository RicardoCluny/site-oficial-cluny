import { createFileRoute } from "@tanstack/react-router";
import { Nav, Depoimentos, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";
import { CalcContabilidade } from "@/components/cluny/CalcContabilidade";

export const Route = createFileRoute("/planos/contabilidade")({
  head: () => ({
    meta: [
      { title: "Contabilidade Consultiva — Cluny" },
      { name: "description", content: "Contabilidade consultiva Cluny: apuração, planejamento tributário e suporte direto ao sócio." },
    ],
  }),
  component: ContabPage,
});

function ContabPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· CONTABILIDADE / CONSULTIVA</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Contabilidade que<br /><span className="italic font-normal text-[#c48b30]">explica o que faz.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Conduzo a apuração mensal, o planejamento tributário e o suporte direto ao sócio. O relatório que entrego precisa ser lido — não apenas arquivado.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="rounded-[4px] p-8 lg:p-12 bg-white border border-[#e8e4db]">
              <span className="label-mono text-[#005a54]">· CONTABILIDADE CONSULTIVA</span>
              <h2 className="font-display font-semibold text-[32px] text-[#1F3D2E] mt-4">O que está incluído</h2>

              <div className="mt-8 grid md:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Apuração mensal completa",
                  "Planejamento tributário anual",
                  "Departamento pessoal",
                  "Suporte direto ao sócio",
                  "DRE gerencial comentado",
                  "Reunião técnica mensal",
                ].map((e) => (
                  <div key={e} className="flex gap-2 text-[14px] text-[#1A1A1A]"><span className="text-[#c48b30]">→</span>{e}</div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#e8e4db]">
                <span className="text-[13px] text-[#6e7b7c]">a partir de </span>
                <span className="font-mono-tech text-[36px] text-[#1A1A1A]">R$ 2.400</span>
                <span className="text-[14px] text-[#6e7b7c]">/mês</span>
              </div>

              <a href="#cadastro" className="inline-flex mt-8 px-6 py-3 rounded-[2px] font-bold text-[13px]" style={{ background: "#005a54", color: "#f4f1ec" }}>
                Quero a Contabilidade Cluny →
              </a>
            </div>
          </div>
        </section>

        <CalcContabilidade />
        <Depoimentos />
        <FAQ />
        <Cadastro />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
