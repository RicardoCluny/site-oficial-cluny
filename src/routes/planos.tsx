import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Planos, Calculadora, Depoimentos, FAQ, Cadastro, Footer, StickyBar,
} from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos · BPO Financeiro e Controladoria — Cluny" },
      { name: "description", content: "BPO Financeiro e Controladoria operados sob a mesma régua técnica. Calculadora de honorários e quadro comparativo CLT vs BPO." },
      { property: "og:title", content: "Planos — Cluny Gestão Empresarial" },
      { property: "og:description", content: "Dois serviços, mesma régua técnica. Conheça BPO Financeiro e Controladoria." },
    ],
  }),
  component: PlanosPage,
});

function PlanosHero() {
  return (
    <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <span className="label-mono text-[#c48b30]">· PLANOS / ENGAJAMENTO</span>
        <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 text-[#f4f1ec] max-w-3xl">
          Dois serviços.<br /><span className="italic font-normal">Mesma régua técnica.</span>
        </h1>
        <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
          BPO Financeiro e Controladoria são serviços distintos — operam em camadas diferentes da gestão. Podem ser contratados de forma independente ou combinada.
        </p>
      </div>
    </section>
  );
}

function PlanosPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        <PlanosHero />
        <Planos />
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
