import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, Metodo, Atuacao, Diagnostico, Manifesto, Cases,
  Conteudo, FAQ, Cadastro, Footer, StickyBar,
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
        <Metodo />
        <Atuacao />
        <Diagnostico />
        <Manifesto />
        <Cases />
        <Conteudo />
        <Cadastro />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
