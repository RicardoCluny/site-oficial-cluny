import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Receipt, Building2, GraduationCap, ChartLine, ArrowRight, User,
  FileSearch, LayoutDashboard, BarChart3, Presentation, TrendingUp,
  ChevronRight, ArrowLeft, Check, Package,
} from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";
import { Logo } from "@/components/cluny/Logo";

/* ========================================================================
   TOKENS
   ======================================================================== */
const C = {
  verde: "#005a54",
  escuro: "#1F3D2E",
  papel: "#f4f1ec",
  areia: "#cec9b8",
  laton: "#c48b30",
  cinza: "#6e7b7c",
  grafite: "#1A1A1A",
};

/* ========================================================================
   SECTION 1 — HEADER
   ======================================================================== */
export function Header() {
  const NAV = ["Finanças", "Contabilidade", "Legalização", "Educação", "Blog", "Materiais"];
  return (
    <header
      className="flex items-center justify-between"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 64,
        padding: "0 52px",
        background: C.escuro,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.18)",
      }}
    >
      <Link to="/" aria-label="Cluny - página inicial" style={{ display: "inline-flex", alignItems: "center" }}>
        <Logo variant="branco" height={32} />
      </Link>

      <nav className="hidden lg:flex items-center" style={{ gap: 6 }}>
        {NAV.map((label, idx) => (
          <React.Fragment key={label}>
            {idx === 5 && (
              <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", margin: "0 6px" }} />
            )}
            <a
              href="#"
              className="cluny-nav-link"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11.5px",
                color: "rgba(255,255,255,0.72)",
                padding: "6px 12px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "color .2s ease, background .2s ease",
              }}
            >
              {label}
            </a>
          </React.Fragment>
        ))}
      </nav>

      <a href="#" className="cluny-area-btn" aria-label="Área do Cliente">
        <User size={12} strokeWidth={2.2} className="cluny-area-icon" />
        <span className="cluny-area-label">Área do Cliente</span>
      </a>

      <style>{`
        .cluny-nav-link:hover { color: #fff !important; background: rgba(255,255,255,0.07); }
        .cluny-area-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 6px;
          padding: 9px 20px;
          background: transparent;
          color: #fff;
          font-family: Inter, system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          overflow: hidden;
          isolation: isolate;
          transition: transform .25s cubic-bezier(.2,.7,.2,1), border-color .25s ease;
        }
        .cluny-area-btn::after {
          content: "";
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.1);
          transform: scaleX(0); transform-origin: left center;
          transition: transform .35s cubic-bezier(.2,.7,.2,1);
          z-index: -1;
        }
        .cluny-area-btn:hover { border-color: rgba(255,255,255,0.7); transform: translateY(-1px); }
        .cluny-area-btn:hover::after { transform: scaleX(1); }
        .cluny-area-icon, .cluny-area-label { position: relative; z-index: 1; }
      `}</style>
    </header>
  );
}

