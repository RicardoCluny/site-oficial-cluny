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
      n: "01", nome: "Diagnóstico", Icon: FileSearch,
      resumo: "Raio-x completo do negócio",
      tempo: "7 dias úteis",
      desc: "Mapeamos receitas, custos, fluxo de caixa, estrutura societária e obrigações fiscais. Raio-x completo do seu negócio — não relatório genérico.",
      entregavel: "Relatório de Diagnóstico financeiro e fiscal",
      checks: [
        ["Mapeamento", " de entradas e saídas reais"],
        ["Identificação", " de vazamentos financeiros ocultos"],
        ["Análise", " de obrigações fiscais e societárias"],
      ],
    },
    {
      n: "02", nome: "Estruturação", Icon: LayoutDashboard,
      resumo: "BPO + centros de custo + DRE",
      tempo: "30 a 60 dias",
      desc: "BPO Financeiro implantado, contas PJ/PF separadas, centros de custo e modelo de relatórios que você vai receber toda semana.",
      entregavel: "Plano de Contas + DRE Gerencial estruturado",
      checks: [
        ["Separação PJ/PF", " e centros de custo definidos"],
        ["DRE Gerencial", " configurado para seu modelo"],
        ["Dashboard semanal", " de indicadores implantado"],
      ],
    },
    {
      n: "03", nome: "Controle", Icon: BarChart3,
      resumo: "Relatórios semanais + KPIs",
      tempo: "Contínuo",
      desc: "Relatórios semanais, fechamento mensal, conciliação bancária e KPIs que revelam onde o dinheiro está indo antes que vire problema.",
      entregavel: "Relatórios semanais e KPIs em tempo real",
      checks: [
        ["Relatório semanal", " entregue toda segunda-feira"],
        ["Conciliação bancária", " e controle de inadimplência"],
        ["KPIs de performance", " ajustados ao seu setor"],
      ],
    },
    {
      n: "04", nome: "Decisão", Icon: Presentation,
      resumo: "Reunião mensal de resultado",
      tempo: "Mensal",
      desc: "Reunião mensal de resultado com dados reais. Você decide sobre contratações, investimentos e estratégia com base em números.",
      entregavel: "Reunião Mensal de Resultado + Plano de Ação",
      checks: [
        ["Reunião mensal", " estruturada com agenda e ata"],
        ["Análise de desvios", " e plano de correção imediata"],
        ["Suporte estratégico", " a decisões de investimento"],
      ],
    },
    {
      n: "05", nome: "Crescimento", Icon: TrendingUp,
      resumo: "Orçamento + cenários + escala",
      tempo: "Estratégico",
      desc: "Planejamento orçamentário, modelagem de cenários e suporte estratégico para escalar com segurança e intencionalidade.",
      entregavel: "Orçamento Anual + Modelagem de Cenários",
      checks: [
        ["Orçamento anual", " com metas e KPIs de desempenho"],
        ["Modelagem de cenários", " — otimista, realista, conservador"],
        ["Suporte estratégico", " contínuo para decisões de escala"],
      ],
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setActive(0), 300);
    return () => clearTimeout(t);
  }, []);

  const toggle = (i: number) => setActive((c) => (c === i ? null : i));
  const current = active !== null ? ETAPAS[active] : null;

  return (
    <section>
      {/* BLOCO 1 — TOPO ESCURO */}
      <div
        style={{
          background: C.escuro,
          padding: "64px 56px 56px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
        className="metodo-top"
      >
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "rgba(196,139,48,0.85)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            ── Nosso Método
          </div>
          <h2
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: C.papel,
              margin: 0,
            }}
          >
            O <span style={{ color: C.laton, fontStyle: "italic" }}>Método</span>
            <br />Cluny
          </h2>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              color: "#9fb8b5",
              lineHeight: 1.72,
              maxWidth: 400,
              marginTop: 14,
            }}
          >
            Não entregamos relatório. Gerenciamos junto com você — do diagnóstico
            à decisão, com dados reais, frequência semanal e responsabilidade
            sobre o resultado.
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: 28, flexWrap: "wrap" }}>
            {[
              ["30d", "Implantação inicial"],
              ["+500", "Empresas atendidas"],
              ["∞", "Ciclo contínuo"],
            ].map(([v, l]) => (
              <div key={l} style={{ borderLeft: `2px solid ${C.laton}`, paddingLeft: 14 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 24, color: C.laton }}>{v}</div>
                <div style={{ fontFamily: "Inter", fontSize: 9.5, color: "#9fb8b5", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            height: 240,
            boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1000&q=85&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(0,90,84,0.15), transparent)",
            }}
          />
        </div>
      </div>

      {/* BLOCO 2 — CORPO CLARO */}
      <div
        className="metodo-body"
        style={{
          background: C.papel,
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          minHeight: 480,
        }}
      >
        {/* COLUNA ESQUERDA — LISTA */}
        <div className="metodo-list">
          {ETAPAS.map((e, i) => {
            const isActive = active === i;
            const isDone = active !== null && i < active;
            return (
              <button
                key={e.n}
                onClick={() => toggle(i)}
                className={`etapa-item ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                type="button"
              >
                <span className="e-circle">
                  <span className="e-num">{e.n}</span>
                </span>
                <span className="e-info">
                  <span className="e-nome">{e.nome}</span>
                  <span className="e-resumo">{e.resumo}</span>
                  <span className="e-tempo">{e.tempo}</span>
                </span>
                <ChevronRight size={16} className="e-arrow" />
              </button>
            );
          })}
        </div>

        {/* COLUNA DIREITA — PAINEL */}
        <div className="metodo-panel">
          {!current && (
            <div className="metodo-placeholder">
              <ArrowLeft size={48} strokeWidth={1.5} style={{ color: "rgba(0,90,84,0.12)" }} />
              <div
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "rgba(0,90,84,0.25)",
                  marginTop: 16,
                }}
              >
                Selecione uma etapa
              </div>
              <div
                style={{
                  fontFamily: "Inter",
                  fontSize: 13,
                  color: "rgba(0,90,84,0.2)",
                  marginTop: 6,
                }}
              >
                Clique em qualquer etapa para ver os detalhes
              </div>
            </div>
          )}
          {current && (
            <div key={active} className="metodo-content">
              <div className="m-bignum">{current.n}</div>
              <div className="m-tag">
                <span className="m-tag-line" />
                Etapa {current.n} · {current.nome}
              </div>
              <h3 className="m-nome">{current.nome}</h3>
              <p className="m-desc">{current.desc}</p>

              <div className="m-card">
                <div className="m-card-icon">
                  <Package size={16} color={C.verde} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="m-card-label">ENTREGÁVEL</div>
                  <div className="m-card-valor">{current.entregavel}</div>
                </div>
                <div className="m-card-tempo">{current.tempo}</div>
              </div>

              <div className="m-checklist">
                {current.checks.map(([strong, rest], idx) => (
                  <div key={idx} className="m-check-item">
                    <span className="m-check-icon">
                      <Check size={11} strokeWidth={2.6} color={C.verde} />
                    </span>
                    <span className="m-check-text">
                      <strong>{strong}</strong>{rest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* === LISTA ESQUERDA === */
        .metodo-list {
          position: relative;
          background: #ffffff;
          border-right: 1px solid rgba(0,90,84,0.08);
          box-shadow: 4px 0 24px rgba(0,0,0,0.05);
          z-index: 2;
          padding: 8px 0;
        }
        .metodo-list::before {
          content: "";
          position: absolute;
          left: 48px; top: 40px; bottom: 40px;
          width: 2px;
          background: rgba(0,90,84,0.08);
          z-index: 0;
        }
        .etapa-item {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 28px 20px 24px;
          width: 100%;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: background .25s ease, border-color .25s ease;
          overflow: hidden;
        }
        .etapa-item::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,90,84,0.04), transparent);
          opacity: 0;
          transition: opacity .25s ease;
          pointer-events: none;
        }
        .etapa-item:hover { background: rgba(0,90,84,0.03); }
        .etapa-item:hover::after { opacity: 1; }
        .etapa-item.is-active {
          background: rgba(196,139,48,0.05);
          border-left-color: ${C.laton};
        }
        .e-circle {
          position: relative;
          z-index: 1;
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(0,90,84,0.15);
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all .3s ease;
        }
        .etapa-item:hover .e-circle {
          border-color: rgba(0,90,84,0.35);
          box-shadow: 0 4px 16px rgba(0,90,84,0.14);
          transform: scale(1.05);
        }
        .etapa-item.is-active .e-circle {
          border-color: ${C.laton};
          background: linear-gradient(135deg, rgba(196,139,48,0.12), rgba(196,139,48,0.04));
          box-shadow: 0 4px 20px rgba(196,139,48,0.25), 0 0 0 4px rgba(196,139,48,0.08);
          transform: scale(1.05);
        }
        .etapa-item.is-done .e-circle {
          border-color: rgba(0,90,84,0.3);
          background: rgba(0,90,84,0.04);
        }
        .e-num {
          font-family: "JetBrains Mono", monospace;
          font-size: 14px; font-weight: 600;
          color: rgba(0,90,84,0.35);
          transition: color .25s ease;
        }
        .etapa-item:hover .e-num { color: ${C.verde}; }
        .etapa-item.is-active .e-num { color: ${C.laton}; }
        .etapa-item.is-done .e-num { color: rgba(0,90,84,0.55); }

        .e-info { display: flex; flex-direction: column; flex: 1; padding-top: 4px; min-width: 0; }
        .e-nome {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600; font-size: 16px;
          color: #2a3a2a; margin-bottom: 4px;
          transition: color .25s ease;
        }
        .etapa-item:hover .e-nome { color: ${C.verde}; }
        .etapa-item.is-active .e-nome { color: ${C.escuro}; }
        .e-resumo {
          font-family: "Inter";
          font-size: 11.5px; color: ${C.cinza};
          line-height: 1.5;
        }
        .e-tempo {
          align-self: flex-start;
          margin-top: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 9px; color: ${C.laton};
          background: rgba(196,139,48,0.1);
          border: 1px solid rgba(196,139,48,0.2);
          border-radius: 20px;
          padding: 3px 10px;
        }
        .e-arrow {
          align-self: center;
          margin-left: auto;
          color: rgba(0,90,84,0.18);
          transition: color .25s ease, transform .25s ease;
          flex-shrink: 0;
        }
        .etapa-item:hover .e-arrow { color: ${C.verde}; transform: translateX(3px); }
        .etapa-item.is-active .e-arrow { color: ${C.laton}; transform: translateX(3px); }

        /* === PAINEL DIREITA === */
        .metodo-panel {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fafaf7 0%, ${C.papel} 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .metodo-panel::before {
          content: "";
          position: absolute;
          top: -100px; right: -100px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(0,90,84,0.04), transparent 70%);
          pointer-events: none;
        }
        .metodo-panel::after {
          content: "";
          position: absolute;
          bottom: -80px; left: -80px;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(196,139,48,0.05), transparent 70%);
          pointer-events: none;
        }
        .metodo-placeholder {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 52px;
        }
        .metodo-content {
          position: relative;
          z-index: 1;
          padding: 52px;
          animation: m-in .4s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes m-in {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .m-bignum {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 96px;
          line-height: 1;
          color: rgba(0,90,84,0.05);
          margin-bottom: -20px;
          user-select: none;
        }
        .m-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: "JetBrains Mono", monospace;
          font-size: 9.5px;
          color: ${C.laton};
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
        }
        .m-tag-line {
          display: inline-block;
          width: 16px; height: 1px;
          background: ${C.laton};
        }
        .m-nome {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 30px;
          color: ${C.escuro};
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }
        .m-desc {
          font-family: "Inter";
          font-size: 14px;
          color: #3a4a40;
          line-height: 1.75;
          max-width: 440px;
          margin: 0 0 24px 0;
        }
        .m-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #fff;
          border-radius: 10px;
          padding: 16px 20px;
          border: 1px solid rgba(0,90,84,0.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
          margin-bottom: 24px;
        }
        .m-card-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(0,90,84,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .m-card-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 9.5px;
          color: ${C.cinza};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .m-card-valor {
          font-family: "Inter";
          font-size: 12.5px;
          font-weight: 600;
          color: ${C.escuro};
          line-height: 1.4;
        }
        .m-card-tempo {
          font-family: "JetBrains Mono", monospace;
          font-size: 9px;
          color: ${C.laton};
          background: rgba(196,139,48,0.1);
          border: 1px solid rgba(196,139,48,0.2);
          border-radius: 20px;
          padding: 4px 10px;
          margin-left: auto;
          white-space: nowrap;
          align-self: center;
        }
        .m-checklist {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .m-check-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,90,84,0.06);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow .2s ease, transform .2s ease;
        }
        .m-check-item:hover {
          box-shadow: 0 4px 14px rgba(0,90,84,0.1);
          transform: translateX(3px);
        }
        .m-check-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(0,90,84,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: background .2s ease;
        }
        .m-check-item:hover .m-check-icon { background: rgba(0,90,84,0.18); }
        .m-check-text {
          font-family: "Inter";
          font-size: 12.5px;
          color: #3a4a40;
          line-height: 1.5;
        }
        .m-check-text strong {
          color: ${C.escuro};
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .metodo-top { grid-template-columns: 1fr !important; padding: 48px 24px !important; }
          .metodo-body { grid-template-columns: 1fr !important; }
          .metodo-list { border-right: none; box-shadow: none; border-bottom: 1px solid rgba(0,90,84,0.08); }
        }
      `}</style>
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
