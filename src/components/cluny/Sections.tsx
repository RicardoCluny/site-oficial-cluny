import { useState, useMemo, useEffect, useRef } from "react";
import { Logo } from "@/components/cluny/Logo";
import blogTrib from "@/assets/blog-tributario.jpg";
import blogDre from "@/assets/blog-dre.jpg";
import blogHolding from "@/assets/blog-holding.jpg";
import faqIllu from "@/assets/faq-illustration.jpg";

/* ============ Helpers CRO ============ */
function useCounterUp(to: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return { ref, val };
}

function requestCadastro(interesse: string) {
  try {
    window.dispatchEvent(new CustomEvent("cluny:prefill", { detail: { interesse } }));
  } catch { /* noop */ }
  const el = document.getElementById("cadastro");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CounterMetric({ value, format }: { value: number; format: (n: number) => string }) {
  const { ref, val } = useCounterUp(value);
  return <span ref={ref}>{format(val)}</span>;
}

type NavItem = { label: string; href: string; mega?: { n: string; t: string; sub: string }[] };
const NAV_MEGA = [
  { n: "BU-01", t: "Finanças", sub: "Gestão financeira sob método" },
  { n: "BU-02", t: "Contabilidade", sub: "Contabilidade consultiva" },
  { n: "BU-03", t: "Legalização", sub: "Constituição e regularização" },
  { n: "BU-04", t: "Educação Corporativa", sub: "Capacitação técnica aplicada" },
];
const NAV: NavItem[] = [
  { label: "Atuação", href: "#atuacao", mega: NAV_MEGA },
  { label: "Planos", href: "#planos" },
  { label: "Método", href: "#metodo" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Cases", href: "#cases" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const ids = NAV.map((n) => n.href.replace("#", ""));
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = !scrolled;
  const txtColor = onLight ? "#1A1A1A" : "#f4f1ec";
  const inactiveOpacity = onLight ? "opacity-70" : "opacity-75";
  const logoColor = onLight ? "#1A1A1A" : "#f4f1ec";

  const handleEnter = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setMegaOpen(label), 150);
  };
  const handleLeave = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(null), 100);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1F3D2E] border-b border-[rgba(255,255,255,0.08)]"
          : "bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.08)]"
      }`}
    >
      <div className="bg-[#1A1A1A] border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-7 flex items-center justify-between gap-6">
          <span className="label-tech text-[#6e7b7c] truncate">
            INDEX / HOME · REGISTRO CRC-SP 2SP-000000 · ATUALIZADO 11.MAI.2026 · LATITUDE -23.5505, -46.6333
          </span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2 group">
          <Logo size={28} color={logoColor} />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const isActive = active === n.href.replace("#", "");
            const hasMega = !!n.mega;
            return (
              <div
                key={n.href}
                className="relative"
                onMouseEnter={hasMega ? () => handleEnter(n.label) : undefined}
                onMouseLeave={hasMega ? handleLeave : undefined}
              >
                <a
                  href={n.href}
                  style={{ color: txtColor }}
                  className={`relative inline-flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium transition-all duration-200 border-b-2 ${
                    isActive
                      ? "border-[#005a54] opacity-100"
                      : `border-transparent ${inactiveOpacity} hover:opacity-100`
                  }`}
                >
                  {n.label}
                  {hasMega && <span className="text-[9px] opacity-60">▾</span>}
                </a>
                {hasMega && megaOpen === n.label && (
                  <div
                    className="mega-in absolute left-0 top-full mt-0 z-50 bg-white rounded-[4px] p-6 min-w-[520px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)", borderTop: "3px solid #005a54" }}
                    onMouseEnter={() => { if (closeTimer.current) window.clearTimeout(closeTimer.current); }}
                    onMouseLeave={handleLeave}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {n.mega!.map((m) => (
                        <a
                          key={m.n}
                          href="#atuacao"
                          onClick={() => setMegaOpen(null)}
                          className="group/item flex items-start gap-3 p-3 rounded-[2px] hover:bg-[#f4f1ec] transition-colors"
                        >
                          <span
                            className="flex-shrink-0 w-8 h-8 rounded-[4px] flex items-center justify-center font-mono-tech text-[12px] font-medium"
                            style={{ background: "rgba(0,90,84,0.10)", color: "#005a54" }}
                          >
                            {m.n.replace("BU-", "")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-[15px] text-[#1A1A1A] flex items-center gap-2">
                              {m.t}
                              <span className="text-[12px] text-[#005a54] opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-0.5">→</span>
                            </div>
                            <div className="text-[12px] text-[#6e7b7c] leading-snug mt-0.5">{m.sub}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-2 pt-4 border-t border-[#e8e4db] flex justify-between items-center">
                      <a href="#atuacao" onClick={() => setMegaOpen(null)} className="text-[12px] font-bold text-[#005a54] tracking-wide">
                        Ver todas as frentes →
                      </a>
                      <span className="text-[11px] text-[#6e7b7c]">· Diagnóstico gratuito em 60s</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#005a54]">
            <span className="pulse-dot-light" />
            <span className="label-mono text-[#f4f1ec]">STATUS · OPERANDO</span>
          </div>
          <a href="#cadastro" className="btn-primary btn-primary-sm group">
            Cadastre-se
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span style={{ background: txtColor }} className={`block w-6 h-[2px] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span style={{ background: txtColor }} className={`block w-6 h-[2px] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span style={{ background: txtColor }} className={`block w-6 h-[2px] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgba(255,255,255,0.08)] px-6 py-6 flex flex-col gap-1 bg-[#1F3D2E] animate-fade-in">
          {NAV.map((n) => (
            <div key={n.href}>
              {n.mega ? (
                <>
                  <button
                    onClick={() => setMobileSub(mobileSub === n.label ? null : n.label)}
                    className="w-full flex justify-between items-center text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]"
                  >
                    <span>{n.label}</span>
                    <span className={`transition-transform ${mobileSub === n.label ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {mobileSub === n.label && (
                    <div className="pl-4 pb-2 flex flex-col gap-1">
                      {n.mega.map((m) => (
                        <a key={m.n} href="#atuacao" onClick={() => setOpen(false)} className="flex items-center gap-3 py-2 px-3 text-[13px] text-[#cec9b8] hover:bg-[rgba(255,255,255,0.06)] rounded-md">
                          <span className="font-mono-tech text-[#c48b30] text-[11px]">{m.n.replace("BU-", "")}</span>
                          <span>{m.t}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={n.href} onClick={() => setOpen(false)} className="block text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]">
                  {n.label}
                </a>
              )}
            </div>
          ))}
          <a href="#cadastro" onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
            Cadastre-se →
          </a>
        </div>
      )}
    </header>
  );
}

/* ============= Floating Dashboard Mockup (reutilizável) ============= */
export function FloatingDashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative w-full ${compact ? "min-h-[360px]" : "min-h-[480px]"} flex items-center justify-center`}>
      {/* Card principal */}
      <div className="float-card-1 relative z-10 w-full max-w-[420px] bg-white rounded-[12px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between pb-4 border-b border-[#f4f1ec]">
          <span className="label-mono text-[#6e7b7c]">PAINEL CLUNY</span>
          <span className="pulse-dot" />
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6e7b7c]">Resultado do mês</span>
            <span className="font-mono-tech text-[22px] font-medium text-[#1A1A1A]">R$ 284.500</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6e7b7c]">DRE Gerencial</span>
            <span className="px-2 py-1 rounded-[2px] text-[9px] font-bold tracking-wider" style={{ background: "rgba(0,90,84,0.15)", color: "#005a54" }}>ATUALIZADO</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6e7b7c]">Carga tributária</span>
            <span className="font-mono-tech text-[18px] font-medium text-[#005a54]">−22%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6e7b7c]">Próxima reunião</span>
            <span className="text-[14px] font-medium text-[#1A1A1A]">Qui, 15/05</span>
          </div>
          <div className="h-px bg-[#f4f1ec]" />
          <div className="rounded-[6px] px-3 py-2 text-center" style={{ background: "#1F3D2E" }}>
            <span className="text-[11px] font-bold text-[#f4f1ec] tracking-wide">Operação conduzida pela Cluny</span>
          </div>
        </div>
      </div>

      {/* Card secundário (KPI) */}
      <div className="float-card-2 hidden md:block absolute z-20 right-0 -top-2 lg:-top-4 w-[160px] p-4 rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.18)]" style={{ background: "#1F3D2E" }}>
        <div className="label-mono text-[#6e7b7c]" style={{ fontSize: 9 }}>KPI · MAR</div>
        <div className="font-mono-tech text-[32px] text-[#f4f1ec] leading-none mt-1">98%</div>
        <div className="text-[11px] text-[#6e7b7c] mt-1">retenção</div>
      </div>

      {/* Card terciário (economia) */}
      <div className="float-card-3 hidden md:block absolute z-20 left-0 -bottom-4 w-[180px] p-4 rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.18)]" style={{ background: "#c48b30" }}>
        <div className="label-mono" style={{ fontSize: 9, color: "rgba(26,26,26,0.7)" }}>ECONOMIA 2024</div>
        <div className="font-mono-tech text-[24px] text-[#1A1A1A] leading-none mt-1">R$ 1.2M</div>
        <div className="text-[11px] mt-1" style={{ color: "rgba(26,26,26,0.7)" }}>em tributos</div>
      </div>
    </div>
  );
}