/* ========================================================================
   SECTION 2 — HERO
   ======================================================================== */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 540, background: C.papel }}
    >
      {/* Foto */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backgroundImage: `url('${heroTeam}')`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: `
            linear-gradient(to right, ${C.papel} 0%, ${C.papel} 24%, rgba(244,241,236,0.88) 40%, rgba(244,241,236,0.50) 56%, rgba(244,241,236,0.10) 72%, transparent 86%),
            linear-gradient(to top, rgba(244,241,236,0.55) 0%, transparent 30%)
          `,
        }}
      />
      {/* Fade topo */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          zIndex: 3,
          height: 80,
          background: `linear-gradient(to bottom, rgba(244,241,236,0.9), transparent)`,
        }}
      />

      {/* Conteúdo */}
      <div
        className="absolute inset-0 flex flex-col justify-center hero-content"
        style={{ zIndex: 10, padding: "64px 56px 48px", maxWidth: 580 }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center"
          style={{
            gap: 10,
            marginBottom: 16,
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            fontSize: 10,
            color: C.verde,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "inline-block", width: 22, height: 1, background: C.verde }} />
          Gestão Empresarial
        </div>

        {/* H1 */}
        <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          <span
            className="block hero-h1"
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 600,
              fontSize: 48,
              color: C.escuro,
            }}
          >
            Sua empresa cresce?
          </span>
          <span
            className="block hero-h1"
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 600,
              fontSize: 48,
              color: C.laton,
              fontStyle: "italic",
            }}
          >
            Suas finanças acompanham?
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: 19,
            fontStyle: "italic",
            color: "#4a5c5c",
            lineHeight: 1.45,
          }}
        >
          Liberamos você, empresário, para cuidar do crescimento da empresa.
        </p>

        {/* Botões */}
        <div className="hero-buttons" style={{ display: "flex", gap: 14, marginTop: 26 }}>
          <a href="#diagnostico" className="btn-diag">
            <span className="btn-label">Fazer diagnóstico gratuito</span>
            <span className="btn-arrow" aria-hidden="true">
              <ArrowRight size={14} strokeWidth={2.2} />
            </span>
          </a>
          <a href="#proposta" className="btn-prop">
            <span className="btn-label">Solicitar proposta</span>
            <span className="btn-arrow" aria-hidden="true">
              <ArrowRight size={14} strokeWidth={2.2} />
            </span>
          </a>
        </div>

        {/* NPS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          <span style={{ color: C.laton, letterSpacing: 2, fontSize: 12 }}>★★★★★</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, ui-monospace, monospace",
              fontSize: 10,
              color: C.cinza,
            }}
          >
            NPS 94 · +500 empresas atendidas
          </span>
        </div>
      </div>

      <style>{`
        /* === Botões Hero — UX refinada === */
        .btn-diag, .btn-prop {
          position: relative;
          padding: 13px 26px;
          border-radius: 999px;
          font-family: Inter, system-ui, sans-serif;
          font-weight: 600; font-size: 13px;
          letter-spacing: 0.06em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 4px;
          cursor: pointer; text-decoration: none;
          transition: transform .25s cubic-bezier(.2,.7,.2,1),
                      box-shadow .25s ease,
                      background-color .35s ease,
                      color .25s ease,
                      border-color .25s ease,
                      gap .3s cubic-bezier(.2,.7,.2,1);
          will-change: transform;
        }
        .btn-diag { background: ${C.verde}; border: 1.5px solid ${C.verde}; color: ${C.papel};
          box-shadow: 0 6px 18px -6px rgba(0,90,84,.45), 0 2px 6px -2px rgba(0,90,84,.25); }
        .btn-prop { background: transparent; border: 1.5px solid ${C.verde}; color: ${C.verde}; }

        .btn-diag .btn-arrow, .btn-prop .btn-arrow {
          display: inline-flex; align-items: center;
          max-width: 0; opacity: 0; overflow: hidden;
          transform: translateX(-4px);
          transition: max-width .35s cubic-bezier(.2,.7,.2,1),
                      opacity .25s ease,
                      transform .35s cubic-bezier(.2,.7,.2,1);
        }
        .btn-diag:hover, .btn-prop:hover { gap: 10px; transform: translateY(-2px); }
        .btn-diag:hover .btn-arrow, .btn-prop:hover .btn-arrow,
        .btn-diag:focus-visible .btn-arrow, .btn-prop:focus-visible .btn-arrow {
          max-width: 22px; opacity: 1; transform: translateX(0);
        }

        .btn-diag:hover { background: #00736a;
          box-shadow: 0 14px 28px -10px rgba(0,90,84,.5), 0 4px 10px -2px rgba(0,90,84,.3); }
        .btn-prop:hover { background: ${C.verde}; color: ${C.papel};
          box-shadow: 0 10px 22px -10px rgba(0,90,84,.4); }

        .btn-diag:active, .btn-prop:active { transform: translateY(0) scale(.98); transition-duration: .12s; }

        .btn-diag:focus-visible, .btn-prop:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px ${C.papel}, 0 0 0 5px ${C.laton};
        }

        @media (max-width: 767px) {
          section.hero-mobile { height: 100dvh !important; }
          .hero-content { max-width: 100% !important; padding: 80px 24px 32px !important; }
          .hero-h1 { font-size: 34px !important; }
          .hero-buttons { flex-direction: column !important; width: 100%; }
          .hero-buttons > a { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}

/* ========================================================================
   SECTION 3 — FAIXA 4 BUs
   ======================================================================== */
export function BUsStrip() {
  const BUS = [
    { Icon: ChartLine, nome: "Finanças Corporativas", desc: "BPO · Controladoria" },
    { Icon: Receipt, nome: "Contabilidade", desc: "Fiscal · DP · Tributário" },
    { Icon: Building2, nome: "Legalização", desc: "Abertura · Marcas" },
    { Icon: GraduationCap, nome: "Educação Corporativa", desc: "Cursos · Mentorias" },
  ];
  return (
    <section
      style={{ background: C.escuro, borderTop: `3px solid ${C.laton}` }}
      className="grid grid-cols-2 lg:grid-cols-4"
    >
      {BUS.map(({ Icon, nome, desc }, i) => (
        <div
          key={nome}
          className="flex items-start transition-colors"
          style={{
            gap: 14,
            padding: "18px 24px 16px",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(196,139,48,0.12)",
              border: "1px solid rgba(196,139,48,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={16} color={C.laton} />
          </div>
          <div className="min-w-0">
            <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 10.5, color: C.papel }}>{nome}</div>
            <div style={{ fontFamily: "Inter", fontSize: 9, color: "#9fb8b5", marginTop: 2 }}>{desc}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ========================================================================
   SECTION 4 — MÉTODO CLUNY
   ======================================================================== */
export function Metodo() {
  const ETAPAS = [
    {
      n: "01", nome: "Diagnóstico", prog: 0,
      desc: "Mapeamos receitas, custos, fluxo de caixa, estrutura societária e obrigações fiscais. Raio-x completo do seu negócio — não relatório genérico.",
      badge: "Entregável: Relatório de Diagnóstico — 7 dias úteis",
      checks: [
        "Mapeamento completo de entradas e saídas reais",
        "Identificação de vazamentos financeiros ocultos",
        "Análise de obrigações fiscais e societárias",
      ],
    },
    {
      n: "02", nome: "Estruturação", prog: 25,
      desc: "BPO Financeiro implantado, contas PJ/PF separadas, centros de custo e modelo de relatórios que você vai receber toda semana.",
      badge: "Entregável: Plano de Contas + DRE Gerencial — 30 a 60 dias",
      checks: [
        "Separação PJ/PF e centros de custo",
        "DRE Gerencial configurado para seu modelo",
        "Dashboard de indicadores semanais implantado",
      ],
    },
    {
      n: "03", nome: "Controle", prog: 50,
      desc: "Relatórios semanais, fechamento mensal, conciliação bancária e KPIs que revelam onde o dinheiro está indo antes que vire problema.",
      badge: "Entregável: Relatórios Semanais + KPIs — Contínuo",
      checks: [
        "Relatório semanal entregue toda segunda-feira",
        "Conciliação bancária e controle de inadimplência",
        "KPIs de performance ajustados ao seu setor",
      ],
    },
    {
      n: "04", nome: "Decisão", prog: 75,
      desc: "Reunião mensal de resultado com dados reais. Você decide sobre contratações, investimentos e estratégia com base em números.",
      badge: "Entregável: Reunião Mensal + Plano de Ação — Mensal",
      checks: [
        "Reunião mensal estruturada com agenda e ata",
        "Análise de desvios e plano de correção imediata",
        "Suporte a decisões de investimento e expansão",
      ],
    },
    {
      n: "05", nome: "Crescimento", prog: 100,
      desc: "Planejamento orçamentário, modelagem de cenários e suporte estratégico para escalar com segurança e intencionalidade.",
      badge: "Entregável: Orçamento Anual + Cenários — Contínuo",
      checks: [
        "Orçamento anual com metas e KPIs de desempenho",
        "Modelagem de cenários: otimista, realista e conservador",
        "Suporte estratégico contínuo para decisões de escala",
      ],
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setActive(0), 400);
    return () => clearTimeout(t);
  }, []);

  function toggle(i: number) {
    setActive((curr) => (curr === i ? null : i));
  }

  const current = active !== null ? ETAPAS[active] : null;
  const prog = current ? current.prog : 0;

  return (
    <section style={{ background: C.escuro, paddingTop: 80 }}>
      {/* Bloco superior */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 420 }}>
        {/* Coluna esquerda */}
        <div style={{ padding: "0 56px 64px" }} className="lg:py-0">
          <div
            className="flex items-center"
            style={{
              gap: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "rgba(196,139,48,0.85)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span style={{ width: 22, height: 1, background: C.laton }} />
            Nosso Método
          </div>

          <h2
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 600,
              fontSize: 44,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: C.papel,
              margin: 0,
            }}
          >
            O{" "}
            <span style={{ color: C.laton, fontStyle: "italic" }}>Método</span>{" "}
            Cluny
          </h2>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: 15,
              color: "#9fb8b5",
              marginTop: 6,
              maxWidth: 400,
              lineHeight: 1.5,
            }}
          >
            5 etapas que transformam caos financeiro em clareza estratégica.
          </p>

          <p
            style={{
              fontFamily: "Inter",
              fontSize: 13.5,
              color: C.areia,
              lineHeight: 1.75,
              maxWidth: 400,
              marginTop: 16,
            }}
          >
            Não entregamos relatório. Gerenciamos junto com você — do diagnóstico
            à decisão, com dados reais, frequência semanal e responsabilidade
            sobre o resultado.
          </p>

          <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            {[
              ["30d", "Implantação inicial"],
              ["+500", "Empresas atendidas"],
              ["∞", "Ciclo contínuo"],
            ].map(([v, l]) => (
              <div key={l} style={{ borderLeft: `2px solid ${C.laton}`, paddingLeft: 14 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 26, color: C.laton }}>{v}</div>
                <div style={{ fontFamily: "Inter", fontSize: 10, color: "#9fb8b5", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita - imagem */}
        <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=900&q=85&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${C.escuro} 0%, rgba(31,61,46,0.2) 35%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* Infográfico interativo */}
      <div
        className="metodo-info"
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          ["--prog" as any]: `${prog}%`,
        }}
      >
        {/* Trilha de nós */}
        <div className="metodo-trilha" style={{ display: "flex", position: "relative" }}>
          {ETAPAS.map((e, i) => {
            const isActive = active === i;
            return (
              <button
                key={e.n}
                onClick={() => toggle(i)}
                className="etapa-node"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "28px 8px 24px",
                  background: isActive ? "rgba(196,139,48,0.06)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(ev) => {
                  if (!isActive) ev.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(ev) => {
                  if (!isActive) ev.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `2px solid ${isActive ? C.laton : "rgba(255,255,255,0.12)"}`,
                    background: isActive ? "rgba(196,139,48,0.15)" : "rgba(255,255,255,0.05)",
                    boxShadow: isActive ? "0 0 0 6px rgba(196,139,48,0.08)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 16,
                    color: isActive ? C.laton : "rgba(255,255,255,0.35)",
                    zIndex: 2,
                    position: "relative",
                    transition: "all 0.3s ease",
                  }}
                >
                  {e.n}
                </span>
                <span
                  style={{
                    marginTop: 14,
                    fontFamily: "Fraunces, Georgia, serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: isActive ? C.papel : "rgba(255,255,255,0.45)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {e.nome}
                </span>
                <span
                  style={{
                    marginTop: 10,
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: `8px solid ${C.laton}`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Painel */}
        <div
          style={{
            maxHeight: active !== null ? 320 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s ease",
            borderTop: active !== null ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          {current && (
            <div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ animation: "metodo-fade 0.35s ease both" }}
            >
              <div style={{ padding: "36px 48px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    color: C.laton,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  Etapa {current.n}
                </div>
                <div
                  style={{
                    fontFamily: "Fraunces, Georgia, serif",
                    fontWeight: 600,
                    fontSize: 22,
                    color: C.papel,
                    marginTop: 6,
                    marginBottom: 10,
                  }}
                >
                  {current.nome}
                </div>
                <p style={{ fontFamily: "Inter", fontSize: 13, color: "#9fb8b5", lineHeight: 1.7, margin: 0 }}>
                  {current.desc}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9.5,
                    color: C.laton,
                    background: "rgba(196,139,48,0.1)",
                    border: "1px solid rgba(196,139,48,0.25)",
                    borderRadius: 4,
                    padding: "4px 10px",
                  }}
                >
                  {current.badge}
                </div>
              </div>
              <div
                style={{
                  padding: "36px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                {current.checks.map((c) => (
                  <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        borderRadius: "50%",
                        background: "rgba(0,90,84,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7ecdc4",
                        fontSize: 11,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontFamily: "Inter", fontSize: 12, color: C.areia, lineHeight: 1.55 }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          .metodo-trilha::before {
            content: "";
            position: absolute;
            top: 52px; left: 10%; right: 10%;
            height: 2px; background: rgba(255,255,255,0.10);
            z-index: 0;
          }
          .metodo-trilha::after {
            content: "";
            position: absolute;
            top: 52px; left: 10%;
            height: 2px;
            width: calc((100% - 20%) * var(--prog) / 100%);
            background: linear-gradient(to right, ${C.laton}, rgba(196,139,48,0.4));
            z-index: 1;
            transition: width 0.6s ease;
          }
          @keyframes metodo-fade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ========================================================================
   SECTION 5 — DIAGNÓSTICO FINANCEIRO
   ======================================================================== */
type Pergunta = { texto: string; opcoes: string[] };
const QUIZ: Pergunta[] = [
  { texto: "Qual é o faturamento mensal da sua empresa?", opcoes: ["Até R$ 50k", "R$ 50k–200k", "R$ 200k–1M", "Acima de R$ 1M"] },
  { texto: "Você sabe qual é a sua margem de lucro real?", opcoes: ["Sim, com precisão", "Tenho ideia aproximada", "Não sei", "Não acompanho"] },
  { texto: "Como é o seu controle financeiro atual?", opcoes: ["Planilha própria", "Sistema ERP", "Meu contador", "Sem controle estruturado"] },
  { texto: "Qual situação mais representa seu negócio?", opcoes: ["Faturei bem, mas não sobrou", "Não sei se posso contratar", "Contador só aparece no IR", "Não tenho dados para decidir"] },
  { texto: "Principal objetivo nos próximos 12 meses?", opcoes: ["Organizar as finanças", "Reduzir custos e margem", "Escalar com segurança", "Ter clareza para decidir"] },
];

export function Diagnostico() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ.length).fill(null));
  const [finished, setFinished] = useState(false);

  const total = QUIZ.length;
  const answered = answers.filter((a) => a !== null).length;
  const progress = finished ? 100 : Math.round((answered / total) * 100);
  const q = QUIZ[step];

  function selectOpt(i: number) {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
  }
  function nextStep() {
    if (answers[step] === null) return;
    if (step < total - 1) setStep(step + 1);
    else setFinished(true);
  }
  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <section id="diagnostico" style={{ background: C.papel }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 560 }}>
        {/* Coluna esquerda — imagem com texto */}
        <div className="relative overflow-hidden order-1 lg:order-1" style={{ minHeight: 320 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, rgba(31,61,46,0.75) 0%, rgba(31,61,46,0.2) 45%, transparent 65%),
                linear-gradient(to right, transparent 55%, ${C.papel} 100%),
                linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 35%)
              `,
            }}
          />
          <div
            className="absolute"
            style={{ top: 36, left: 36, right: 36, zIndex: 5 }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                color: "rgba(196,139,48,0.95)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ display: "inline-block", width: 16, height: 1, background: "rgba(196,139,48,0.95)" }} />
              Por dentro do diagnóstico
            </div>
            <h3
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: 26,
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.15,
                margin: 0,
                marginTop: 10,
              }}
            >
              2 minutos para entender<br />
              onde está o{" "}
              <em style={{ color: C.laton, fontStyle: "italic" }}>problema</em>
            </h3>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: 12,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.65,
                marginTop: 8,
                marginBottom: 0,
              }}
            >
              Respondendo 5 perguntas, identificamos o estágio financeiro
              da sua empresa e o próximo passo mais importante.
            </p>
            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(196,139,48,0.18)",
                border: "1px solid rgba(196,139,48,0.40)",
                borderRadius: 20,
                padding: "6px 14px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.laton} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  color: C.laton,
                }}
              >
                Diagnóstico em 2 minutos · Gratuito · Sem compromisso
              </span>
            </div>
          </div>
        </div>

        {/* Coluna direita — quiz */}
        <div
          className="flex flex-col order-2 lg:order-2"
          style={{ padding: "40px 36px", background: C.papel }}
        >
          {/* Eyebrow */}
          <div
            className="flex items-center"
            style={{
              gap: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: C.verde,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            <span style={{ width: 22, height: 1, background: C.verde }} />
            Diagnóstico gratuito
          </div>

          <h3
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: 22,
              fontWeight: 600,
              color: C.escuro,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Diagnóstico Financeiro
          </h3>
          <p style={{ fontFamily: "Inter", fontSize: 12.5, color: "#4a5c5c", marginTop: 4, marginBottom: 24 }}>
            5 perguntas. 2 minutos. Descoberta real.
          </p>

          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div className="flex justify-between items-baseline" style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "Inter", fontSize: 11, color: C.cinza }}>Progresso</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.verde }}>
                {finished ? total : answered} de {total}
              </span>
            </div>
            <div style={{ width: "100%", height: 4, background: "#e0dcd4", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: C.verde,
                  borderRadius: 2,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {!finished ? (
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  color: C.laton,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                Pergunta {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <h4
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.escuro,
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                {q.texto}
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.opcoes.map((opt, i) => {
                  const selected = answers[step] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectOpt(i)}
                      style={{
                        textAlign: "left",
                        border: `1.5px solid ${selected ? C.verde : C.areia}`,
                        borderRadius: 10,
                        background: selected ? "#f0faf9" : "#fff",
                        padding: "11px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontFamily: "Inter",
                        fontSize: 12.5,
                        color: selected ? C.verde : C.escuro,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) {
                          e.currentTarget.style.borderColor = C.verde;
                          e.currentTarget.style.background = "#f0faf9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) {
                          e.currentTarget.style.borderColor = C.areia;
                          e.currentTarget.style.background = "#fff";
                        }
                      }}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: `1.5px solid ${selected ? C.verde : C.areia}`,
                          background: selected ? C.verde : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {selected && (
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  style={{
                    border: `1.5px solid ${C.areia}`,
                    background: "transparent",
                    color: step === 0 ? C.areia : C.cinza,
                    padding: "10px 20px",
                    borderRadius: 50,
                    fontFamily: "Inter",
                    fontSize: 12.5,
                    fontWeight: 500,
                    cursor: step === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (step !== 0) {
                      e.currentTarget.style.borderColor = C.verde;
                      e.currentTarget.style.color = C.verde;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.areia;
                    e.currentTarget.style.color = step === 0 ? C.areia : C.cinza;
                  }}
                >
                  ← Voltar
                </button>
                <button
                  onClick={nextStep}
                  disabled={answers[step] === null}
                  style={{
                    background: answers[step] === null ? C.areia : C.verde,
                    color: C.papel,
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 50,
                    fontFamily: "Inter",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: answers[step] === null ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {step === total - 1 ? "Ver resultado" : "Próxima →"}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
              <div
                style={{
                  background: "rgba(0,90,84,0.07)",
                  border: "1px solid rgba(0,90,84,0.15)",
                  borderRadius: 12,
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, color: C.verde }}>
                  Alto potencial
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 11, color: C.cinza, marginTop: 2 }}>
                  de melhora identificado
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Existem ganhos imediatos de margem ao estruturar o controle.",
                  "O fluxo de caixa pode ser previsível em até 45 dias.",
                  "Decisões estratégicas ganham base com relatórios semanais.",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: C.verde,
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontFamily: "Inter", fontSize: 12.5, color: "#4a5c5c", lineHeight: 1.6 }}>
                      {t}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#cadastro"
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 50,
                  background: C.verde,
                  color: C.papel,
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: "center",
                  boxShadow: "0 4px 18px rgba(0,90,84,0.28)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#004a44";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.verde;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Agendar conversa com especialista
              </a>

              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <span style={{ color: C.laton, letterSpacing: 2, fontSize: 12 }}>★★★★★</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.cinza }}>
                  NPS 94 · Sem compromisso
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
