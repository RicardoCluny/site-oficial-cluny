import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, Indicadores, Metodo, Diagnostico, CalculadoraCLT, Manifesto, Cases,
  Conteudo, Materiais, FAQ, Cadastro, Footer, StickyBar,
} from "@/components/cluny/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        <Hero />
        <Indicadores />
        <Metodo />
        <Diagnostico />
        <Manifesto />
        <Cases />
        <Conteudo />
        <Materiais />
        <Cadastro />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