export function Hero() {
  const METRICS = [
    { n: "01", value: 12, fmt: (v: number) => `+${Math.round(v)}`, small: "anos", d: "de mercado consolidado" },
    { n: "02", value: 320, fmt: (v: number) => `${Math.round(v)}`, small: "empresas", d: "atendidas em todo o país" },
    { n: "03", value: 1.2, fmt: (v: number) => `R$ ${v.toFixed(1)}M`, small: "", d: "economizados em tributos em 2024" },
    { n: "04", value: 98, fmt: (v: number) => `${Math.round(v)}%`, small: "", d: "de retenção de clientes" },
  ];
  return (
    <section className="bg-[#f4f1ec] text-[#1A1A1A]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 py-16 lg:py-24 min-h-[calc(100vh-100px)] items-center">
          <div className="flex flex-col justify-center animate-fade-in">
            <span className="label-mono text-[#6e7b7c] border border-[#6e7b7c] px-2 py-1 self-start mb-8">
              [ CLUNY GESTÃO EMPRESARIAL · V.2026 ]
            </span>
            <h1 className="font-display font-semibold text-[40px] sm:text-[56px] lg:text-[72px] leading-[1] text-[#1A1A1A]">
              Gestão técnica<br />
              operada como<br />
              <span className="italic font-normal">sistema.</span>
            </h1>
            <p className="mt-8 text-[16px] max-w-[560px] leading-relaxed" style={{ color: "rgba(26,26,26,0.7)" }}>
              Contabilidade, BPO Financeiro, Controladoria e legalização em uma única operação. Quatro frentes técnicas, um único método de leitura.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#cadastro"
                className="group inline-flex items-center gap-2 px-7 py-[14px] rounded-[2px] text-[13px] font-bold tracking-wide transition-all"
                style={{ background: "#005a54", color: "#f4f1ec", border: "2px solid #005a54" }}
              >
                Cadastre-se
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[2px] text-[13px] font-bold tracking-wide transition-all hover:bg-[#005a54] hover:text-[#f4f1ec]"
                style={{ background: "transparent", color: "#005a54", border: "2px solid #005a54" }}
              >
                Diagnóstico em 60s ↓
              </a>
            </div>
            <p className="mt-5 text-[11px] text-[#6e7b7c]">
              · Resposta em até 1 dia útil · Sem SDR · Sem funil de qualificação
            </p>
          </div>
          <div className="relative px-4 lg:px-8">
            <FloatingDashboard />
          </div>
        </div>

        {/* Métricas em linha horizontal */}
        <div className="border-t border-[#e8e4db] grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.n}
              className={`p-6 lg:p-8 ${i < METRICS.length - 1 ? "lg:border-r border-[#e8e4db]" : ""} ${i % 2 === 0 ? "border-r lg:border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} border-[#e8e4db]`}
            >
              <span className="label-mono text-[#6e7b7c]">MÉTRICA · {m.n}</span>
              <div className="font-mono-tech text-[36px] leading-none text-[#1F3D2E] mt-3">
                <CounterMetric value={m.value} format={m.fmt} />
                {m.small && <span className="text-[14px] text-[#6e7b7c] ml-1">{m.small}</span>}
              </div>
              <p className="text-[12px] text-[#1A1A1A]/70 mt-3 leading-snug">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= ATUAÇÃO · 4 MÓDULOS ============= */
const BUS = [
  { n: "BU-01", t: "Finanças", sub: "Gestão financeira sob método", d: "Estruturo o fluxo de caixa, custos e indicadores para que a sua decisão pare de depender da intuição." },
  { n: "BU-02", t: "Contabilidade", sub: "Contabilidade consultiva", d: "Conduzo a contabilidade da sua empresa de forma técnica, fiscal e estratégica — não apenas conformidade, mas inteligência tributária." },
  { n: "BU-03", t: "Legalização", sub: "Constituição e regularização", d: "Abro, regularizo e ajusto a estrutura societária do seu negócio com o rigor que o crescimento exige." },
  { n: "BU-04", t: "Educação Corporativa", sub: "Capacitação técnica aplicada", d: "Formo a equipe interna e os sócios em finanças, gestão e leitura de demonstrativos — para que a empresa cresça com método." },
];

export function Atuacao() {
  return (
    <section id="atuacao" className="py-24 lg:py-32 bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Atuação <span className="italic text-[#6e7b7c] text-[28px]">/ 4 módulos</span>
          </h2>
          <span className="label-mono text-[#6e7b7c]">BU-01 → BU-04</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-tech">
          {BUS.map((b, i) => (
            <article key={b.n} className={`p-8 bg-[#f4f1ec] flex flex-col min-h-[340px] ${i < BUS.length - 1 ? "border-b md:border-b-0 md:border-r border-[rgba(26,26,26,0.1)] lg:border-b-0" : ""}`}>
              <span className="label-mono text-[#005a54] mb-6">{b.n}</span>
              <h3 className="font-display text-[24px] text-[#1F3D2E]">{b.t}</h3>
              <p className="font-display italic text-[#6e7b7c] mt-1 text-[14px]">{b.sub}</p>
              <p className="text-[14px] text-[#1A1A1A]/80 mt-5 leading-relaxed flex-1">{b.d}</p>
              <div className="mt-6 pt-4 border-t border-[rgba(26,26,26,0.1)] label-mono text-[#005a54]">3 ENTREGÁVEIS · VER →</div>
            </article>
          ))}
        </div>

        {/* BLOCO A — Pills de entregáveis */}
        <div className="mt-16 rounded-[8px] px-8 py-10 lg:px-12 lg:py-12" style={{ background: "#1F3D2E" }}>
          <h3 className="font-display font-semibold text-[24px] lg:text-[28px] text-[#f4f1ec] text-center">
            O que eu entrego em cada operação.
          </h3>
          <p className="mt-3 text-[15px] text-center max-w-[640px] mx-auto" style={{ color: "rgba(244,241,236,0.7)" }}>
            Entregáveis técnicos das quatro frentes — sem pacotes genéricos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "DRE Gerencial Mensal","Painel de KPIs","Plano Orçamentário",
              "Fluxo de Caixa Projetado","Apuração Fiscal Completa","Planejamento Tributário",
              "Suporte Direto ao Sócio","Abertura de Empresa","Alterações Contratuais",
              "Registro de Marca","Mentorias para Sócios","Trilhas de Educação Financeira",
            ].map((p) => (
              <span
                key={p}
                className="px-5 py-2 text-[13px] font-medium text-[#f4f1ec] rounded-full transition-all duration-150 cursor-default hover:bg-[#005a54] hover:border-[#005a54]"
                style={{ border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* BLOCO B — Métricas em 3 colunas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {[
            { v: 12, fmt: (n: number) => `+${Math.round(n)}`, small: "anos", d: "de mercado consolidado" },
            { v: 320, fmt: (n: number) => `${Math.round(n)}`, small: "empresas", d: "atendidas em todo o país" },
            { v: 98, fmt: (n: number) => `${Math.round(n)}%`, small: "", d: "de retenção de clientes" },
          ].map((m, i) => (
            <div key={i} className={`py-12 px-6 text-center ${i < 2 ? "md:border-r border-[#e8e4db]" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-[#e8e4db]`}>
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-mono-tech text-[48px] text-[#005a54] leading-none">
                  <CounterMetric value={m.v} format={m.fmt} />
                </span>
                {m.small && <span className="text-[14px] font-bold text-[#005a54] tracking-wide">{m.small}</span>}
              </div>
              <p className="text-[15px] text-[#1A1A1A] max-w-[200px] mx-auto mt-3 leading-snug">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= COMO FUNCIONA / FEATURES ALTERNADAS ============= */
const FEATURES = [
  {
    badge: "BU-01 · FINANÇAS",
    title: <>Pare de decidir <em className="italic font-normal">por intuição.</em></>,
    sub: "Estruturo o fluxo de caixa, custos e indicadores até que cada decisão sua passe a depender do que você lê — não do que você sente.",
    bullets: ["DRE gerencial mensal comentado", "Painel de KPIs sob medida", "Plano orçamentário revisado trimestralmente"],
    cta: "Conhecer a frente Finanças →",
    bg: "#f4f1ec",
    mockupKind: "dashboard" as const,
  },
  {
    badge: "BU-02 · CONTABILIDADE",
    title: <>Contabilidade que <em className="italic font-normal">explica.</em></>,
    sub: "Conduzo a apuração mensal, o planejamento tributário e o suporte direto ao sócio. O relatório que entrego precisa ser lido — não apenas arquivado.",
    bullets: ["Apuração federal, estadual e municipal", "Planejamento tributário anual", "Reunião técnica mensal com o sócio"],
    cta: "Conhecer a frente Contabilidade →",
    bg: "#ffffff",
    mockupKind: "sand" as const,
  },
  {
    badge: "BU-03 · LEGALIZAÇÃO",
    title: <>Estrutura societária <em className="italic font-normal">sem improviso.</em></>,
    sub: "Abro, regularizo e ajusto o seu negócio com o rigor que o crescimento exige. Da abertura ao registro de marca.",
    bullets: ["Abertura e alterações contratuais", "Licenças e alvarás", "Registro de marcas no INPI"],
    cta: "Conhecer a frente Legalização →",
    bg: "#f4f1ec",
    mockupKind: "dark" as const,
  },
];

function FeatureMockup({ kind }: { kind: "dashboard" | "sand" | "dark" }) {
  if (kind === "dashboard") {
    return (
      <div className="w-full" style={{ filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.08))" }}>
        <FloatingDashboard compact />
      </div>
    );
  }
  if (kind === "sand") {
    return (
      <div className="w-full max-w-[480px] aspect-[4/3] rounded-[8px] flex items-center justify-center shadow-[0_16px_48px_rgba(0,0,0,0.08)]" style={{ background: "#cec9b8" }}>
        <span className="label-mono text-[#1F3D2E]">Mockup · Contabilidade</span>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[480px] aspect-[4/3] rounded-[8px] flex items-center justify-center shadow-[0_16px_48px_rgba(0,0,0,0.08)]" style={{ background: "#1F3D2E" }}>
      <span className="text-[14px] text-[#f4f1ec]">Mockup · Legalização</span>
    </div>
  );
}

function FeatureBlock({ f, idx }: { f: typeof FEATURES[number]; idx: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const reverse = idx % 2 === 1;
  return (
    <div ref={ref} className="py-20" style={{ background: f.bg }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div
            className="transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : `translateX(${reverse ? 30 : -30}px)`,
            }}
          >
            <span className="label-mono text-[#005a54]">{f.badge}</span>
            <h3 className="font-display font-semibold text-[28px] lg:text-[32px] text-[#1A1A1A] mt-4 leading-tight">
              {f.title}
            </h3>
            <p className="text-[16px] mt-4 leading-relaxed" style={{ color: "rgba(26,26,26,0.8)" }}>{f.sub}</p>
            <ul className="mt-6 space-y-2">
              {f.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] text-[#1A1A1A]">
                  <span className="text-[#005a54] font-bold">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#atuacao" className="inline-block mt-8 text-[14px] font-bold text-[#005a54] tracking-wide hover:translate-x-1 transition-transform">
              {f.cta}
            </a>
          </div>
          <div
            className="flex justify-center transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : `translateX(${reverse ? -30 : 30}px)`,
            }}
          >
            <FeatureMockup kind={f.mockupKind} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-24 pb-8">
        <span className="label-mono text-[#005a54]">· OPERAÇÃO / COMO FUNCIONA</span>
        <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4 max-w-3xl">
          Na prática, <span className="italic text-[#005a54]">é assim.</span>
        </h2>
        <p className="text-[16px] text-[#1A1A1A]/80 mt-6 max-w-2xl leading-relaxed">
          Cada frente opera com método próprio, entregáveis definidos e reuniões técnicas recorrentes. Não há caixa-preta.
        </p>
      </div>
      {FEATURES.map((f, i) => (
        <FeatureBlock key={f.badge} f={f} idx={i} />
      ))}
    </section>
  );
}

const QUESTIONS = [
  { q: "Qual o faturamento anual atual da sua empresa?", opts: ["Até R$ 2M", "Entre R$ 2M e R$ 8M", "Entre R$ 8M e R$ 30M", "Acima de R$ 30M"] },
  { q: "Quantos colaboradores CLT você tem hoje?", opts: ["Até 5 pessoas", "Entre 6 e 20 pessoas", "Entre 21 e 50 pessoas", "Acima de 50 pessoas"] },
  { q: "Você tem DRE gerencial atualizado todo mês?", opts: ["Sim, recebo e leio mensalmente", "Tenho, mas não entendo direito", "Não tenho DRE gerencial", "Não sei o que é DRE gerencial"] },
  { q: "Qual é a sua maior dor operacional hoje?", opts: ["Não sei para onde vai o meu caixa", "Pago muito imposto e não sei se é correto", "Minha empresa não está regularizada", "Meu time não entende de finanças"] },
  { q: "O que você precisa que aconteça nos próximos 90 dias?", opts: ["Organizar o financeiro e ter previsibilidade", "Reduzir carga tributária com segurança", "Abrir, alterar ou fechar estrutura societária", "Capacitar sócios e equipe em gestão"] },
];

const RECOS: Record<string, { t: string; d: string }> = {
  A: { t: "BU-01 Finanças", d: "Você precisa de método financeiro. A frente de Finanças da Cluny estrutura seu fluxo de caixa, DRE e KPIs para que cada decisão sua passe a depender de dado — não de intuição." },
  B: { t: "BU-02 Contabilidade", d: "Você está pagando imposto sem inteligência tributária. A frente de Contabilidade da Cluny conduz apuração, planejamento tributário e suporte direto ao sócio — com leitura técnica, não apenas conformidade." },
  C: { t: "BU-03 Legalização", d: "Sua estrutura societária precisa de atenção. A frente de Legalização da Cluny abre, regulariza e ajusta o seu negócio com o rigor que o crescimento exige." },
  D: { t: "BU-04 Educação", d: "Seu time precisa de método, não de curso genérico. A frente de Educação Corporativa da Cluny forma sócios e equipe para que a empresa cresça com critério." },
  E: { t: "BPO + Controladoria", d: "Sua operação está em estágio de tese. O combo BPO Financeiro + Controladoria da Cluny entrega execução e leitura técnica em uma única operação integrada." },
};

export function Diagnostico() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = answers.length === 5;

  const reco = useMemo(() => {
    if (!done) return RECOS.A;
    const counts = [0, 0, 0, 0];
    answers.forEach((i) => counts[i]++);
    const max = Math.max(...counts);
    const winners = counts.filter((c) => c === max).length;
    if (winners > 1) return RECOS.E;
    const idx = counts.indexOf(max);
    return [RECOS.A, RECOS.B, RECOS.C, RECOS.D][idx];
  }, [answers, done]);

  const score = Math.min(100, 30 + answers.length * 14);

  const select = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (next.length < 5) setTimeout(() => setStep(step + 1), 220);
  };

  const reset = () => { setAnswers([]); setStep(0); };
  const r = 70, c = 2 * Math.PI * r;

  return (
    <section id="diagnostico" className="bg-[#1F3D2E] text-[#f4f1ec] relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -top-10 right-0 font-display italic text-[280px] lg:text-[420px] leading-none opacity-[0.04] pointer-events-none select-none">60s.</div>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 relative">
        <div>
          <span className="label-mono text-[#c48b30]">· DIAGNÓSTICO · 60 SEGUNDOS</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] mt-6 text-[#f4f1ec]">
            Em 5 perguntas,<br /><span className="italic text-[#cec9b8]">eu indico</span><br />o caminho técnico.
          </h2>
          <p className="mt-6 text-[#f4f1ec]/75 max-w-md">Sem cadastro. Sem e-mail. Respondo aqui mesmo qual frente cabe à sua operação — e por quê.</p>
          <div className="mt-10 flex gap-1.5">
            {[0,1,2,3,4].map((i) => (
              <div key={i} className="flex-1 h-1 rounded-sm transition-all duration-500" style={{
                background: i < answers.length ? "#c48b30" : i === step && !done ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)",
              }} />
            ))}
          </div>
          <div className="mt-4 label-mono text-[#cec9b8]">{done ? "DIAGNÓSTICO PRONTO ✓" : `Q.0${step+1} / 5`}</div>
        </div>

        <div className="rounded-[4px] p-8 lg:p-10 min-h-[480px] flex flex-col" style={{ background: "rgba(244,241,236,0.06)", border: "1px solid rgba(244,241,236,0.18)" }}>
          {!done ? (
            <>
              <div className="label-mono text-[#cec9b8] mb-6">Q.0{step+1} / 5</div>
              <h3 className="font-display text-[24px] lg:text-[28px] text-[#f4f1ec] mb-8 leading-snug">{QUESTIONS[step].q}</h3>
              <div className="space-y-3 flex-1">
                {QUESTIONS[step].opts.map((opt, i) => (
                  <button key={i} onClick={() => select(i)}
                    className="w-full grid grid-cols-[32px_1fr_24px] items-center gap-3 p-4 text-left transition-all rounded-[2px]"
                    style={{ border: "1px solid rgba(244,241,236,0.12)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid #c48b30")}
                    onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(244,241,236,0.12)")}
                  >
                    <span className="font-mono-tech text-[#c48b30] text-sm">{String.fromCharCode(65+i)}</span>
                    <span className="text-[14.5px] text-[#f4f1ec]">{opt}</span>
                    <span className="text-[#cec9b8]">→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-8 mb-8 flex-wrap">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r={r} stroke="rgba(244,241,236,0.15)" strokeWidth="6" fill="none" />
                  <circle cx="90" cy="90" r={r} stroke="#c48b30" strokeWidth="6" fill="none"
                    strokeDasharray={c} strokeDashoffset={c - (c * score) / 100}
                    strokeLinecap="round" transform="rotate(-90 90 90)"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                  <text x="90" y="95" textAnchor="middle" fill="#f4f1ec" fontSize="32" fontFamily="JetBrains Mono">{score}</text>
                  <text x="90" y="115" textAnchor="middle" fill="#cec9b8" fontSize="9" fontFamily="JetBrains Mono">MATURIDADE</text>
                </svg>
                <div className="flex-1 min-w-[220px]">
                  <div className="label-mono text-[#c48b30] mb-2">RECOMENDAÇÃO</div>
                  <h3 className="font-display text-[24px] text-[#f4f1ec]">{reco.t}</h3>
                  <p className="text-[14px] text-[#f4f1ec]/80 mt-3 leading-relaxed">{reco.d}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a href="#cadastro" className="btn-primary" style={{ background: "#c48b30" }}>Quero conversar com a Cluny →</a>
                <button onClick={reset} className="label-mono text-[#cec9b8] underline ml-auto">↺ REFAZER</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ETAPAS = [
  { n: "01", t: "Societário", sub: "Contrato e responsabilidades", desc: "Mergulho no contrato social, no quadro de sócios e no mapa de responsabilidades para que a estrutura societária pare de ser obstáculo à decisão.", input: "Contrato social, quadro de sócios", entrega: "Mapa de responsabilidades", dias: "DIA 1-3" },
  { n: "02", t: "Fiscal", sub: "Diagnóstico tributário", desc: "Analiso o regime, as obrigações e os riscos fiscais para devolver um diagnóstico tributário técnico — sem promessa, com leitura.", input: "Regime, obrigações, riscos", entrega: "Diagnóstico tributário", dias: "DIA 3-8" },
  { n: "03", t: "Contábil", sub: "Plano de contas vivo", desc: "Reconstruo o plano de contas para que cada lançamento conte a verdade do negócio — não a do sistema. A contabilidade vira leitura, não obrigação.", input: "Plano de contas atual", entrega: "Plano de contas vivo", dias: "DIA 8-15" },
  { n: "04", t: "Financeiro", sub: "Régua de caixa", desc: "Coloco a operação financeira para rodar com método: a pagar, a receber, conciliação e fluxo projetado — com governança diária.", input: "Extratos, contas a pagar/receber", entrega: "Régua de caixa", dias: "DIA 15-25" },
  { n: "05", t: "Continuidade", sub: "Plano 90/365", desc: "Entrego o painel de KPIs, a leitura técnica e o plano operacional de 90 e 365 dias. Mantenho a régua viva — com revisões trimestrais junto ao sócio.", input: "Indicadores em uso, tese do sócio", entrega: "Painel KPIs + Plano 90/365", dias: "DIA 25-45" },
];

export function Metodo() {
  const [active, setActive] = useState(0);
  const cur = ETAPAS[active];

  return (
    <section id="metodo" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <span className="label-mono text-[#005a54]">· MÉTODO / LEITURA TÉCNICA</span>
            <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
              Como leio<br />uma empresa em<br /><span className="italic text-[#005a54]">6 etapas.</span>
            </h2>
          </div>
          <p className="text-[16px] text-[#1A1A1A]/80 leading-relaxed max-w-md">
            Toda empresa que entra na Cluny passa por 6 camadas de leitura — da estrutura societária ao plano de continuidade. A sequência é a mesma. O que muda é o que ela revela.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-[42px] left-0 right-0 h-[2px] bg-[rgba(26,26,26,0.08)]">
            <div
              className="h-full bg-gradient-to-r from-[#005a54] to-[#c48b30] transition-all duration-700 ease-out"
              style={{ width: `${((active + 1) / ETAPAS.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 relative">
            {ETAPAS.map((et, i) => {
              const reached = i <= active;
              return (
                <button
                  key={et.n}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                >
                  <div
                    className={`relative w-[84px] h-[84px] rounded-full flex items-center justify-center font-mono-tech text-[18px] transition-all duration-500 ${
                      reached
                        ? "bg-[#005a54] text-[#f4f1ec] scale-100 shadow-[0_10px_30px_-10px_rgba(0,90,84,0.6)]"
                        : "bg-[#f4f1ec] text-[#6e7b7c] border border-[rgba(26,26,26,0.12)] scale-95 group-hover:scale-100"
                    } ${i === active ? "ring-4 ring-[#c48b30]/30" : ""}`}
                  >
                    {et.n}
                    {i === active && (
                      <span className="absolute -inset-2 rounded-full border border-[#c48b30] animate-pulse" />
                    )}
                  </div>
                  <div className={`label-mono mt-4 transition-colors ${reached ? "text-[#005a54]" : "text-[#6e7b7c]"}`}>
                    ETAPA · {et.n}
                  </div>
                  <div className={`font-display text-[18px] mt-1 transition-colors ${i === active ? "text-[#1F3D2E]" : "text-[#1A1A1A]/70"}`}>
                    {et.t}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={active}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-0 border-tech overflow-hidden animate-fade-in"
        >
          <div className="lg:col-span-5 bg-[#1F3D2E] text-[#f4f1ec] p-10 lg:p-12 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="label-mono text-[#c48b30]">ETAPA · {cur.n}</span>
                <span className="label-mono text-[#cec9b8]">{cur.dias}</span>
              </div>
              <div className="font-mono-tech text-[88px] lg:text-[120px] leading-none text-[#c48b30]/30">{cur.n}</div>
            </div>
            <div>
              <h3 className="font-display text-[32px] lg:text-[40px] text-[#f4f1ec] leading-tight">{cur.t}</h3>
              <p className="font-display italic text-[#cec9b8] mt-2 text-[16px]">/ {cur.sub}</p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#f4f1ec] p-10 lg:p-12 flex flex-col">
            <p className="text-[18px] lg:text-[20px] text-[#1A1A1A]/85 leading-relaxed font-display">
              {cur.desc}
            </p>
            <div className="mt-10 pt-8 border-t border-[rgba(26,26,26,0.1)] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="label-mono text-[#6e7b7c] mb-2">INPUT</div>
                <div className="text-[14px] text-[#1F3D2E]">{cur.input}</div>
              </div>
              <div>
                <div className="label-mono text-[#005a54] mb-2">ENTREGA →</div>
                <div className="text-[14px] text-[#1F3D2E] font-medium">{cur.entrega}</div>
              </div>
            </div>
            <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="btn-tertiary btn-primary-sm disabled:opacity-30"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setActive(Math.min(ETAPAS.length - 1, active + 1))}
                  disabled={active === ETAPAS.length - 1}
                  className="btn-primary btn-primary-sm disabled:opacity-30"
                >
                  Próxima →
                </button>
              </div>
              <span className="label-mono text-[#6e7b7c]">{active + 1} / {ETAPAS.length}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 flex flex-col md:flex-row md:justify-between gap-3" style={{ background: "rgba(0,90,84,0.06)" }}>
          <span className="label-mono text-[#005a54]">DIAGNÓSTICO COMPLETO · 35 A 45 DIAS</span>
          <span className="label-mono text-[#1F3D2E]">→ ENTREGA FINAL: RELATÓRIO TÉCNICO + PLANO 90/365</span>
        </div>
      </div>
    </section>
  );
}

export function Planos() {
  const PlanCard = ({ dark, tag, camada, price, title, tagline, escopo, items, indicado, nota, cta, interesse }: any) => (
    <div
      className={`group relative p-8 lg:p-10 flex flex-col transition-all duration-500 cursor-pointer rounded-[4px]
        ${dark ? "bg-[#1F3D2E] text-[#f4f1ec]" : "bg-[#ffffff] text-[#1A1A1A]"}
        border border-[rgba(26,26,26,0.1)]
        hover:scale-[1.02] hover:shadow-[0_30px_80px_-30px_rgba(31,61,46,0.4)]
        hover:border-[#c48b30]
      `}
    >
      <div className="absolute inset-0 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: dark
          ? "radial-gradient(circle at 50% 0%, rgba(196,139,48,0.15), transparent 60%)"
          : "radial-gradient(circle at 50% 0%, rgba(0,90,84,0.08), transparent 60%)" }}
      />
      <div className="relative flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <span className="label-mono" style={{ color: dark ? "#c48b30" : "#005a54" }}>{tag}</span>
          <span className="label-mono opacity-70">{camada}</span>
        </div>
        <h3 className="font-display text-[28px] mb-2" style={{ color: dark ? "#f4f1ec" : "#1F3D2E" }}>{title}</h3>
        <p className="font-display italic text-[15px] opacity-80 mb-5">{tagline}</p>
        <p className="text-[14px] opacity-80 mb-6 leading-relaxed">{escopo}</p>
        <div className="mb-6">
          <span className="text-[13px] opacity-70">a partir de </span>
          <span className="font-mono-tech text-[36px] lg:text-[44px]">{price}</span>
          <span className="text-[14px] opacity-70">/mês</span>
        </div>
        <div className="label-mono mb-3" style={{ color: dark ? "#c48b30" : "#005a54" }}>ESCOPO · 07 ITENS</div>
        <div className="space-y-2.5 mb-8">
          {items.map((it: string) => (
            <div key={it} className="flex gap-3 text-[14px]"><span style={{ color: dark ? "#c48b30" : "#005a54" }}>→</span>{it}</div>
          ))}
        </div>
        <div className="text-[12px] opacity-80 pt-4 mb-3 border-t" style={{ borderColor: dark ? "rgba(244,241,236,0.15)" : "rgba(26,26,26,0.1)" }}>
          <div className="label-mono mb-2">INDICADO PARA</div>
          {indicado.map((ix: string) => <div key={ix}>· {ix}</div>)}
        </div>
        <div className="text-[12px] italic opacity-60 mb-6">{nota}</div>
        <button
          onClick={() => requestCadastro(interesse || title)}
          className="btn-primary mt-auto group/btn relative overflow-hidden transition-all duration-300 group-hover:scale-[1.03]"
          style={dark ? { background: "#c48b30", color: "#1F3D2E", borderColor: "#c48b30" } : {}}
        >
          <span className="relative z-10">{cta}</span>
          <span className="relative z-10 transition-transform group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );

  return (
    <section id="planos" className="py-24 lg:py-32 bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <span className="label-mono text-[#005a54]">· SERVIÇOS / ENGAJAMENTO</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Dois serviços.<br /><span className="italic text-[#005a54]">Mesma régua técnica.</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            BPO Financeiro e Controladoria são serviços distintos — operam em camadas diferentes da gestão. Podem ser contratados de forma independente ou combinada, conforme a maturidade da operação.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlanCard
            tag="SERVIÇO 01" camada="CAMADA · EXECUÇÃO"
            price="R$ 4.800"
            title="BPO Financeiro"
            tagline="A operação financeira da sua empresa, conduzida com método."
            escopo="Para empresas que precisam tirar o sócio da operação financeira sem terceirizar o critério."
            items={["Contas a pagar e a receber (rotina diária)","Conciliação bancária e cartões","Emissão de NF e cobrança ativa","Fluxo de caixa diário e projetado 90 dias","Gestor de conta dedicado","Reunião quinzenal de operação (60 min)","Integração com ERP do cliente"]}
            indicado={["Faturamento R$ 2M – 15M","Sem analista financeiro dedicado","Sócio ainda na operação"]}
            nota="Não substitui Controladoria. Foco em execução, não em tese."
            cta="Quero o BPO Financeiro" interesse="BPO Financeiro"
          />
          <PlanCard dark
            tag="SERVIÇO 02" camada="CAMADA · TESE"
            price="R$ 7.200"
            title="Controladoria"
            tagline="A inteligência financeira que orienta a decisão do sócio."
            escopo="Para empresas que já têm operação rodando e precisam de leitura técnica para decidir com tese — não com intuição."
            items={["Painel de KPIs sob medida (gerencial)","DRE gerencial mensal comentado","Análise de margem por linha / cliente / projeto","Orçamento anual com revisão trimestral","Modelagem de cenários (3 horizontes)","Reunião mensal com o sócio (90 min)","Sessão trimestral de tese (3 horas)"]}
            indicado={["Faturamento R$ 8M+","Estrutura financeira já organizada","Sócio buscando tese, não relatório"]}
            nota="Não executa rotina financeira. Pressupõe operação saudável — ou contratação conjunta com BPO."
            cta="Quero a Controladoria" interesse="Controladoria"
          />
        </div>
        <div className="mt-4 px-4 py-3 flex flex-wrap items-center justify-between gap-3 bg-[#f4f1ec] border-t border-[#e8e4db]">
          <span className="label-mono text-[#6e7b7c]">· CONTRATO MÍNIMO · 12 MESES · REVISÃO TRIMESTRAL</span>
          <a href="#calculadora" className="label-mono text-[#005a54] hover:underline">VER QUADRO COMPARATIVO COMPLETO →</a>
        </div>
        <div className="mt-6 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:scale-[1.01] cursor-pointer" style={{ background: "#c48b30", color: "#1F3D2E" }}>
          <div className="label-mono">· COMBO 01+02 · BPO + Controladoria em pacote integrado · 15% de desconto</div>
          <a href="#calculadora" className="btn-primary" style={{ background: "#1F3D2E", color: "#f4f1ec", borderColor: "#1F3D2E" }}>Conhecer o combo →</a>
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="bg-[#1F3D2E] text-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-0 py-24">
        <div className="lg:col-span-5 bg-[#1A1A1A] text-[#f4f1ec] p-10 lg:p-14 min-h-[520px] flex flex-col rounded-l-[4px]">
          <span className="label-mono text-[#6e7b7c]">· SOBRE · / 02</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[40px] leading-[1.1] mt-8 text-[#f4f1ec] flex-1">
            Há 12 anos<br /><span className="italic font-normal text-[#c48b30]">lendo empresas.</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[rgba(255,255,255,0.1)]">
            <div>
              <div className="label-mono text-[#6e7b7c] mb-2">FUNDAÇÃO</div>
              <div className="font-mono-tech text-[20px] text-[#f4f1ec]">2013</div>
            </div>
            <div>
              <div className="label-mono text-[#6e7b7c] mb-2">EQUIPE</div>
              <div className="font-mono-tech text-[20px] text-[#f4f1ec]">34 profissionais</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 p-10 lg:p-14 border border-[rgba(255,255,255,0.06)] rounded-r-[4px]">
          <span className="label-mono text-[#6e7b7c]">· MANIFESTO</span>
          <p className="text-[16px] text-[#f4f1ec]/85 leading-[1.7] mt-6">
            A Cluny nasceu de uma <em className="font-display italic text-[#c48b30]">insatisfação técnica</em>: contadores que entregavam guia de imposto, mas nunca explicavam o que os números diziam. Decidi inverter a ordem.
          </p>
          <p className="text-[16px] text-[#f4f1ec]/85 mt-6 leading-[1.7]">
            Conduzo a contabilidade, as finanças e a estrutura legal de empresas que crescem com método. Atendo sócios que entendem que decisão sem dado é palpite, e que palpite repetido vira prejuízo recorrente.
          </p>
          <p className="text-[16px] text-[#f4f1ec]/85 mt-6 leading-[1.7]">
            Trabalho em primeira pessoa. O que entrego não é serviço prestado — é leitura técnica, plano formal e operação conduzida. Sem rodeios. Sem análise paralisante. Sem promessas que a régua contábil não comporta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-10 border-t border-[rgba(255,255,255,0.1)]">
            {[
              ["01", "Critério", "Decisão técnica antes de comercial."],
              ["02", "Clareza", "Linguagem que o sócio entende."],
              ["03", "Continuidade", "Operação que sobrevive ao mês."],
            ].map(([n, t, d]) => (
              <div key={n} className="p-5 border-r border-b md:border-b-0 border-[rgba(255,255,255,0.1)] last:border-r-0">
                <div className="label-mono text-[#6e7b7c] mb-2">{n}</div>
                <div className="font-display font-semibold text-[16px] text-[#f4f1ec] mb-2">{t}</div>
                <div className="text-[13px] text-[#cec9b8]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <section id="cases" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Cases <span className="italic text-[#6e7b7c] text-[28px]">/ registros operacionais</span>
          </h2>
          <span className="label-mono text-[#6e7b7c]">3 DE 320</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article className="lg:col-span-7 bg-[#005a54] text-[#f4f1ec] p-10 lg:p-14 min-h-[480px] flex flex-col">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="label-mono px-2 py-1" style={{ border: "1px solid #c48b30", color: "#c48b30" }}>· CASE EM DESTAQUE</span>
              <span className="label-mono text-[#cec9b8]">· BPO + CONTROLADORIA · 18 MESES</span>
            </div>
            <h3 className="font-display text-[34px] lg:text-[42px] leading-tight">
              De gestão por intuição a tese técnica em <em className="italic text-[#cec9b8]">seis trimestres.</em>
            </h3>
            <p className="text-[15px] mt-6 opacity-85 max-w-2xl">
              Estúdio de arquitetura, 38 colaboradores. Entrou na Cluny sem DRE gerencial, sem painel de KPIs e com margem oscilando 9 pontos entre meses. Saiu com leitura mensal técnica e tese tributária revista.
            </p>
            <div className="mt-auto grid grid-cols-3 gap-6 pt-10 border-t border-[rgba(244,241,236,0.18)]">
              {[["MARGEM OPERACIONAL","+11pp"],["CARGA TRIBUTÁRIA","-22%"],["CICLO FINANCEIRO","-14d"]].map(([k,v])=>(
                <div key={k}>
                  <div className="label-mono text-[#cec9b8] mb-2">{k}</div>
                  <div className="font-mono-tech text-[24px]">{v}</div>
                </div>
              ))}
            </div>
          </article>
          <div className="lg:col-span-5 grid grid-rows-2 gap-6">
            {[
              { tag: "TECNOLOGIA · LEGALIZAÇÃO", m: "90d", t: "Holding e separação patrimonial em 90 dias", sub: "do diagnóstico ao registro final" },
              { tag: "ENGENHARIA · CONTABILIDADE", m: "R$ 480k", t: "Reestruturação tributária pré-aquisição", sub: "em tributos diferidos legalmente" },
            ].map((c) => (
              <article key={c.t} className="border-tech p-7 lg:p-8 flex flex-col bg-[#f4f1ec]">
                <span className="label-mono text-[#005a54] mb-4">{c.tag}</span>
                <div className="font-mono-tech text-[28px] text-[#005a54] mb-3">{c.m}</div>
                <h4 className="font-display text-[20px] text-[#1F3D2E] mb-2 flex-1">{c.t}</h4>
                <div className="text-[12px] text-[#6e7b7c] pt-3 border-t border-[rgba(26,26,26,0.1)]">{c.sub}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 border-tech overflow-hidden" aria-label="Logos de clientes">
          <div className="marquee-track py-6 whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="inline-flex">
                {["ESTÚDIO ÍMPAR","TAVARES ENG.","KHOURY PART.","NORDA & CIA","VEREDA TECH","MERIDIO LAB"].map((l, i) => (
                  <div key={`${dup}-${i}`} className="font-display text-[14px] text-[#6e7b7c] px-12">{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  ["#001", "A Cluny não entrega planilha. Entrega leitura. Foi a primeira vez que entendi o que de fato acontecia dentro da minha empresa.", "Marina Vasconcelos", "Sócia-fundadora, Estúdio Ímpar"],
  ["#002", "Migrei três contadores em cinco anos antes da Cluny. O critério técnico e o tom direto fizeram a diferença.", "Eduardo Tavares", "CEO, Tavares Engenharia"],
  ["#003", "O que me fideliza não é o serviço — é a forma de pensar. A Cluny pensa como sócia, não como prestadora.", "Helena Khoury", "Diretora, Khoury Participações"],
];

export function Depoimentos() {
  return (
    <section className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Depoimentos <span className="italic text-[#6e7b7c] text-[28px]">/ registros</span>
          </h2>
          <span className="label-mono text-[#6e7b7c]">3 DE 320</span>
        </div>
        <div className="border-t border-[rgba(26,26,26,0.1)]">
          {TESTIMONIALS.map(([n, q, name, role]) => (
            <div key={n} className="grid grid-cols-1 md:grid-cols-[80px_1fr_240px] gap-6 py-8 border-b border-[rgba(26,26,26,0.1)] items-start">
              <div className="font-mono-tech text-[#005a54]">{n}</div>
              <div className="font-display text-[19px] lg:text-[22px] text-[#1F3D2E] leading-snug">"{q}"</div>
              <div className="text-right">
                <div className="text-[14px] text-[#1A1A1A] font-medium">{name}</div>
                <div className="text-[12px] text-[#6e7b7c]">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= COMPARATIVO CLT vs BPO ============= */
export function Calculadora() {
  const [salario, setSalario] = useState(6500);
  const [nivel, setNivel] = useState<"jr" | "pl" | "sr">("pl");

  const niveisAjuste = { jr: 0.7, pl: 1, sr: 1.45 }[nivel];

  const calc = useMemo(() => {
    const salBase = Math.round(salario * niveisAjuste);
    const encargos = Math.round(salBase * 0.72);
    const beneficios = Math.round(800 + salBase * 0.08);
    const estrutura = Math.round(450);
    const rescisaoMes = Math.round(salBase * 0.12);
    const cltTotal = salBase + encargos + beneficios + estrutura + rescisaoMes;

    const bpoTotal = 4800;
    const economia = cltTotal - bpoTotal;
    const economiaPct = Math.round((economia / cltTotal) * 100);
    const economiaAno = economia * 12;

    return { salBase, encargos, beneficios, estrutura, rescisaoMes, cltTotal, bpoTotal, economia, economiaPct, economiaAno };
  }, [salario, niveisAjuste]);

  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  const dores = [
    { t: "Rotatividade", d: "Analista pediu demissão? Você reabsorve a operação até contratar o próximo." },
    { t: "Férias e licenças", d: "30 dias por ano sem cobertura técnica — ou paga dobrado por substituto." },
    { t: "Curva de aprendizado", d: "3 a 6 meses até o profissional dominar a sua operação." },
    { t: "Risco trabalhista", d: "Passivo entra no balanço; processos podem aparecer anos depois." },
  ];

  const beneficiosBpo = [
    { t: "Time multidisciplinar", d: "Analista, controller, contador e tributarista em um único contrato." },
    { t: "Cobertura contínua", d: "12 meses por ano, sem férias, sem licenças, sem rotatividade." },
    { t: "Método consolidado", d: "Régua técnica aplicada do dia 1 — sem curva de aprendizado." },
    { t: "Sem passivo trabalhista", d: "Contrato de prestação de serviços, zero risco trabalhista." },
  ];

  return (
    <section id="calculadora" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <span className="label-mono text-[#005a54]">· CALCULADORA · BETA · 02</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Quanto custa ter Cluny<br />dentro da <span className="italic text-[#005a54]">sua empresa?</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Faixa estimada de honorários conforme porte, regime tributário e escopo. Valor final é técnico — depende da leitura inicial. Use como referência de ordem de grandeza, não como proposta.
          </p>
        </div>

        <div className="border-tech bg-[#f4f1ec] p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between mb-3">
                <span className="label-mono text-[#005a54]">SALÁRIO BASE (CLT)</span>
                <span className="font-mono-tech text-[15px] text-[#1F3D2E]">{fmt(salario)}</span>
              </div>
              <input type="range" min={3500} max={15000} step={250} value={salario} onChange={(e)=>setSalario(+e.target.value)} className="w-full accent-[#005a54]" />
              <div className="flex justify-between mt-1 label-mono text-[#6e7b7c]"><span>R$ 3,5k</span><span>R$ 15k</span></div>
            </div>
            <div>
              <div className="label-mono text-[#005a54] mb-3">NÍVEL DO PROFISSIONAL</div>
              <div className="flex gap-2">
                {[["jr","Júnior"],["pl","Pleno"],["sr","Sênior"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setNivel(k as any)} className="flex-1 py-3 text-[13px] rounded-[2px] transition-all"
                    style={{ background: nivel===k?"#005a54":"transparent", color: nivel===k?"#f4f1ec":"#1A1A1A", border: "1px solid #005a54" }}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-tech">
          <div className="p-8 lg:p-10 bg-[#f4f1ec] border-b lg:border-b-0 lg:border-r border-[rgba(26,26,26,0.1)]">
            <div className="flex items-center justify-between mb-8">
              <span className="label-mono text-[#6e7b7c]">CENÁRIO A</span>
              <span className="label-mono text-[#1A1A1A]/60">CLT INTERNO</span>
            </div>
            <h3 className="font-display text-[28px] text-[#1F3D2E] mb-2">Analista financeiro CLT</h3>
            <p className="text-[14px] text-[#1A1A1A]/70 mb-8">Custo total mensal embarcado.</p>

            <div className="space-y-3 text-[14px] mb-8">
              {[
                ["Salário base", calc.salBase],
                ["Encargos (INSS/FGTS/13º/férias)", calc.encargos],
                ["Benefícios (VR/VT/saúde)", calc.beneficios],
                ["Estrutura (posto, software, equip.)", calc.estrutura],
                ["Provisão de rescisão", calc.rescisaoMes],
              ].map(([k,v]) => (
                <div key={k as string} className="flex justify-between py-2 border-b border-[rgba(26,26,26,0.08)]">
                  <span className="text-[#1A1A1A]/80">{k}</span>
                  <span className="font-mono-tech text-[#1F3D2E]">{fmt(v as number)}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-[rgba(26,26,26,0.04)] rounded-[2px] mb-6">
              <div className="label-mono text-[#6e7b7c] mb-2">CUSTO TOTAL MENSAL</div>
              <div className="font-mono-tech text-[40px] text-[#1F3D2E] leading-none">{fmt(calc.cltTotal)}</div>
              <div className="label-mono text-[#6e7b7c] mt-2">{fmt(calc.cltTotal * 12)} / ANO</div>
            </div>

            <div className="space-y-3">
              <div className="label-mono text-[#1A1A1A]/70 mb-2">DORES E RISCOS</div>
              {dores.map((d) => (
                <div key={d.t} className="flex gap-3 text-[13px]">
                  <span className="text-[#c48b30] font-mono-tech mt-0.5">!</span>
                  <div>
                    <span className="font-medium text-[#1F3D2E]">{d.t}.</span>{" "}
                    <span className="text-[#1A1A1A]/70">{d.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-10 bg-[#1F3D2E] text-[#f4f1ec] relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1.5 bg-[#c48b30] text-[#1F3D2E] label-mono">RECOMENDADO</div>
            <div className="flex items-center justify-between mb-8">
              <span className="label-mono text-[#c48b30]">CENÁRIO B</span>
              <span className="label-mono text-[#cec9b8]">BPO CLUNY</span>
            </div>
            <h3 className="font-display text-[28px] text-[#f4f1ec] mb-2">BPO Financeiro Cluny</h3>
            <p className="text-[14px] text-[#cec9b8] mb-8">Time completo, contrato único, custo previsível.</p>

            <div className="space-y-3 text-[14px] mb-8">
              {[
                ["Time multidisciplinar (analista + controller + contador)", "incluso"],
                ["ERP, automações e dashboards", "incluso"],
                ["Reuniões quinzenais com gestor de conta", "incluso"],
                ["Cobertura 12 meses (sem férias/licenças)", "incluso"],
                ["Provisão de rescisão", "R$ 0"],
              ].map(([k,v]) => (
                <div key={k as string} className="flex justify-between gap-4 py-2 border-b border-[rgba(244,241,236,0.18)]">
                  <span className="text-[#f4f1ec]/85">{k}</span>
                  <span className="font-mono-tech text-[#c48b30] whitespace-nowrap">✓ {v}</span>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-[2px] mb-6" style={{ background: "rgba(196,139,48,0.12)", border: "1px solid rgba(196,139,48,0.3)" }}>
              <div className="label-mono text-[#cec9b8] mb-2">INVESTIMENTO MENSAL</div>
              <div className="font-mono-tech text-[40px] text-[#f4f1ec] leading-none">{fmt(calc.bpoTotal)}</div>
              <div className="label-mono text-[#cec9b8] mt-2">{fmt(calc.bpoTotal * 12)} / ANO · CONTRATO 12 MESES</div>
            </div>

            <div className="space-y-3">
              <div className="label-mono text-[#cec9b8] mb-2">BENEFÍCIOS DIRETOS</div>
              {beneficiosBpo.map((b) => (
                <div key={b.t} className="flex gap-3 text-[13px]">
                  <span className="text-[#c48b30] font-mono-tech mt-0.5">→</span>
                  <div>
                    <span className="font-medium text-[#f4f1ec]">{b.t}.</span>{" "}
                    <span className="text-[#f4f1ec]/75">{b.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center" style={{ background: "linear-gradient(135deg, #c48b30, #b07820)", color: "#1F3D2E" }}>
          <div>
            <span className="label-mono text-[#1F3D2E]/70">· Economia ao terceirizar com Cluny</span>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-3">
              <div className="font-mono-tech text-[56px] lg:text-[80px] leading-none text-[#1F3D2E]">{fmt(calc.economia)}</div>
              <div className="font-display text-[24px] text-[#1F3D2E]/80">/mês · {calc.economiaPct}% menos</div>
            </div>
            <p className="font-display text-[20px] lg:text-[24px] text-[#1F3D2E] mt-4 max-w-2xl leading-snug">
              Em 12 meses, você economiza <strong>{fmt(calc.economiaAno)}</strong> — sem rotatividade, sem passivo trabalhista, com time técnico completo.
            </p>
          </div>
          <button onClick={() => requestCadastro("BPO Financeiro")} className="btn-primary group" style={{ background: "#1F3D2E", color: "#f4f1ec", borderColor: "#1F3D2E" }}>
            QUERO ESTA PROPOSTA
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function Conteudo() {
  const POSTS = [
    { ed: "ED. 042", cat: "TRIBUTÁRIO", min: "7 min", date: "02.MAI.2026", t: "Quando a reforma tributária deixa de ser hipótese e vira régua operacional", img: blogTrib },
    { ed: "ED. 041", cat: "GESTÃO", min: "5 min", date: "24.ABR.2026", t: "DRE gerencial: a diferença entre relatório bonito e leitura útil", img: blogDre },
    { ed: "ED. 040", cat: "SOCIETÁRIO", min: "9 min", date: "17.ABR.2026", t: "Holding patrimonial: três armadilhas comuns na constituição", img: blogHolding },
  ];
  return (
    <section id="conteudo" className="py-24 lg:py-32 bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Diário <span className="italic text-[#6e7b7c] text-[28px]">/ leitura técnica</span>
          </h2>
          <a href="#" className="label-mono text-[#005a54]">VER TODAS AS EDIÇÕES →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p.ed} className="group bg-[#f4f1ec] border-tech flex flex-col overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.015] hover:shadow-[0_30px_60px_-30px_rgba(31,61,46,0.3)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#cec9b8]">
                <img
                  src={p.img}
                  alt={p.t}
                  loading="lazy"
                  width={896}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#1F3D2E]/90 backdrop-blur text-[#f4f1ec] label-mono">
                  {p.ed} · {p.cat}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="label-mono text-[#005a54] mb-4">{p.date} · {p.min}</div>
                <h3 className="font-display text-[22px] text-[#1F3D2E] flex-1 leading-snug">{p.t}</h3>
                <div className="flex justify-between mt-6 pt-4 border-t border-[rgba(26,26,26,0.1)]">
                  <span className="label-mono text-[#6e7b7c]">{p.date}</span>
                  <span className="label-mono text-[#005a54] transition-transform group-hover:translate-x-1">LER →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS: [string, string][] = [
  ["A Cluny atende empresa de qualquer porte?", "Atendo empresas a partir de R$ 2M de faturamento anual. Abaixo disso, o custo do método não se justifica para o cliente — e eu prefiro dizer isso antes de assinar contrato."],
  ["Vocês migram a contabilidade do meu contador atual?", "Sim. Conduzimos o processo de transição com o contador anterior — sem ruptura operacional e sem exposição fiscal durante a migração."],
  ["O que diferencia a Cluny de uma contabilidade tradicional?", "A diferença é a leitura. Contabilidade tradicional entrega obrigação cumprida. A Cluny entrega interpretação técnica do que os números dizem — e o que fazer com isso."],
  ["Há contrato mínimo?", "Sim. O contrato mínimo é de 12 meses, com revisão trimestral de escopo. Não trabalho com contratos mensais — método sério exige horizonte adequado."],
  ["Os sócios falam direto com você ou com um time?", "Com um gestor de conta dedicado e com o sócio responsável pela sua frente. Em decisões estratégicas, o acesso ao sócio é direto — sem camadas de SDR ou account manager intermediário."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#ffffff]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col">
            <span className="label-mono text-[#005a54]">· FAQ / 05</span>
            <h2 className="font-display text-[40px] lg:text-[52px] mt-4 leading-[1.05] text-[#1F3D2E]">
              Perguntas <em className="italic text-[#005a54]">técnicas</em><br />que ouvi neste mês.
            </h2>
            <p className="text-[15px] text-[#1A1A1A]/75 mt-6 max-w-md leading-relaxed">
              Respondidas em primeira pessoa, sem rodeios. Se sua dúvida não estiver aqui, escreva — eu respondo.
            </p>

            <div className="relative mt-10 rounded-[4px] overflow-hidden bg-[#1F3D2E]">
              <img src={faqIllu} alt="" loading="lazy" width={768} height={1024} className="w-full h-[280px] object-cover opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#1F3D2E] via-[#1F3D2E]/40 to-transparent">
                <div className="label-mono text-[#c48b30] mb-2">SUA DÚVIDA NÃO ESTÁ AQUI?</div>
                <a href="#cadastro" className="font-display text-[22px] text-[#f4f1ec] hover:text-[#c48b30] transition-colors">
                  Pergunte diretamente →
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[["12+","ANOS"],["320","CLIENTES"],["98%","RETENÇÃO"]].map(([v,k])=>(
                <div key={k} className="p-4 border-tech bg-[#f4f1ec]">
                  <div className="font-mono-tech text-[20px] text-[#005a54]">{v}</div>
                  <div className="label-mono text-[#6e7b7c] mt-1">{k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-tech bg-[#f4f1ec] divide-y divide-[rgba(26,26,26,0.08)]">
              {FAQS.map(([q, a], i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="group">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={`w-full flex justify-between items-center text-left gap-6 px-6 py-6 transition-colors ${isOpen ? "bg-[rgba(0,90,84,0.04)]" : "hover:bg-[rgba(0,90,84,0.02)]"}`}
                    >
                      <span className="font-display text-[18px] lg:text-[20px] text-[#1F3D2E] flex items-start gap-4">
                        <span className="font-mono-tech text-[#005a54] text-[12px] mt-1.5">0{i+1}</span>
                        <span>{q}</span>
                      </span>
                      <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono-tech text-[18px] transition-all duration-300 ${isOpen ? "bg-[#005a54] text-[#f4f1ec] rotate-45" : "bg-[rgba(0,90,84,0.08)] text-[#005a54]"}`}>
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-[max-height,opacity] duration-500 ease-out"
                      style={{ maxHeight: isOpen ? 360 : 0, opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-[14.5px] text-[#1A1A1A]/80 leading-relaxed px-6 pb-6 pl-[78px]">
                        → {a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cadastro() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interesse, setInteresse] = useState("");
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const det = (e as CustomEvent).detail as { interesse?: string };
      const map: Record<string, string> = {
        "BPO Financeiro": "Finanças / BPO",
        "Controladoria": "Não sei ainda",
        "BPO + Controladoria": "Finanças / BPO",
        "Contabilidade": "Contabilidade",
        "Legalização": "Legalização",
        "Educação Corporativa": "Educação Corporativa",
      };
      const v = det?.interesse ? (map[det.interesse] || det.interesse) : "";
      if (v) setInteresse(v);
    };
    window.addEventListener("cluny:prefill", onPrefill as EventListener);
    return () => window.removeEventListener("cluny:prefill", onPrefill as EventListener);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="cadastro" className="py-24 lg:py-32 bg-[#1F3D2E] text-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <span className="label-mono text-[#6e7b7c]">· CADASTRO / PRÓXIMO PASSO</span>
            <h2 className="font-display font-semibold text-[40px] lg:text-[48px] leading-[1.05] mt-6 text-[#f4f1ec]">
              Inicie pela<br /><em className="italic font-normal text-[#f4f1ec]">conversa certa.</em>
            </h2>
            <p className="text-[15px] text-[#f4f1ec]/80 mt-6 leading-relaxed max-w-md">
              Respondo pessoalmente, por escrito, em até 1 dia útil. Sem funil de qualificação. Sem SDR. Apenas leitura técnica inicial da sua operação.
            </p>

            <div className="mt-10 space-y-3">
              {[
                "Atendimento técnico — não comercial em primeira camada",
                "Diagnóstico inicial sem custo",
                "Confidencialidade contratual antes de qualquer troca",
                "Indicação honesta caso o caso não couber na Cluny",
              ].map((b) => (
                <div key={b} className="flex gap-3 text-[14px] text-[#f4f1ec]">
                  <span className="text-[#c48b30] font-bold">→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-0">
              {[
                ["CONTATO","contato@cluny.com.br"],
                ["TELEFONE","+55 11 4000-0000"],
                ["ENDEREÇO","Av. Faria Lima, 0000 · São Paulo / SP"],
                ["HORÁRIO","Seg-Sex · 09h às 18h"],
              ].map(([k,v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] py-4 border-b border-[rgba(255,255,255,0.1)] last:border-b-0">
                  <span className="label-mono text-[#6e7b7c]">{k}</span>
                  <span className="text-[14px] text-[#f4f1ec]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-[4px] p-8 lg:p-10 border border-[rgba(255,255,255,0.06)]">
            {sent ? (
              <div className="h-full flex flex-col justify-center items-start gap-4 min-h-[400px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#f4f1ec] bg-[#005a54]">✓</div>
                <h3 className="font-display text-[32px] text-[#f4f1ec]">Mensagem registrada.</h3>
                <p className="text-[15px] text-[#f4f1ec]/80 max-w-md">Recebi sua solicitação. Respondo pessoalmente em até 1 dia útil, por escrito.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                {[
                  { n: "nome", l: "Nome completo" },
                  { n: "email", l: "E-mail corporativo", t: "email" },
                  { n: "empresa", l: "Empresa" },
                  { n: "tel", l: "Telefone" },
                ].map((f) => (
                  <div key={f.n}>
                    <label htmlFor={f.n} className="label-mono text-[#6e7b7c] block mb-2">{f.l}</label>
                    <input id={f.n} required aria-required="true" type={f.t || "text"} name={f.n} placeholder={f.l} className="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] py-2 outline-none focus:border-[#c48b30] text-[15px] text-[#f4f1ec] placeholder:text-[#6e7b7c] transition-colors" />
                  </div>
                ))}
                <div>
                  <label htmlFor="interesse" className="label-mono text-[#6e7b7c] block mb-2">Interesse principal</label>
                  <select
                    id="interesse"
                    ref={selectRef}
                    required
                    aria-required="true"
                    value={interesse}
                    onChange={(e) => setInteresse(e.target.value)}
                    className="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] py-2 outline-none focus:border-[#c48b30] text-[15px] text-[#f4f1ec]"
                  >
                    <option value="" className="bg-[#1A1A1A]">Selecione...</option>
                    <option className="bg-[#1A1A1A]">Finanças / BPO</option>
                    <option className="bg-[#1A1A1A]">Contabilidade</option>
                    <option className="bg-[#1A1A1A]">Legalização</option>
                    <option className="bg-[#1A1A1A]">Educação Corporativa</option>
                    <option className="bg-[#1A1A1A]">Não sei ainda</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ height: 52 }}
                >
                  {loading ? (
                    <>
                      <span>Enviando...</span>
                      <span className="ml-2 inline-block w-4 h-4 border-2 border-[#f4f1ec] border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>Quero conversar com a Cluny →</>
                  )}
                </button>
                <p className="text-[11px] text-[#6e7b7c] flex items-center gap-2">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6e7b7c" strokeWidth="2" aria-hidden="true">
                    <rect x="4" y="11" width="16" height="10" rx="1" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  Resposta em até 1 dia útil. Seus dados não são compartilhados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const COLS = [
    { t: "ATUAÇÃO", l: [["Finanças","#atuacao"],["Contabilidade","#atuacao"],["Legalização","#atuacao"],["Educação","#atuacao"]] },
    { t: "PLANOS", l: [["Contabilidade Consultiva","#planos"],["BPO + Controladoria","#planos"],["Quadro comparativo","#calculadora"]] },
    { t: "CONTATO", l: [["contato@cluny.com.br","mailto:contato@cluny.com.br"],["+55 11 4000-0000","#cadastro"],["São Paulo / SP","#cadastro"]] },
  ];
  return (
    <footer className="bg-[#1A1A1A] text-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(255,255,255,0.06)]">
          <div className="md:col-span-4">
            <Logo size={26} color="#f4f1ec" />
            <p className="text-[13px] text-[#6e7b7c] mt-5 leading-relaxed max-w-xs">
              Cluny Gestão Empresarial. Contabilidade, finanças, legalização e educação corporativa — desde 2013.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="label-mono text-[#6e7b7c]">STATUS · OPERANDO</span>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.t} className="md:col-span-2">
              <div className="label-mono text-[#6e7b7c] mb-4">{c.t}</div>
              <ul className="space-y-2.5">
                {c.l.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[13px] text-[#cec9b8] hover:text-[#f4f1ec] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <span className="font-mono-tech text-[10px] text-[#6e7b7c] uppercase tracking-[0.1em]">© 2026 CLUNY GESTÃO EMPRESARIAL · CNPJ 36.440.582/0001-74</span>
          <span className="font-mono-tech text-[10px] text-[#6e7b7c] uppercase tracking-[0.1em]">v.2026.05 · SÃO PAULO / SP</span>
        </div>
      </div>
    </footer>
  );
}

/* ============ Sticky CTA Bar (desktop) ============ */
export function StickyBar() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("cluny:sticky-closed") === "1") setClosed(true);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? window.scrollY / h : 0;
      const cad = document.getElementById("cadastro");
      const cadVisible = cad ? cad.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(pct > 0.6 && !cadVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed || !show) return null;
  return (
    <div
      className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 bg-[#1F3D2E] border-t border-[rgba(255,255,255,0.08)] items-center justify-between gap-4 px-6 lg:px-10"
      style={{ height: 56, animation: "fade-in 0.3s ease-out" }}
      role="region"
      aria-label="Chamada para cadastro"
    >
      <span className="text-[14px] text-[#f4f1ec]">Pronto para organizar sua operação?</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => requestCadastro("")}
          className="text-[13px] font-bold text-[#f4f1ec]"
          style={{ background: "#005a54", padding: "10px 20px", borderRadius: 2 }}
        >
          Cadastre-se →
        </button>
        <button
          onClick={() => { setClosed(true); sessionStorage.setItem("cluny:sticky-closed", "1"); }}
          aria-label="Fechar barra"
          className="text-[#cec9b8] hover:text-[#f4f1ec] text-[20px] leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
