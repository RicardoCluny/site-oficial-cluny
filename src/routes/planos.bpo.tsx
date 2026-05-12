import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos/bpo")({
  head: () => ({
    meta: [{ title: "BPO Financeiro — Cluny" }],
  }),
  component: BpoPage,
});

function BpoPage() {
  return (
    <div style={{ background: "#f4f1ec" }}>
      <Nav />
      <section style={{ background: "#1F3D2E", padding: "120px 0" }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
          <h1
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 600,
              fontSize: 64,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            BPO Financeiro
          </h1>
          <a
            href="#cadastro"
            style={{
              display: "inline-block",
              marginTop: 40,
              background: "#c48b30",
              color: "#1A1A1A",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              padding: "16px 32px",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            Agendar conversa
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
