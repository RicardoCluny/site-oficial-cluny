import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/cluny/Sections";
import { Header, Hero, BUsStrip, Metodo, Diagnostico } from "@/components/cluny/Home";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "#f4f1ec" }}>
      <Header />
      <main>
        <Hero />
        <BUsStrip />
        <Metodo />
        <Diagnostico />
      </main>
      <Footer />
    </div>
  );
}
