import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, Diagnostico, Metodo, Planos,
  Manifesto, Cases, Depoimentos, Calculadora, Conteudo, FAQ, Cadastro, Footer,
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
    </div>
  );
}
