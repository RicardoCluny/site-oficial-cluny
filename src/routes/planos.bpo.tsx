import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/cluny/Sections";

export const Route = createFileRoute("/planos/bpo")({
  head: () => ({
    meta: [
      { title: "BPO Financeiro — Cluny" },
      { name: "description", content: "BPO Financeiro Cluny: operação financeira completa em até 90 dias." },
    ],
  }),
  component: BpoPage,
});

function BpoPage() {
  return (
    <div style={{ background: "#f4f1ec" }}>
      <Nav />

      {/* HERO */}
      <section style={{ background: "#1F3D2E", padding: "96px 0" }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 10,
                color: "#6e7b7c",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 32,
              }}
            >
              · BPO FINANCEIRO / EXECUÇÃO
            </div>
            <h1
              className="text-[36px] md:text-[56px]"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontWeight: 600,
                color: "#f4f1ec",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Tiramos o sócio da
              <br />
              <em style={{ color: "#c48b30", fontStyle: "italic" }}>operação financeira.</em>
            </h1>
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#f4f1ec",
                opacity: 0.8,
                maxWidth: 520,
                marginTop: 24,
                lineHeight: 1.6,
              }}
            >
              Operação financeira completa, executada pela equipe Cluny, dimensionada para o estágio
              da sua empresa. Substitui a contratação de analista financeiro CLT com previsibilidade
              de custo e resultado em até 90 dias.
            </p>
            <a
              href="#cadastro"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" });
              }}
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
              Quero agendar uma conversa →
            </a>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section style={{ background: "#1A1A1A", padding: "28px 0" }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { n: "90 dias", l: "para operação estabilizada" },
              { n: "3 planos", l: "Start, Gestão e Premium" },
              { n: "2 modalidades", l: "Full e Assistido" },
              { n: "12 meses", l: "contrato mínimo" },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 24px",
                  borderRight: i < 3 ? "1px solid #ffffff10" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "JetBrains Mono, ui-monospace, monospace",
                    fontSize: 32,
                    color: "#c48b30",
                    lineHeight: 1.1,
                  }}
                >
                  {c.n}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#6e7b7c",
                    marginTop: 8,
                  }}
                >
                  {c.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
