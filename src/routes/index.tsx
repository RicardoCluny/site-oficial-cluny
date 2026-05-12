import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, Atuacao, ComoFunciona, Diagnostico, Metodo, Planos,
  Manifesto, Cases, Depoimentos, Calculadora, Conteudo, FAQ, Cadastro, Footer, StickyBar,
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
        <Atuacao />
        <ComoFunciona />
        <Diagnostico />
        <Metodo />
        <Planos />
        <Manifesto />
        <Cases />
        <Depoimentos />
        <Calculadora />
        <Conteudo />
        <FAQ />
        <Cadastro />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
