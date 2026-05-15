import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/cluny/Logo";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  PlayCircle, Table as TableIcon, BookOpen, CheckCircle2, AlertTriangle, Construction,
  Instagram, Linkedin, Youtube, Mail, Phone, MapPin, X as XIcon,
  Search as SearchIcon, Settings2, Gauge, TrendingUp,
} from "lucide-react";

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

type DropdownItem = { t: string; sub: string; to?: string; href?: string; icon: React.ReactNode };
type NavItem = {
  label: string;
  href?: string;     // hash (cross-route via Link to="/" hash=...)
  to?: string;       // route path
  dropdown?: DropdownItem[];
  footer?: { label: string; to?: string; href?: string; hash?: string };
};

const IconStroke = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#c48b30" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props} />
);

const NAV_ATUACAO: DropdownItem[] = [
  { t: "Finanças", sub: "Gestão financeira sob método", to: "/planos/bpo",
    icon: (<IconStroke><path d="M3 17l5-5 4 4 8-8" /><path d="M14 8h6v6" /></IconStroke>) },
  { t: "Contabilidade", sub: "Contabilidade consultiva", to: "/planos/contabilidade",
    icon: (<IconStroke><path d="M7 3h8l4 4v14H7z" /><path d="M14 3v5h5" /><path d="M10 12h6M10 16h6" /></IconStroke>) },
  { t: "Legalização", sub: "Constituição e regularização", href: "atuacao",
    icon: (<IconStroke><path d="M4 21h16" /><path d="M5 21V9l7-5 7 5v12" /><path d="M10 21v-6h4v6" /></IconStroke>) },
  { t: "Educação Corporativa", sub: "Capacitação técnica aplicada", href: "atuacao",
    icon: (<IconStroke><circle cx="12" cy="8" r="3" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></IconStroke>) },
];

const NAV_PLANOS: DropdownItem[] = [
  { t: "BPO Financeiro", sub: "Execução financeira sob método", to: "/planos/bpo",
    icon: (<IconStroke><path d="M4 7h12l4 4-4 4H4z" /><path d="M4 13h12" /></IconStroke>) },
  { t: "Controladoria", sub: "Inteligência financeira para decisão", to: "/planos/controladoria",
    icon: (<IconStroke><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-7" /></IconStroke>) },
  { t: "Contabilidade", sub: "Apuração e planejamento tributário", to: "/planos/contabilidade",
    icon: (<IconStroke><path d="M6 4h12v16H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></IconStroke>) },
];

const NAV_MATERIAIS: DropdownItem[] = [
  { t: "Aulas Financeiras", sub: "Conteúdo técnico em vídeo", href: "blog",
    icon: (<IconStroke><polygon points="10,8 16,12 10,16" fill="#c48b30" /><rect x="3" y="5" width="18" height="14" rx="2" /></IconStroke>) },
  { t: "Ferramentas", sub: "Planilhas e modelos prontos", href: "blog",
    icon: (<IconStroke><path d="M14 4l-2 2 6 6 2-2-6-6z" /><path d="M6 22l8-8" /><path d="M18 10l4 4-4 4-4-4" /></IconStroke>) },
  { t: "E-Book", sub: "Guias técnicos para download", href: "blog",
    icon: (<IconStroke><path d="M5 4h11a3 3 0 0 1 3 3v14H8a3 3 0 0 1-3-3V4z" /><path d="M5 18a3 3 0 0 1 3-3h11" /></IconStroke>) },
];

const NAV: NavItem[] = [
  { label: "Atuação", dropdown: NAV_ATUACAO, footer: { label: "Ver diagnóstico gratuito →", hash: "diagnostico" } },
  { label: "Método", href: "metodo" },
  { label: "Diagnóstico", href: "diagnostico" },
  { label: "Planos", to: "/planos", dropdown: NAV_PLANOS, footer: { label: "Calcular honorários →", to: "/planos/bpo", hash: "calculadora" } },
  { label: "Blog", href: "blog" },
  { label: "Materiais", dropdown: NAV_MATERIAIS },
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
      const ids = NAV.filter((n) => n.href).map((n) => n.href!);
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
  const logoVariant: "preto" | "branco" = onLight ? "preto" : "branco";

  const handleEnter = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setMegaOpen(label), 150);
  };
  const handleLeave = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(null), 100);
  };

  const renderTrigger = (n: NavItem, isActive: boolean, hasDropdown: boolean) => {
    const cls = `relative inline-flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium transition-all duration-200 border-b-2 ${
      isActive ? "border-[#c48b30] opacity-100" : `border-transparent ${inactiveOpacity} hover:opacity-100`
    }`;
    const inner = (
      <>
        {n.label}
        {hasDropdown && <span className="text-[9px] opacity-60">▾</span>}
      </>
    );
    if (n.to) return <Link to={n.to} style={{ color: txtColor }} className={cls}>{inner}</Link>;
    if (n.href) return <Link to="/" hash={n.href} style={{ color: txtColor }} className={cls}>{inner}</Link>;
    return <span style={{ color: txtColor }} className={cls + " cursor-default"}>{inner}</span>;
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
            CLUNY GESTÃO EMPRESARIAL · CRC-SP 2SP-000000 · OPERANDO DESDE 2013
          </span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-6">
        <Link
          to="/"
          aria-label="Cluny — página inicial"
          className="flex items-center group transition-opacity duration-200 hover:opacity-80"
        >
          <Logo variant={logoVariant} height={28} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const isActive = !!n.href && active === n.href;
            const hasDropdown = !!n.dropdown;
            return (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={hasDropdown ? () => handleEnter(n.label) : undefined}
                onMouseLeave={hasDropdown ? handleLeave : undefined}
              >
                {renderTrigger(n, isActive, hasDropdown)}

                {hasDropdown && megaOpen === n.label && n.dropdown && (
                  <div
                    className="mega-in absolute left-0 top-full mt-0 z-50 bg-white rounded-[4px] p-6 min-w-[340px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)", borderTop: "3px solid #c48b30" }}
                    onMouseEnter={() => { if (closeTimer.current) window.clearTimeout(closeTimer.current); }}
                    onMouseLeave={handleLeave}
                  >
                    <div className="flex flex-col gap-1">
                      {n.dropdown.map((m) => {
                        const inner = (
                          <>
                            <span className="flex-shrink-0 w-8 h-8 rounded-[4px] flex items-center justify-center" style={{ background: "rgba(196,139,48,0.10)" }}>
                              {m.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="font-display font-semibold text-[15px] text-[#1A1A1A] flex items-center gap-2">
                                {m.t}
                                <span className="text-[12px] text-[#c48b30] opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-[3px]">→</span>
                              </div>
                              <div className="text-[12px] text-[#6e7b7c] leading-snug mt-0.5">{m.sub}</div>
                            </div>
                          </>
                        );
                        const cls = "group/item flex items-start gap-3 p-3 rounded-[2px] hover:bg-[#f4f1ec] transition-colors";
                        if (m.to) return <Link key={m.t} to={m.to} onClick={() => setMegaOpen(null)} className={cls}>{inner}</Link>;
                        if (m.href) return <Link key={m.t} to="/" hash={m.href} onClick={() => setMegaOpen(null)} className={cls}>{inner}</Link>;
                        return <a key={m.t} href="#" onClick={(e) => { e.preventDefault(); setMegaOpen(null); }} className={cls}>{inner}</a>;
                      })}
                    </div>
                    {n.footer && (
                      <div className="mt-2 pt-4 border-t border-[#e8e4db]">
                        {n.footer.to ? (
                          <Link to={n.footer.to} hash={n.footer.hash} onClick={() => setMegaOpen(null)} className="text-[12px] font-bold text-[#005a54] tracking-wide">{n.footer.label}</Link>
                        ) : (
                          <Link to="/" hash={n.footer.hash} onClick={() => setMegaOpen(null)} className="text-[12px] font-bold text-[#005a54] tracking-wide">{n.footer.label}</Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
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
          {NAV.map((n) => {
            const hasDropdown = !!n.dropdown;
            if (hasDropdown) {
              return (
                <div key={n.label}>
                  <button
                    onClick={() => setMobileSub(mobileSub === n.label ? null : n.label)}
                    className="w-full flex justify-between items-center text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]"
                  >
                    <span>{n.label}</span>
                    <span className={`transition-transform ${mobileSub === n.label ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {mobileSub === n.label && (
                    <div className="pl-4 pb-2 flex flex-col gap-1">
                      {n.dropdown!.map((m) => {
                        const cls = "block py-2 px-3 text-[13px] text-[#cec9b8] hover:bg-[rgba(255,255,255,0.06)] rounded-md";
                        if (m.to) return <Link key={m.t} to={m.to} onClick={() => setOpen(false)} className={cls}>{m.t}</Link>;
                        if (m.href) return <Link key={m.t} to="/" hash={m.href} onClick={() => setOpen(false)} className={cls}>{m.t}</Link>;
                        return <a key={m.t} href="#" onClick={() => setOpen(false)} className={cls}>{m.t}</a>;
                      })}
                    </div>
                  )}
                </div>
              );
            }
            if (n.to) return (
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="block text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]">
                {n.label}
              </Link>
            );
            return (
              <Link key={n.label} to="/" hash={n.href!} onClick={() => setOpen(false)} className="block text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]">
                {n.label}
              </Link>
            );
          })}
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

/* ============ Hero Card único — Painel Cluny ============ */
function HeroCard() {
  return (
    <div
      className="float-card-1 w-full max-w-[420px] mx-auto bg-white rounded-[12px] p-7"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)", minHeight: 320 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="pulse-dot" />
        <span className="label-mono text-[#6e7b7c]">PAINEL CLUNY · AO VIVO</span>
      </div>
      <div className="h-px bg-[#f4f1ec] my-3" />

      {/* Linhas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#6e7b7c]">Resultado do mês</span>
          <span className="font-mono-tech text-[20px] font-medium text-[#1A1A1A]">R$ 284.500</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#6e7b7c]">DRE Gerencial</span>
          <span className="px-2 py-0.5 rounded-[2px] text-[9px] font-bold tracking-wider"
            style={{ background: "rgba(0,90,84,0.12)", color: "#005a54" }}>ATUALIZADO</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#6e7b7c]">Carga tributária</span>
          <span className="font-mono-tech text-[18px] font-medium text-[#005a54]">−22%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#6e7b7c]">Margem operacional</span>
          <span className="font-mono-tech text-[18px] font-medium text-[#005a54]">+11pp</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#6e7b7c]">Próxima reunião técnica</span>
          <span className="text-[13px] font-medium text-[#1A1A1A]">Qui, 15/05 · 14h</span>
        </div>
      </div>

      <div className="h-px bg-[#f4f1ec] my-4" />

      {/* Diagnóstico progress */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-[#1A1A1A]">Diagnóstico técnico</span>
          <span className="text-[11px] text-[#6e7b7c]">Fase 02 / 03</span>
        </div>
        <div className="text-[11px] text-[#6e7b7c] mb-2">Plano de execução</div>
        <div className="h-1 w-full rounded-[2px] bg-[#f4f1ec] overflow-hidden">
          <div className="h-full rounded-[2px]" style={{ width: "65%", background: "#005a54" }} />
        </div>
      </div>

      {/* Badge inferior */}
      <div className="mt-5 rounded-[6px] px-4 py-3" style={{ background: "#1F3D2E" }}>
        <div className="text-[12px] font-bold text-[#f4f1ec] tracking-wide">Operação conduzida pela Cluny</div>
        <div className="text-[10px] text-[#6e7b7c] mt-0.5">Desde 2013 · 320 empresas</div>
      </div>
    </div>
  );
}

/* ================================================================
   ============== HERO (REESCRITO — V.2026.05) ===================
   ================================================================ */
/* ============= HERO CARROSSEL ============= */
type HeroSlide = {
  id: string;
  bg: string;
  eyebrow: string;
  eyebrowColor: string;
  title: React.ReactNode;
  subtitle: string;
  cta: { label: string; href: string; bg: string; color: string };
  visual: React.ReactNode;
};

function FloatBars() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none" aria-hidden>
      {[20, 38, 30, 56, 72, 92, 108].map((h, i) => (
        <rect
          key={i}
          x={10 + i * 28}
          y={130 - h}
          width="18"
          height={h}
          rx="2"
          stroke="#9bc4bf"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      <path
        d="M19 110 L47 92 L75 100 L103 74 L131 58 L159 38 L187 22"
        stroke="#c48b30"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FloatGauge({ pct, label, color }: { pct: number; label: string; color: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="86" height="86" viewBox="0 0 86 86">
        <circle cx="43" cy="43" r={r} stroke="rgba(244,241,236,0.15)" strokeWidth="6" fill="none" />
        <circle
          cx="43" cy="43" r={r} stroke={color} strokeWidth="6" fill="none"
          strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100}
          strokeLinecap="round" transform="rotate(-90 43 43)"
        />
        <text x="43" y="48" textAnchor="middle"
          style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 14, fontWeight: 700, fill: "#f4f1ec" }}>
          {pct}%
        </text>
      </svg>
      <span style={{ fontFamily: "Inter", fontSize: 10, color: "rgba(244,241,236,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "financeiro",
    bg: "#1F3D2E",
    eyebrow: "BPO Financeiro",
    eyebrowColor: "#c48b30",
    title: (
      <>
        Sua empresa cresce.<br />
        <span className="italic font-normal" style={{ color: "#c48b30" }}>Suas finanças acompanham?</span>
      </>
    ),
    subtitle: "Estruturamos BPO Financeiro e Controladoria para PMEs que faturam entre R$ 2M e R$ 30M — sem abrir mão do controle.",
    cta: { label: "Agendar diagnóstico gratuito", href: "#diagnostico", bg: "#f4f1ec", color: "#1F3D2E" },
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="float-card-1 absolute" style={{ top: "8%", left: "6%" }}>
          <FloatBars />
        </div>
        <div className="float-card-2 absolute hidden md:block" style={{ top: "14%", right: "4%", background: "rgba(244,241,236,0.06)", border: "1px solid rgba(196,139,48,0.4)", borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(6px)" }}>
          <div style={{ fontFamily: "Inter", fontSize: 9, color: "rgba(244,241,236,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Receita líquida</div>
          <div style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 22, fontWeight: 700, color: "#c48b30", marginTop: 2 }}>R$ 1.284.500</div>
          <div style={{ fontFamily: "Inter", fontSize: 10, color: "#9bc4bf", marginTop: 2 }}>↗ +12,4% MoM</div>
        </div>
        <div className="float-card-3 absolute hidden md:block" style={{ bottom: "12%", left: "10%", background: "rgba(244,241,236,0.06)", border: "1px solid rgba(155,196,191,0.4)", borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(6px)" }}>
          <div style={{ fontFamily: "Inter", fontSize: 9, color: "rgba(244,241,236,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>EBITDA</div>
          <div style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 18, fontWeight: 700, color: "#f4f1ec", marginTop: 2 }}>R$ 312K · 24,3%</div>
        </div>
        <div className="float-card-1 absolute hidden lg:flex items-center gap-2" style={{ bottom: "22%", right: "8%", background: "#005a54", borderRadius: 999, padding: "8px 14px" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "#c48b30" }} />
          <span style={{ fontFamily: "Inter", fontSize: 11, color: "#f4f1ec", fontWeight: 600 }}>DRE fechado em D+5</span>
        </div>
      </div>
    ),
  },
  {
    id: "controladoria",
    bg: "#1A1A1A",
    eyebrow: "Controladoria Cluny",
    eyebrowColor: "#c48b30",
    title: (
      <>
        Você sabe para onde<br />
        seu dinheiro está indo —<br />
        <span className="italic font-normal" style={{ color: "#c48b30" }}>agora.</span>
      </>
    ),
    subtitle: "Controladoria que transforma dados brutos em decisões estratégicas. Em tempo real, com clareza.",
    cta: { label: "Conhecer a Controladoria Cluny", href: "/planos/controladoria", bg: "#005a54", color: "#f4f1ec" },
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="float-card-1 grid grid-cols-3 gap-4" style={{ background: "rgba(244,241,236,0.04)", border: "1px solid rgba(244,241,236,0.12)", borderRadius: 16, padding: 24, backdropFilter: "blur(8px)" }}>
          <FloatGauge pct={28} label="Margem" color="#005a54" />
          <FloatGauge pct={64} label="EBITDA" color="#c48b30" />
          <FloatGauge pct={82} label="Liquidez" color="#9bc4bf" />
        </div>
        <div className="float-card-2 absolute hidden md:block" style={{ top: "8%", right: "0%", background: "rgba(0,90,84,0.18)", border: "1px solid rgba(0,90,84,0.6)", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontFamily: "Inter", fontSize: 9, color: "rgba(244,241,236,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tendência 12m</div>
          <div style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 18, fontWeight: 700, color: "#005a54", marginTop: 2 }}>+34,7%</div>
        </div>
        <div className="float-card-3 absolute hidden md:block" style={{ bottom: "8%", left: "-2%", background: "rgba(196,139,48,0.12)", border: "1px solid rgba(196,139,48,0.5)", borderRadius: 10, padding: "10px 14px" }}>
          <div style={{ fontFamily: "Inter", fontSize: 9, color: "rgba(244,241,236,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Custos fixos</div>
          <div style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 18, fontWeight: 700, color: "#c48b30", marginTop: 2 }}>R$ 184.200</div>
        </div>
      </div>
    ),
  },
  {
    id: "video",
    bg: "#005a54",
    eyebrow: "Vídeo · 3 minutos",
    eyebrowColor: "#c48b30",
    title: (
      <>
        O que nenhum contador<br />
        <span className="italic font-normal" style={{ color: "#c48b30" }}>vai te dizer.</span>
      </>
    ),
    subtitle: "3 minutos que mudam a forma como você vê suas finanças.",
    cta: { label: "Quero a Cluny no meu negócio", href: "#diagnostico", bg: "#f4f1ec", color: "#005a54" },
    visual: <HeroVideo />,
  },
];

function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full max-w-[520px] mx-auto" style={{ aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.45)", border: "1px solid rgba(244,241,236,0.18)" }}>
      {playing ? (
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="Cluny — gestão financeira"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label="Reproduzir vídeo"
          className="absolute inset-0 group"
          style={{ background: "linear-gradient(135deg, rgba(31,61,46,0.6), rgba(0,0,0,0.4))", cursor: "pointer", border: 0 }}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center transition-transform group-hover:scale-110" style={{ width: 84, height: 84, borderRadius: 999, background: "#c48b30", boxShadow: "0 12px 36px rgba(0,0,0,0.4)" }}>
              <PlayCircle size={44} color="#1F3D2E" strokeWidth={1.5} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#1F3D2E] selection:bg-[#c48b30] selection:text-[#1F3D2E]"
      aria-label="Cluny — BPO Financeiro e Controladoria"
    >
      {/* glow ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 85% 15%, rgba(196,139,48,0.10), transparent 60%), radial-gradient(700px 500px at 5% 95%, rgba(244,241,236,0.05), transparent 60%)",
        }}
      />

      <div className="relative max-w-[1320px] w-full mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Eyebrow / metadata */}
        <div className="mb-10 lg:mb-14 flex items-center gap-4 text-[#f4f1ec]/40 font-mono-tech text-[10px] tracking-[0.2em] uppercase">
          <span className="text-[#c48b30]">BPO Financeiro</span>
          <span aria-hidden className="h-px w-12 bg-[#c48b30]/30" />
          <span className="hidden sm:inline">Estratégia & Crescimento</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          {/* Tipografia massiva — esquerda */}
          <div className="lg:col-span-7 z-10 relative">
            <h1 className="flex flex-col">
              <span className="font-display text-[#f4f1ec] text-[56px] sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.85] tracking-tight font-semibold">
                Sua empresa
              </span>
              <div className="flex items-end gap-6 mt-2">
                <span className="font-display text-[#f4f1ec] text-[56px] sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.85] tracking-tight font-semibold">
                  cresce.
                </span>
                <div className="hidden md:block max-w-[200px] border-l border-[#c48b30] pl-4 pb-3">
                  <p className="font-sans text-[#f4f1ec]/60 text-xs leading-relaxed uppercase tracking-wider">
                    Controladoria para PMEs que faturam até R$ 30M
                  </p>
                </div>
              </div>
              <span className="font-display italic font-light text-[#c48b30] text-[32px] sm:text-5xl md:text-6xl lg:text-7xl leading-tight mt-8 lg:mt-10">
                Suas finanças acompanham?
              </span>
            </h1>

            <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10">
              <a
                href="#diagnostico"
                className="group bg-[#f4f1ec] hover:bg-[#c48b30] transition-colors duration-500 px-8 lg:px-10 py-4 lg:py-5 rounded-full inline-flex items-center gap-3 text-[#1F3D2E] font-sans font-semibold text-base lg:text-lg shadow-xl"
              >
                Agendar diagnóstico gratuito
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <div className="font-mono-tech text-[11px] text-[#f4f1ec]/50">
                <span className="block text-[#c48b30] mb-1 uppercase tracking-widest">NPS 94</span>
                <span>+500 empresas atendidas</span>
              </div>
            </div>
            <p className="mt-4 text-[12px] text-[#f4f1ec]/50 font-sans">
              Sem compromisso. Diagnóstico de 30 minutos por videochamada.
            </p>
          </div>

          {/* Imagem grande — direita */}
          <div className="lg:col-span-5 relative h-[440px] sm:h-[540px] lg:h-[820px] lg:-mr-10">
            <div
              className="absolute inset-0 rounded-2xl lg:rounded-none lg:rounded-l-[4rem] overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 22%, #000 100%), linear-gradient(to top, transparent 0%, #000 14%, #000 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 22%, #000 100%), linear-gradient(to top, transparent 0%, #000 14%, #000 100%)",
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              }}
            >
              <img
                src={heroPerson}
                alt="Profissional Cluny — confiança e clareza estratégica"
                width={900}
                height={1200}
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
              />
              {/* Overlay de tom verde */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(31,61,46,0.2), transparent 55%)",
                }}
              />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating brass card */}
              <div className="pointer-events-auto absolute bottom-6 left-4 lg:-left-12 bg-[#f4f1ec] p-6 lg:p-8 shadow-2xl max-w-[240px] hero-deco-mobile-hide">
                <div aria-hidden className="w-8 h-1 bg-[#c48b30] mb-4" />
                <p className="font-display text-lg lg:text-xl text-[#1F3D2E] leading-tight mb-3">
                  Decisões baseadas em números, não em suposições.
                </p>
                <span className="font-mono-tech text-[10px] text-[#1F3D2E]/40 uppercase tracking-widest">
                  Método Cluny
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhe inferior */}
        <div className="mt-16 hidden lg:flex justify-between items-end">
          <div className="font-mono-tech text-[9px] text-[#f4f1ec]/25 uppercase tracking-[0.3em] flex gap-12">
            <span>CRC-SP 2SP-000000</span>
            <span>Operando desde 2013</span>
          </div>
          <div aria-hidden className="h-12 w-px bg-gradient-to-t from-[#c48b30] to-transparent" />
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

export function Atuacao({ showModulos = true }: { showModulos?: boolean } = {}) {
  const sectionId = showModulos ? "atuacao" : "entregaveis";
  return (
    <section id={sectionId} className="py-24 lg:py-32 bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {showModulos && (
          <>
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
          </>
        )}


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

const TESTIMONIALS: [string, string, string, string][] = [
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
              <div className="flex justify-between label-mono text-[#6e7b7c]"><span>R$ 3,5k</span><span>R$ 15k</span></div>
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

/* ================================================================
   ============== INDICADORES (NOVO — fundo verde escuro) =============
   ================================================================ */
export function Indicadores() {
  const items = [
    { v: 12, fmt: (n: number) => `+${Math.round(n)}`, small: "anos", d: "de mercado consolidado" },
    { v: 350, fmt: (n: number) => `${Math.round(n)}`, small: "empresas", d: "organizadas pela Cluny" },
    { v: 98, fmt: (n: number) => `${Math.round(n)}%`, small: "", d: "de retenção de clientes" },
  ];
  return (
    <section style={{ background: "#1F3D2E" }} className="py-20 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((m, i) => (
          <div key={i} className="text-center md:text-left">
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span
                style={{
                  fontFamily: "JetBrains Mono, ui-monospace, monospace",
                  fontSize: 56,
                  color: "#c48b30",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                <CounterMetric value={m.v} format={m.fmt} />
              </span>
              {m.small && (
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: "#cec9b8", fontWeight: 600 }}>
                  {m.small}
                </span>
              )}
            </div>
            <p
              className="mt-3"
              style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 18, color: "#f4f1ec" }}
            >
              {m.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============= DIAGNÓSTICO INTERATIVO · 5 PERGUNTAS ============= */
type DiagOpt = { label: string; risco: number };
type DiagQ = { q: string; opts: DiagOpt[] };

const DIAG5: DiagQ[] = [
  {
    q: "Qual é o faturamento mensal aproximado da sua empresa?",
    opts: [
      { label: "Até R$ 50 mil", risco: 1 },
      { label: "R$ 50k – R$ 200k", risco: 2 },
      { label: "R$ 200k – R$ 1M", risco: 2 },
      { label: "Acima de R$ 1M", risco: 3 },
    ],
  },
  {
    q: "Você sabe qual é a sua margem de lucro real hoje?",
    opts: [
      { label: "Sim, com precisão", risco: 0 },
      { label: "Tenho uma ideia aproximada", risco: 1 },
      { label: "Não sei", risco: 3 },
      { label: "Não acompanho", risco: 3 },
    ],
  },
  {
    q: "Como é o seu controle financeiro atual?",
    opts: [
      { label: "Planilha própria", risco: 2 },
      { label: "Sistema (ERP/app)", risco: 1 },
      { label: "Meu contador faz", risco: 2 },
      { label: "Não tenho controle estruturado", risco: 3 },
    ],
  },
  {
    q: "Quantas pessoas da equipe administrativa você tem hoje?",
    opts: [
      { label: "Sou eu mesmo", risco: 3 },
      { label: "1 pessoa", risco: 2 },
      { label: "2 a 3 pessoas", risco: 1 },
      { label: "4 ou mais", risco: 1 },
    ],
  },
  {
    q: "Qual dessas dores mais representa sua situação?",
    opts: [
      { label: "Faturei bem mas não sobrou dinheiro", risco: 3 },
      { label: "Não sei se posso contratar ou investir", risco: 2 },
      { label: "Meu contador só aparece no imposto de renda", risco: 2 },
      { label: "Não tenho relatórios para tomar decisão", risco: 3 },
    ],
  },
];

function diagResultado(answers: (number | null)[]) {
  const total = answers.reduce<number>((s, a, i) => s + (a === null ? 0 : DIAG5[i].opts[a].risco), 0);
  const margemNaoSabe = answers[1] === 2 || answers[1] === 3;
  const semControle = answers[2] === 3;
  if (margemNaoSabe && semControle) {
    return {
      titulo: "Diagnóstico: Alto risco financeiro",
      cor: "#b94a3a",
      linhas: [
        "Sua empresa opera no escuro: sem visibilidade de margem nem controle estruturado.",
        "Risco identificado: decisões baseadas em sensação podem comprometer o caixa nos próximos 90 dias.",
        "Próximo passo: implantação imediata de BPO Financeiro para estruturar a base operacional.",
      ],
    };
  }
  if (total >= 11) {
    return {
      titulo: "Diagnóstico: Risco moderado a alto",
      cor: "#c48b30",
      linhas: [
        "Sua empresa tem alguns controles, mas opera sem a base que sustenta crescimento seguro.",
        "Risco identificado: passivos ocultos e decisões sem dados consistentes.",
        "Próximo passo: revisão estruturada do seu financeiro com o Método Cluny.",
      ],
    };
  }
  if (total >= 6) {
    return {
      titulo: "Diagnóstico: Estágio em estruturação",
      cor: "#c48b30",
      linhas: [
        "Sua empresa está saindo do caos, mas ainda falta o nível de controladoria que multiplica resultado.",
        "Risco identificado: gargalos de informação que limitam o salto para o próximo patamar.",
        "Próximo passo: Controladoria Cluny para transformar dados em decisão estratégica.",
      ],
    };
  }
  return {
    titulo: "Diagnóstico: Base sólida — pronto para escalar",
    cor: "#005a54",
    linhas: [
      "Sua empresa tem controle e clareza. Agora é hora de usar isso como vantagem competitiva.",
      "Oportunidade identificada: orçamento, cenários e expansão com previsibilidade.",
      "Próximo passo: Controladoria estratégica para acelerar o crescimento.",
    ],
  };
}

export function Diagnostico() {
  const [step, setStep] = useState(0); // 0..4 perguntas; 5 = resultado
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const total = DIAG5.length;
  const isResult = step === total;
  const progress = isResult ? 100 : ((step + (answers[step] !== null ? 1 : 0)) / total) * 100;

  const set = (i: number) => {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    setTimeout(() => setStep((s) => Math.min(total, s + 1)), 220);
  };

  const reset = () => { setStep(0); setAnswers(Array(5).fill(null)); };
  const resultado = useMemo(() => diagResultado(answers), [answers]);

  return (
    <section id="diagnostico" className="py-24 lg:py-32" style={{ background: "#f4f1ec" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="label-mono" style={{ color: "#c48b30" }}>· DIAGNÓSTICO INTERATIVO</span>
          <h2 className="font-display font-semibold text-[32px] lg:text-[44px] mt-4 leading-tight" style={{ color: "#1F3D2E" }}>
            Diagnóstico Financeiro Gratuito — <span className="italic" style={{ color: "#005a54" }}>2 minutos</span>
          </h2>
          <p className="mt-5 text-[16px]" style={{ color: "#6e7b7c" }}>
            Responda 5 perguntas e descubra onde sua empresa está perdendo dinheiro agora.
          </p>
        </div>

        <div
          className="mx-auto"
          style={{
            maxWidth: 760, background: "#ffffff", borderRadius: 20,
            padding: "32px 28px", boxShadow: "0 24px 60px rgba(31,61,46,0.10)",
          }}
        >
          {/* progress bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="label-mono" style={{ color: "#6e7b7c" }}>
              {isResult ? "RESULTADO" : `PERGUNTA ${step + 1} DE ${total}`}
            </span>
            <span style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: "#005a54" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: 2, background: "rgba(0,90,84,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#005a54", transition: "width 400ms ease" }} />
          </div>

          {/* conteúdo */}
          <div key={step} className="mt-10 animate-fade-in">
            {!isResult ? (
              <div>
                <h3 className="font-display text-[22px] lg:text-[26px] leading-snug" style={{ color: "#1F3D2E" }}>
                  {DIAG5[step].q}
                </h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DIAG5[step].opts.map((opt, oi) => {
                    const selected = answers[step] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => set(oi)}
                        className="text-left transition-all flex items-center justify-between gap-3"
                        style={{
                          padding: "16px 18px", borderRadius: 12,
                          border: selected ? "2px solid #005a54" : "2px solid #e8e4db",
                          background: selected ? "#005a54" : "#ffffff",
                          color: selected ? "#f4f1ec" : "#1A1A1A",
                          fontFamily: "Inter", fontSize: 14, fontWeight: 500,
                          cursor: "pointer", minHeight: 56,
                        }}
                      >
                        <span>{opt.label}</span>
                        {selected && <CheckCircle2 size={18} color="#c48b30" strokeWidth={2.5} />}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-8">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    style={{ color: "#6e7b7c", fontSize: 13, fontWeight: 700, opacity: step === 0 ? 0.3 : 1, background: "transparent", border: 0, cursor: step === 0 ? "default" : "pointer" }}
                  >
                    ← Voltar
                  </button>
                  <span style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 11, color: "#6e7b7c" }}>
                    {step + 1} / {total}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <span
                  className="inline-block label-mono"
                  style={{
                    color: resultado.cor, background: `${resultado.cor}15`,
                    padding: "6px 14px", borderRadius: 999, marginBottom: 18,
                  }}
                >
                  · ANÁLISE GERADA
                </span>
                <h3 className="font-display font-semibold text-[26px] lg:text-[34px] leading-tight" style={{ color: "#1F3D2E" }}>
                  {resultado.titulo}
                </h3>
                <ul className="mt-8 space-y-4 text-left max-w-[560px] mx-auto">
                  {resultado.linhas.map((l, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: resultado.cor, fontWeight: 700, fontFamily: "JetBrains Mono, ui-monospace, monospace" }}>
                        0{i + 1}
                      </span>
                      <span style={{ fontFamily: "Inter", fontSize: 15, color: "#1A1A1A", lineHeight: 1.6 }}>{l}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <a
                    href="#cadastro"
                    className="inline-flex items-center gap-2 transition-all hover:opacity-90"
                    style={{
                      background: "#005a54", color: "#f4f1ec",
                      padding: "16px 32px", borderRadius: 12,
                      fontFamily: "Inter", fontWeight: 700, fontSize: 14, minHeight: 56,
                    }}
                  >
                    Agendar meu diagnóstico completo e gratuito →
                  </a>
                  <p className="text-[12px]" style={{ color: "#6e7b7c", fontFamily: "Inter" }}>
                    Sem compromisso. Diagnóstico de 30 minutos por videochamada.
                  </p>
                  <a href="#metodo" style={{ color: "#005a54", fontSize: 13, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
                    Ver como o Método Cluny funciona
                  </a>
                  <button onClick={reset} style={{ color: "#6e7b7c", fontSize: 12, background: "transparent", border: 0, cursor: "pointer", marginTop: 4 }}>
                    ↺ Refazer diagnóstico
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= CALCULADORA · CLT vs BPO CLUNY ============= */
const BPO_PRECO = 3500;

export function CalculadoraCLT() {
  const [salario, setSalario] = useState(5000);
  const [pericul, setPericul] = useState(false);
  const [horasExtras, setHorasExtras] = useState(false);
  const [tempo, setTempo] = useState(2);
  const [shown, setShown] = useState(false);

  const calc = useMemo(() => {
    const base = salario * (1 + (pericul ? 0.30 : 0) + (horasExtras ? 0.15 : 0));
    const fgts = base * 0.08;
    const inss = base * 0.20;
    const rat = base * 0.05;
    const decimo = base / 12 * (1 + 0.28);
    const ferias = (base * (4 / 3)) / 12 * 1.28;
    const aviso = base / 12;
    const total = base + fgts + inss + rat + decimo + ferias + aviso;
    const passivoRescisorio = fgts * 12 * tempo * 0.4;
    return { base, fgts, inss, rat, decimo, ferias, aviso, total, passivoRescisorio,
      pct: ((total / salario) - 1) * 100 };
  }, [salario, pericul, horasExtras, tempo]);

  const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const linhas = [
    { label: "Salário bruto", visivel: salario, real: calc.base },
    { label: "FGTS (8%)", visivel: null, real: calc.fgts },
    { label: "INSS patronal (20%)", visivel: null, real: calc.inss },
    { label: "RAT + terceiros (~5%)", visivel: null, real: calc.rat },
    { label: "13º salário (mensal)", visivel: null, real: calc.decimo },
    { label: "Férias + 1/3 (mensal)", visivel: null, real: calc.ferias },
    { label: "Aviso prévio provisionado", visivel: null, real: calc.aviso },
  ];

  return (
    <section id="calculadora-clt" className="py-24 lg:py-32" style={{ background: "#1A1A1A" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="label-mono" style={{ color: "#c48b30" }}>· CALCULADORA · CLT vs BPO</span>
          <h2 className="font-display font-semibold mt-4 leading-tight" style={{ color: "#f4f1ec", fontSize: "clamp(28px, 4vw, 44px)" }}>
            Quanto você está pagando por um funcionário CLT que <span className="italic" style={{ color: "#c48b30" }}>você pensa que custa R$ {salario.toLocaleString("pt-BR")}?</span>
          </h2>
          <p className="mt-5 text-[18px]" style={{ color: "#cec9b8" }}>
            Coloque o salário bruto e veja o custo real — e os riscos que você está corrando.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* INPUTS */}
          <div style={{ background: "#0e0e0e", border: "1px solid rgba(244,241,236,0.08)", borderRadius: 16, padding: 28 }}>
            <label className="label-mono block mb-2" style={{ color: "#c48b30" }}>Salário bruto do funcionário</label>
            <div className="flex items-center" style={{ background: "#1A1A1A", border: "1px solid rgba(244,241,236,0.12)", borderRadius: 10, padding: "0 16px" }}>
              <span style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 18, color: "#6e7b7c" }}>R$</span>
              <input
                type="number"
                value={salario}
                onChange={(e) => setSalario(Math.max(0, Number(e.target.value) || 0))}
                className="flex-1 bg-transparent outline-none"
                style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 22, color: "#f4f1ec", padding: "16px 12px", border: 0, fontWeight: 700 }}
              />
            </div>

            {/* toggles */}
            {[
              { label: "Tem adicional de periculosidade/insalubridade?", value: pericul, set: setPericul },
              { label: "Tem horas extras frequentes?", value: horasExtras, set: setHorasExtras },
            ].map((t) => (
              <div key={t.label} className="mt-5 flex items-center justify-between gap-4">
                <span style={{ color: "#cec9b8", fontFamily: "Inter", fontSize: 14 }}>{t.label}</span>
                <div className="flex" style={{ background: "#1A1A1A", border: "1px solid rgba(244,241,236,0.12)", borderRadius: 999, padding: 3 }}>
                  {[
                    { v: false, l: "Não" }, { v: true, l: "Sim" },
                  ].map((o) => (
                    <button
                      key={o.l}
                      onClick={() => t.set(o.v)}
                      style={{
                        background: t.value === o.v ? "#005a54" : "transparent",
                        color: t.value === o.v ? "#f4f1ec" : "#6e7b7c",
                        padding: "6px 18px", borderRadius: 999, border: 0,
                        fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer",
                      }}
                    >{o.l}</button>
                  ))}
                </div>
              </div>
            ))}

            {/* slider */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "#cec9b8", fontFamily: "Inter", fontSize: 14 }}>Há quanto tempo está contratado?</span>
                <span style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", color: "#c48b30", fontSize: 14, fontWeight: 700 }}>
                  {tempo} {tempo === 1 ? "ano" : "anos"}
                </span>
              </div>
              <input
                type="range" min={0} max={10} step={1}
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "#005a54" }}
              />
            </div>

            <button
              onClick={() => setShown(true)}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{
                background: "#005a54", color: "#f4f1ec",
                minHeight: 52, borderRadius: 10, border: 0,
                fontFamily: "Inter", fontWeight: 700, fontSize: 14, letterSpacing: "0.02em", cursor: "pointer",
              }}
            >
              Calcular custo real →
            </button>
          </div>

          {/* RESULTADO */}
          <div>
            {!shown ? (
              <div style={{ background: "rgba(244,241,236,0.04)", border: "1px dashed rgba(244,241,236,0.18)", borderRadius: 16, padding: 40, textAlign: "center", color: "#6e7b7c", fontFamily: "Inter", fontSize: 14 }}>
                Preencha os dados ao lado e clique em <strong style={{ color: "#c48b30" }}>Calcular custo real</strong> para ver o comparativo.
              </div>
            ) : (
              <div className="animate-fade-in" style={{ background: "#0e0e0e", border: "1px solid rgba(244,241,236,0.08)", borderRadius: 16, overflow: "hidden" }}>
                <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2" style={{ padding: "16px 20px", background: "#1A1A1A", borderBottom: "1px solid rgba(244,241,236,0.08)" }}>
                  <span className="label-mono" style={{ color: "#6e7b7c" }}>Item</span>
                  <span className="label-mono text-right" style={{ color: "#6e7b7c" }}>O que você vê</span>
                  <span className="label-mono text-right" style={{ color: "#c48b30" }}>O que você paga</span>
                </div>
                {linhas.map((l, i) => (
                  <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 items-center" style={{ padding: "12px 20px", borderBottom: "1px solid rgba(244,241,236,0.05)" }}>
                    <span style={{ color: "#cec9b8", fontFamily: "Inter", fontSize: 13 }}>{l.label}</span>
                    <span className="text-right" style={{ color: "#6e7b7c", fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 13 }}>
                      {l.visivel === null ? "—" : `R$ ${fmt(l.visivel)}`}
                    </span>
                    <span className="text-right" style={{ color: "#f4f1ec", fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 13, fontWeight: 600 }}>
                      R$ {fmt(l.real)}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 items-center" style={{ padding: "18px 20px", background: "rgba(196,139,48,0.08)" }}>
                  <span style={{ color: "#f4f1ec", fontFamily: "Inter", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Total real</span>
                  <span className="text-right" style={{ color: "#6e7b7c", fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 14 }}>R$ {fmt(salario)}</span>
                  <span className="text-right" style={{ color: "#c48b30", fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 18, fontWeight: 700 }}>
                    R$ {fmt(calc.total)} <span style={{ fontSize: 11, fontWeight: 500 }}>(+{calc.pct.toFixed(0)}%)</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RISCOS */}
        {shown && (
          <div className="mt-10 animate-fade-in" style={{ background: "#1F3D2E", border: "2px solid #c48b30", borderRadius: 16, padding: "32px 28px" }}>
            <h3 className="font-display font-semibold text-[22px] lg:text-[26px]" style={{ color: "#c48b30" }}>
              ⚠ Riscos que essa conta não mostra
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                "Processos trabalhistas: custo médio de R$ 15.000 por ação",
                "Multa rescisória: 40% do FGTS acumulado",
                "Passivo oculto de horas extras e banco de horas mal gerido",
                "Dependência operacional: e se esse funcionário sair amanhã?",
                "Inconsistência: férias coletivas, afastamentos, médicos do trabalho",
              ].map((r) => (
                <li key={r} className="flex gap-3" style={{ color: "#f4f1ec", fontFamily: "Inter", fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: "#c48b30" }}>·</span>{r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* COMPARATIVO */}
        {shown && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div style={{ background: "#0e0e0e", border: "1px solid rgba(192,57,43,0.5)", borderRadius: 16, padding: 28 }}>
              <span className="label-mono" style={{ color: "#c0392b" }}>· CLT</span>
              <div className="mt-3" style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 28, fontWeight: 700, color: "#f4f1ec" }}>
                R$ {fmt(calc.total)}
              </div>
              <div className="text-[12px]" style={{ color: "#6e7b7c", fontFamily: "Inter" }}>custo real por mês</div>
              <ul className="mt-5 space-y-2 text-[13px]" style={{ color: "#cec9b8", fontFamily: "Inter" }}>
                <li>+ riscos trabalhistas</li>
                <li>+ tempo de gestão de RH</li>
                <li>+ incerteza jurídica</li>
                <li>+ passivo rescisório acumulado: <strong style={{ color: "#c0392b" }}>R$ {fmt(calc.passivoRescisorio)}</strong></li>
              </ul>
            </div>

            <div style={{ background: "#0e0e0e", border: "2px solid #005a54", borderRadius: 16, padding: 28, position: "relative" }}>
              <span className="absolute label-mono" style={{ top: -10, right: 18, background: "#c48b30", color: "#1A1A1A", padding: "4px 10px", borderRadius: 999 }}>RECOMENDADO</span>
              <span className="label-mono" style={{ color: "#005a54" }}>· BPO FINANCEIRO CLUNY</span>
              <div className="mt-3" style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 28, fontWeight: 700, color: "#f4f1ec" }}>
                a partir de R$ {fmt(BPO_PRECO)}
              </div>
              <div className="text-[12px]" style={{ color: "#6e7b7c", fontFamily: "Inter" }}>por mês — fixo</div>
              <ul className="mt-5 space-y-2 text-[13px]" style={{ color: "#cec9b8", fontFamily: "Inter" }}>
                <li>· Sem encargos. Sem passivo. Sem processo.</li>
                <li>· Equipe especializada</li>
                <li>· Relatórios semanais</li>
                <li>· Resultado garantido</li>
              </ul>
              <a
                href="#cadastro"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full transition-all hover:opacity-90"
                style={{
                  background: "#005a54", color: "#f4f1ec", minHeight: 48,
                  borderRadius: 10, fontFamily: "Inter", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em",
                }}
              >
                Quero substituir meu CLT pelo BPO Cluny →
              </a>
              <p className="mt-3 text-center text-[11px]" style={{ color: "#6e7b7c", fontFamily: "Inter" }}>
                Sem compromisso. Diagnóstico de 30 minutos por videochamada.
              </p>
            </div>
          </div>
        )}

        <p className="mt-8 italic" style={{ color: "#6e7b7c", fontFamily: "Inter", fontSize: 12 }}>
          * Os valores são estimativas baseadas na CLT vigente. Consulte um especialista para análise individualizada.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   ============= MÉTODO CLUNY (REESCRITO — 5 etapas) =============
   ================================================================ */

type Etapa = {
  n: string;
  titulo: string;
  periodo: string;
  desc: string;
  fase: "implantacao" | "ciclo";
  entregaveis: string[];
};

const METODO_ETAPAS: Etapa[] = [
  {
    n: "01", titulo: "Diagnóstico", periodo: "Semana 1", fase: "implantacao",
    desc: "Raio-X completo do financeiro atual. Identifico o que está funcionando, o que está faltando e o que precisa ser reformado.",
    entregaveis: [
      "Mapeamento de contas bancárias, cartões e caixas",
      "Levantamento de receitas, despesas fixas e variáveis",
      "Análise do fluxo de caixa dos últimos 3 meses",
      "Identificação de gargalos e riscos financeiros",
      "Plano de implantação 30/60/90 dias personalizado",
      "Relatório de diagnóstico entregue em até 5 dias úteis",
    ],
  },
  {
    n: "02", titulo: "Fundação", periodo: "Semanas 2 e 3", fase: "implantacao",
    desc: "Estruturo as bases: plano de contas, políticas financeiras escritas e acessos organizados.",
    entregaveis: [
      "Plano de contas personalizado para o segmento",
      "Políticas financeiras documentadas (aprovação, limites, alçadas)",
      "POPs — Procedimentos Operacionais Padrão escritos",
      "Configuração e organização de acessos bancários",
      "Padronização de centros de custo e categorias",
      "Treinamento da equipe envolvida no processo",
    ],
  },
  {
    n: "03", titulo: "Reforma", periodo: "Semanas 4 a 6", fase: "implantacao",
    desc: "Opero ao lado da sua equipe durante a transição e entrego o primeiro fechamento mensal real.",
    entregaveis: [
      "Operação assistida com acompanhamento diário",
      "Conciliação bancária do período de transição",
      "Primeiro fechamento mensal completo",
      "DRE (Demonstração de Resultado) do período",
      "Ajustes e calibragem do plano de contas",
      "Relatório de encerramento da implantação",
    ],
  },
  {
    n: "04", titulo: "Operação", periodo: "Cadência diária e semanal", fase: "ciclo",
    desc: "Executo o financeiro do dia a dia: lançamentos, pagamentos, recebimentos e conciliação contínua.",
    entregaveis: [
      "Lançamentos diários de receitas e despesas",
      "Gestão de contas a pagar e a receber",
      "Conciliação bancária semanal",
      "Controle de inadimplência e cobranças",
      "Relatório semanal de posição de caixa",
      "Atendimento e suporte à equipe operacional",
    ],
  },
  {
    n: "05", titulo: "Gestão", periodo: "Cadência mensal e trimestral", fase: "ciclo",
    desc: "Entrego os relatórios estratégicos e participo das reuniões de decisão da empresa.",
    entregaveis: [
      "DRE mensal (Demonstração do Resultado do Exercício)",
      "DFC (Demonstração do Fluxo de Caixa)",
      "Dashboard gerencial atualizado",
      "Reunião mensal de análise de resultado",
      "Projeções e cenários para o próximo período",
      "OKRs financeiros acompanhados trimestralmente",
    ],
  },
];

function FaseBadge({ fase }: { fase: "implantacao" | "ciclo" }) {
  const isImpl = fase === "implantacao";
  return (
    <span
      className="inline-flex items-center"
      style={{
        background: isImpl ? "rgba(196,139,48,0.12)" : "rgba(0,90,84,0.12)",
        color: isImpl ? "#c48b30" : "#005a54",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 4,
      }}
    >
      {isImpl ? "Implantação · 45–60 dias" : "Ciclo Contínuo"}
    </span>
  );
}

function EntregaveisPopover({ etapa }: { etapa: Etapa }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 transition-all hover:opacity-80"
          style={{
            border: "2px solid #005a54",
            color: "#005a54",
            padding: "8px 14px",
            borderRadius: 4,
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Ver o que fazemos →
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[340px] p-5"
        style={{
          background: "#ffffff",
          border: "1px solid #e8e4db",
          borderRadius: 16,
          boxShadow: "0 24px 56px rgba(0,0,0,0.16)",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="label-mono" style={{ color: "#c48b30" }}>Etapa · {etapa.n}</div>
            <div className="font-display font-semibold text-[18px] mt-1" style={{ color: "#1F3D2E" }}>
              {etapa.titulo}
            </div>
          </div>
        </div>
        <ul className="space-y-2 mt-2">
          {etapa.entregaveis.map((it, i) => (
            <li key={i} className="flex gap-2.5">
              <span style={{ color: "#005a54", fontWeight: 700, fontSize: 13, lineHeight: 1.5 }}>·</span>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#1A1A1A", lineHeight: 1.5 }}>
                {it}
              </span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

/* ============= MÉTODO CLUNY · 4 ETAPAS ============= */
type MetodoEtapa = {
  n: string;
  label: string;
  titulo: string;
  texto: string;
  entregavel: string;
  tempo: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
};


const METODO_4: MetodoEtapa[] = [
  {
    n: "01", label: "Diagnóstico", Icon: SearchIcon,
    titulo: "Vejo o que está invisível nas suas finanças",
    texto: "Mapeamos receitas, custos, fluxo de caixa, estrutura societária e obrigações fiscais. Em 7 dias úteis, você tem um raio-x completo — não um relatório genérico, mas um diagnóstico do seu negócio.",
    entregavel: "Relatório de Diagnóstico Personalizado",
    tempo: "7 dias úteis",
  },
  {
    n: "02", label: "Estruturação", Icon: Settings2,
    titulo: "Organizo o que estava espalhado",
    texto: "Implantamos o BPO Financeiro, separamos contas PJ/PF, estruturamos centros de custo e definimos o modelo de relatórios gerenciais que você vai receber toda semana.",
    entregavel: "Plano de Contas + DRE Gerencial + Dashboard",
    tempo: "30 a 60 dias",
  },
  {
    n: "03", label: "Controle", Icon: Gauge,
    titulo: "Você passa a decidir com dados, não com intuição",
    texto: "Relatórios gerenciais semanais, fechamento mensal, controle de contratos, conciliação bancária e indicadores de performance (KPIs) que revelam onde o dinheiro está indo — e onde está vazando.",
    entregavel: "Relatórios Semanais + KPIs + Reunião Mensal de Resultado",
    tempo: "Contínuo",
  },
  {
    n: "04", label: "Crescimento", Icon: TrendingUp,
    titulo: "Com clareza, o crescimento deixa de ser acidente",
    texto: "Com a base estruturada, partimos para planejamento orçamentário, análise de viabilidade de expansão, modelagem de cenários e suporte estratégico nas decisões que movem o negócio.",
    entregavel: "Orçamento Anual + Cenários + Suporte Estratégico",
    tempo: "Contínuo",
  },
];

function MetodoCard({ etapa }: { etapa: MetodoEtapa }) {
  return (
    <div
      className="relative animate-fade-in"
      style={{
        background: "#f4f1ec",
        borderLeft: "4px solid #005a54",
        borderRadius: 8,
        padding: "28px 32px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
      }}
    >
      <h3 className="font-display font-semibold text-[24px] lg:text-[28px] leading-tight" style={{ color: "#1F3D2E" }}>
        {etapa.titulo}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#1A1A1A" }}>
        {etapa.texto}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span
          style={{
            background: "#c48b30", color: "#1A1A1A",
            fontFamily: "Inter", fontSize: 11, fontWeight: 700,
            padding: "8px 14px", borderRadius: 999, letterSpacing: "0.04em",
          }}
        >
          {etapa.entregavel}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            fontSize: 12, color: "#6e7b7c", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}
        >
          ⏱ {etapa.tempo}
        </span>
      </div>
    </div>
  );
}

export function Metodo() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const total = METODO_4.length;

  return (
    <section
      id="metodo"
      ref={sectionRef}
      style={{ background: "#1F3D2E", padding: "120px 0" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="label-mono" style={{ color: "#c48b30" }}>· O MÉTODO CLUNY</span>
          <h2
            className="font-display font-semibold mt-4 leading-[1.1]"
            style={{ color: "#f4f1ec", fontSize: "clamp(28px, 4.4vw, 44px)" }}
          >
            O caminho que transforma caos financeiro em clareza estratégica
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed" style={{ color: "#cec9b8" }}>
            4 etapas. Resultado mensurável. Sem achismos.
          </p>
        </div>

        {/* Desktop — timeline horizontal */}
        <div className="hidden lg:block relative">
          {/* linha conectora animada */}
          <div className="absolute left-0 right-0" style={{ top: 38, height: 2 }}>
            <div className="mx-auto" style={{ maxWidth: "85%", height: "100%", background: "rgba(244,241,236,0.12)", position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, #005a54, #c48b30)",
                  width: visible ? "100%" : "0%",
                  transition: "width 2000ms ease-out",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 relative">
            {METODO_4.map((e, idx) => {
              const isActive = active === idx;
              const Icon = e.Icon;
              return (
                <button
                  key={e.n}
                  onClick={() => setActive(idx)}
                  onMouseEnter={() => setActive(idx)}
                  className="group flex flex-col items-center text-center px-4 outline-none"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms ease-out ${0.4 + idx * 0.3}s`,
                    background: "transparent", border: 0, cursor: "pointer",
                  }}
                  aria-expanded={isActive}
                >
                  <div
                    className="relative z-10 flex items-center justify-center transition-all"
                    style={{
                      width: 78, height: 78, borderRadius: "50%",
                      background: "#1F3D2E",
                      border: `2px solid ${isActive ? "#c48b30" : "#005a54"}`,
                      boxShadow: isActive ? "0 0 0 6px rgba(196,139,48,0.15)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, ui-monospace, monospace",
                        fontSize: 28, fontWeight: 700, color: "#c48b30",
                      }}
                    >
                      {e.n}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2" style={{ color: isActive ? "#c48b30" : "#f4f1ec" }}>
                    <Icon size={16} strokeWidth={1.8} />
                    <span style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, letterSpacing: "0.02em" }}>
                      {e.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* card expansivo */}
          <div className="mt-12 max-w-3xl mx-auto" key={active}>
            <MetodoCard etapa={METODO_4[active]} />
          </div>
        </div>

        {/* Mobile — vertical empilhado */}
        <div className="lg:hidden space-y-3">
          {METODO_4.map((e, idx) => {
            const isActive = active === idx;
            const Icon = e.Icon;
            return (
              <div key={e.n}>
                <button
                  onClick={() => setActive(isActive ? -1 : idx)}
                  className="w-full flex items-center gap-4 text-left p-4"
                  style={{
                    background: "rgba(244,241,236,0.04)",
                    border: `1px solid ${isActive ? "#c48b30" : "rgba(244,241,236,0.12)"}`,
                    borderRadius: 12,
                  }}
                  aria-expanded={isActive}
                >
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "#1F3D2E", border: "2px solid #005a54",
                      fontFamily: "JetBrains Mono, ui-monospace, monospace",
                      fontWeight: 700, fontSize: 16, color: "#c48b30",
                    }}
                  >
                    {e.n}
                  </span>
                  <div className="flex items-center gap-2 flex-1" style={{ color: "#f4f1ec" }}>
                    <Icon size={16} strokeWidth={1.8} color="#c48b30" />
                    <span style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 600 }}>{e.label}</span>
                  </div>
                  <span style={{ color: "#c48b30", fontSize: 18, transition: "transform 300ms", transform: isActive ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {isActive && (
                  <div className="mt-3">
                    <MetodoCard etapa={e} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="text-center mt-16 lg:mt-20">
          <a
            href="#diagnostico"
            className="inline-flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{
              background: "#005a54", color: "#f4f1ec",
              minHeight: 56, padding: "0 32px", borderRadius: 12,
              fontFamily: "Inter", fontWeight: 700, fontSize: 14, letterSpacing: "0.02em",
            }}
          >
            Quero aplicar o Método Cluny no meu negócio
            <span>→</span>
          </a>
        </div>
      </div>
      {/* suprimir aviso eslint sobre total não usado */}
      <span className="sr-only">{total} etapas</span>
    </section>
  );
}

/* ================================================================
   ============= MANIFESTO (REESCRITO — vídeo grande) ============
   ================================================================ */
export function Manifesto({ videoUrl }: { videoUrl?: string } = {}) {
  return (
    <section id="manifesto" className="py-20 lg:py-24" style={{ background: "#1F3D2E" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
        <span className="label-mono" style={{ color: "#c48b30" }}>· NOSSA CRENÇA</span>
        <h2
          className="font-display font-semibold mt-4 text-[36px] lg:text-[52px] leading-tight max-w-4xl mx-auto"
          style={{ color: "#f4f1ec" }}
        >
          Gestão não é luxo de grande empresa.<br />
          <span className="italic" style={{ color: "#c48b30" }}>É o direito de todo empresário.</span>
        </h2>

        {/* Vídeo */}
        <div
          className="relative mx-auto mt-16 mb-16 group cursor-pointer"
          style={{
            width: "80%",
            maxWidth: 980,
            aspectRatio: "16 / 9",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(135deg, #1F3D2E, #005a54)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
          }}
        >
          {videoUrl ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoUrl}
              title="Manifesto Cluny"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                }}
              >
                <svg width={26} height={26} viewBox="0 0 24 24" fill="#005a54">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <p
          className="mx-auto max-w-[680px]"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 18,
            lineHeight: 1.7,
            color: "#f4f1ec",
          }}
        >
          Acredito que todo empresário merece saber onde está seu dinheiro. Não no fim do ano — no dia a dia, com clareza e precisão. Minha missão é transformar o financeiro de uma fonte de ansiedade em uma vantagem competitiva real.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   ============= CASES (REESCRITO — grid 3 colunas) ==============
   ================================================================ */

type Case = {
  nome: string; cargo: string; setor: string;
  iniciais: string; corFoto: string;
  resultado: string; resultadoDesc: string;
  depoimento: string;
  porte: string;
};

const CASES: Case[] = [
  {
    nome: "Marina Vasconcelos", cargo: "Sócia-fundadora · Estúdio Ímpar",
    setor: "Serviços", iniciais: "MV", corFoto: "#005a54",
    resultado: "Fluxo de caixa zerado em 90 dias",
    resultadoDesc: "do diagnóstico à operação previsível",
    depoimento: "Pela primeira vez consigo abrir o sistema e entender, em 5 minutos, onde a empresa está. A clareza financeira virou rotina.",
    porte: "32 funcionários · R$ 8M/ano",
  },
  {
    nome: "Eduardo Tavares", cargo: "CEO · Tavares Comércio",
    setor: "Varejo", iniciais: "ET", corFoto: "#c48b30",
    resultado: "−38% em despesas improdutivas",
    resultadoDesc: "identificadas no primeiro trimestre",
    depoimento: "Parei de tomar decisão na base do achismo. Cada movimento agora passa pelo dashboard — e a margem reagiu na mesma proporção.",
    porte: "58 funcionários · R$ 14M/ano",
  },
  {
    nome: "Helena Khoury", cargo: "Diretora · Clínica Khoury",
    setor: "Saúde", iniciais: "HK", corFoto: "#1F3D2E",
    resultado: "DRE mensal em D+5",
    resultadoDesc: "pela primeira vez na história da clínica",
    depoimento: "Não preciso mais ligar para a contabilidade pedindo número. O relatório chega antes da reunião, com leitura — não com planilha crua.",
    porte: "21 funcionários · R$ 5M/ano",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-24 lg:py-32" style={{ background: "#f4f1ec" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="label-mono" style={{ color: "#c48b30" }}>· RESULTADOS REAIS</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[52px] leading-tight mt-4" style={{ color: "#1F3D2E" }}>
            Empresas que transformaram o financeiro com o <em className="italic" style={{ color: "#005a54" }}>Método Cluny.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <article
              key={c.nome}
              className="bg-white flex flex-col"
              style={{ borderRadius: 20, padding: 32, boxShadow: "0 12px 32px rgba(31,61,46,0.06)" }}
            >
              {/* Linha 1: foto + nome + setor */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: c.corFoto,
                    color: "#f4f1ec",
                    fontFamily: "Fraunces, Georgia, serif",
                    fontSize: 22, fontWeight: 600,
                  }}
                >
                  {c.iniciais}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-[16px]" style={{ color: "#1F3D2E" }}>
                    {c.nome}
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: "#6e7b7c" }}>
                    {c.cargo}
                  </div>
                </div>
              </div>
              <span
                className="self-start mb-5"
                style={{
                  background: "#cec9b8",
                  color: "#1F3D2E",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 999,
                }}
              >
                {c.setor}
              </span>

              {/* Resultado */}
              <div
                style={{
                  fontFamily: "JetBrains Mono, ui-monospace, monospace",
                  fontSize: 22, fontWeight: 700, color: "#005a54", lineHeight: 1.2,
                }}
              >
                {c.resultado}
              </div>
              <div className="text-[13px] mt-2 mb-5" style={{ color: "#6e7b7c" }}>
                {c.resultadoDesc}
              </div>

              {/* Depoimento */}
              <p
                className="italic flex-1"
                style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: "#1A1A1A", lineHeight: 1.6 }}
              >
                "{c.depoimento}"
              </p>

              {/* Porte */}
              <div
                className="mt-6 pt-4"
                style={{
                  borderTop: "1px solid #e8e4db",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 11, color: "#6e7b7c",
                }}
              >
                Empresa: {c.porte}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ============= CONTEÚDO / BLOG (REESCRITO — 1 + 2) =============
   ================================================================ */
export function Conteudo() {
  const POSTS = [
    { cat: "Tributário", date: "02.MAI.2026", t: "Reforma tributária: o que muda para PMEs em 2026", sub: "O guia prático que separa hipótese de obrigação operacional.", img: blogTrib },
    { cat: "Gestão", date: "24.ABR.2026", t: "DRE gerencial: relatório bonito vs. leitura útil", sub: "Como ler um DRE em 3 minutos.", img: blogDre },
    { cat: "Controladoria", date: "17.ABR.2026", t: "Holding patrimonial: três armadilhas comuns", sub: "Erros que custam caro na constituição.", img: blogHolding },
  ];
  const [destaque, ...resto] = POSTS;

  const Card = ({ p, large = false }: { p: typeof POSTS[number]; large?: boolean }) => (
    <article
      className="group bg-white flex flex-col overflow-hidden cursor-pointer h-full"
      style={{ borderRadius: 16, border: "1px solid #e8e4db", transition: "all 200ms ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          height: large ? 320 : 160,
          background: "linear-gradient(135deg, #1F3D2E, #005a54)",
        }}
      >
        <img
          src={p.img}
          alt={p.t}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.85, mixBlendMode: "luminosity" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(31,61,46,0.45), rgba(0,90,84,0.35))" }} />
        <span
          className="absolute top-4 left-4"
          style={{
            background: "rgba(0,90,84,0.15)",
            color: "#f4f1ec",
            border: "1px solid rgba(244,241,236,0.3)",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 11, fontWeight: 600,
            padding: "4px 10px", borderRadius: 999,
          }}
        >
          {p.cat}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-display font-semibold flex-1"
          style={{ fontSize: large ? 24 : 18, color: "#1F3D2E", lineHeight: 1.3 }}
        >
          {p.t}
        </h3>
        <p className="mt-3 text-[14px]" style={{ color: "#6e7b7c", lineHeight: 1.5 }}>
          {p.sub}
        </p>
        <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #e8e4db" }}>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#6e7b7c" }}>{p.date}</span>
          <span style={{ color: "#005a54", fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, fontWeight: 700 }}>
            Ler artigo →
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <section id="blog" className="py-24 lg:py-32" style={{ background: "#ffffff" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="label-mono" style={{ color: "#c48b30" }}>· CONHECIMENTO GRATUITO</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[52px] leading-tight mt-4" style={{ color: "#1F3D2E" }}>
            Artigos que ajudam você a <em className="italic" style={{ color: "#005a54" }}>gerir melhor.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card p={destaque} large />
          </div>
          <div className="grid grid-rows-2 gap-6">
            {resto.map((p) => <Card key={p.t} p={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ============= MATERIAIS (NOVA) ================================
   ================================================================ */
export function Materiais() {
  const items = [
    {
      Icon: PlayCircle,
      titulo: "Vídeo Aulas Gratuitas",
      desc: "Aulas práticas sobre fluxo de caixa, DRE, conciliação e gestão financeira para empresários — sem jargão técnico.",
      tag: "Canal YouTube",
      cta: "Assistir agora",
    },
    {
      Icon: TableIcon,
      titulo: "Ferramentas de Gestão",
      desc: "Planilhas, templates e modelos prontos para você organizar o financeiro da sua empresa sem precisar de um sistema caro.",
      tag: "Download gratuito",
      cta: "Baixar agora",
    },
    {
      Icon: BookOpen,
      titulo: "E-books",
      desc: "Guias completos sobre BPO Financeiro, Controladoria e gestão para PMEs. Escritos para quem decide, não para quem estuda.",
      tag: "PDF gratuito",
      cta: "Baixar agora",
    },
  ];
  return (
    <section id="materiais" className="py-24 lg:py-32" style={{ background: "#cec9b8" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="label-mono" style={{ color: "#c48b30" }}>· PARA VOCÊ APLICAR HOJE</span>
          <h2 className="font-display font-semibold text-[36px] lg:text-[52px] leading-tight mt-4" style={{ color: "#1F3D2E" }}>
            Materiais gratuitos para gestores que querem <em className="italic" style={{ color: "#005a54" }}>mais controle.</em>
          </h2>
          <p className="mt-5 text-[16px]" style={{ color: "#1A1A1A" }}>
            Criados para quem não tem tempo a perder. Objetivos, práticos, aplicáveis no dia seguinte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.titulo}
              className="bg-white flex flex-col"
              style={{ borderRadius: 20, padding: 32, boxShadow: "0 8px 24px rgba(31,61,46,0.06)" }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(0,90,84,0.10)" }}
              >
                <it.Icon size={28} color="#005a54" />
              </div>
              <h3 className="font-display font-semibold text-[22px] mb-3" style={{ color: "#1F3D2E" }}>
                {it.titulo}
              </h3>
              <p className="text-[14px] flex-1" style={{ color: "#1A1A1A", lineHeight: 1.6 }}>
                {it.desc}
              </p>
              <span
                className="self-start mt-5 mb-5"
                style={{
                  background: "rgba(196,139,48,0.15)",
                  color: "#c48b30",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 11, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 999,
                }}
              >
                {it.tag}
              </span>
              <a
                href="#cadastro"
                className="inline-flex items-center justify-center"
                style={{
                  border: "2px solid #005a54",
                  color: "#005a54",
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 700, fontSize: 13,
                  background: "transparent",
                  transition: "all 200ms",
                }}
              >
                {it.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Faixa inferior */}
        <div
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ background: "#005a54", borderRadius: 16, padding: "24px 32px" }}
        >
          <span style={{ color: "#f4f1ec", fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, fontWeight: 500 }}>
            Mais de 2.400 gestores já baixaram nossos materiais.
          </span>
          <a
            href="#cadastro"
            className="inline-flex items-center"
            style={{
              border: "2px solid #f4f1ec",
              color: "#f4f1ec",
              padding: "10px 22px",
              borderRadius: 8,
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700, fontSize: 13,
              background: "transparent",
            }}
          >
            Ver todos os recursos →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ============= FAQ (REESCRITO — 8 perguntas, 2 colunas) ========
   ================================================================ */

const FAQS_NEW: { q: string; a: string }[] = [
  { q: "O BPO Financeiro substitui o meu contador?", a: "Não. São serviços complementares. O contador cuida das obrigações fiscais e contábeis (guias, declarações, balanço). Eu cuido do financeiro operacional e estratégico — fluxo de caixa, DRE gerencial, pagamentos, recebimentos e análise de resultado. Aliás, a Cluny também oferece contabilidade completa, se quiser tudo integrado." },
  { q: "Quanto tempo leva para eu ver os primeiros resultados?", a: "O Diagnóstico é entregue em até 5 dias úteis. A Fundação e a Reforma (implantação completa) levam de 45 a 60 dias. A partir daí, você já opera com DRE mensal, fluxo de caixa projetado e dashboard atualizado. A maioria dos clientes relata clareza real a partir do primeiro fechamento mensal." },
  { q: "Funciona para empresas de qual tamanho?", a: "Atendo empresas com faturamento entre R$ 500K e R$ 30M ao ano, principalmente nos segmentos de serviços, saúde, educação, comércio e indústria leve. Se sua empresa está fora desse perfil, posso indicar o melhor caminho." },
  { q: "Como funciona o acesso às informações da minha empresa?", a: "Trabalho com acesso controlado e formalizado. Tudo é documentado em contrato: quais acessos eu tenho, com qual finalidade e quem autoriza cada movimentação. Nenhum pagamento é executado sem autorização prévia e documentada do titular da empresa." },
  { q: "Preciso ter uma equipe financeira para contratar o BPO?", a: "Não. Grande parte dos meus clientes não tem equipe financeira — e é exatamente por isso que me contratam. Eu estruturo, opero e entrego os relatórios. Se você já tem uma equipe, posso trabalhar em conjunto, assumindo a liderança técnica do processo." },
  { q: "Qual é o investimento mensal?", a: "O valor varia conforme o volume de operações, complexidade da empresa e escopo do serviço contratado. Trabalho com proposta personalizada após o diagnóstico. O que posso adiantar: o custo do BPO é sistematicamente menor do que o custo de uma equipe interna qualificada — e com nível de qualidade superior." },
  { q: "Vocês atendem fora de São Paulo?", a: "Sim. Atendo empresas em todo o Brasil de forma 100% remota. Todo o processo — desde o onboarding até as reuniões mensais — é conduzido online, com entregas digitais e comunicação assíncrona organizada." },
  { q: "Como é feito o primeiro contato?", a: "Pelo botão de diagnóstico gratuito. Você agenda uma reunião de 30 a 40 minutos, onde eu faço um levantamento inicial da sua operação e apresento um parecer honesto sobre o que precisa ser feito — sem compromisso de contratação." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32" style={{ background: "#f4f1ec" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display font-semibold text-[36px] lg:text-[52px] leading-tight" style={{ color: "#1F3D2E" }}>
            Perguntas que eu mais <em className="italic" style={{ color: "#005a54" }}>recebo.</em>
          </h2>
          <p className="mt-5 text-[16px]" style={{ color: "#6e7b7c" }}>
            Se ainda restar alguma dúvida, é só chamar — respondo pessoalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {[FAQS_NEW.slice(0, 4), FAQS_NEW.slice(4)].map((col, ci) => (
            <Accordion key={ci} type="single" collapsible className="space-y-3">
              {col.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`${ci}-${i}`}
                  className="bg-white border-0"
                  style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
                >
                  <AccordionTrigger
                    className="px-5 py-5 hover:no-underline text-left"
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontWeight: 600, fontSize: 16, color: "#1A1A1A",
                    }}
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-5 pb-5"
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 15, color: "#6e7b7c", lineHeight: 1.7,
                    }}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const solucoes = [
    ["BPO Financeiro", "/planos/bpo"],
    ["Controladoria", "/planos/controladoria"],
    ["Contabilidade", "/planos/contabilidade"],
    ["Departamento Pessoal", "/planos"],
    ["Inteligência Tributária", "/planos"],
    ["Legalização", "/planos"],
    ["Cursos Online", "/"],
    ["Mentorias", "/"],
  ];
  const empresa = [
    ["Sobre a Cluny", "/"],
    ["Método Cluny", "/#metodo"],
    ["Cases de Sucesso", "/#cases"],
    ["Blog", "/#blog"],
    ["Materiais Gratuitos", "/#materiais"],
    ["Trabalhe Conosco", "/"],
  ];

  return (
    <footer style={{ background: "#1F3D2E", color: "#f4f1ec" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Coluna 1 — Marca */}
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="branco" height={36} />
            <p className="mt-5 max-w-xs" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: "rgba(244,241,236,0.75)", lineHeight: 1.6 }}>
              Clareza financeira para empresas que decidem com dados.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {[
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Youtube, href: "https://youtube.com" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} aria-label="Rede social" className="hover:opacity-70 transition-opacity">
                  <Icon size={20} color="#f4f1ec" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 — Soluções */}
          <div>
            <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, fontSize: 13, color: "#c48b30", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Soluções
            </h3>
            <ul className="space-y-2.5">
              {solucoes.map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="hover:opacity-70 transition-opacity" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "rgba(244,241,236,0.85)" }}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Empresa */}
          <div>
            <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, fontSize: 13, color: "#c48b30", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {empresa.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="hover:opacity-70 transition-opacity" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "rgba(244,241,236,0.85)" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Contato */}
          <div className="col-span-2 lg:col-span-1">
            <h3 style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, fontSize: 13, color: "#c48b30", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Contato
            </h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-center gap-2.5" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "rgba(244,241,236,0.85)" }}>
                <Phone size={14} color="#c48b30" /><span>+55 11 4000-0000</span>
              </li>
              <li className="flex items-center gap-2.5" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "rgba(244,241,236,0.85)" }}>
                <Mail size={14} color="#c48b30" /><span>contato@cluny.com.br</span>
              </li>
              <li className="flex items-center gap-2.5" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "rgba(244,241,236,0.85)" }}>
                <MapPin size={14} color="#c48b30" /><span>São Paulo / SP</span>
              </li>
            </ul>
            <a
              href="#cadastro"
              className="block w-full text-center"
              style={{
                background: "#005a54", color: "#f4f1ec",
                padding: "12px 20px", borderRadius: 8,
                fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, fontSize: 13,
              }}
            >
              Diagnóstico gratuito →
            </a>
          </div>
        </div>

        {/* Linha legal */}
        <div
          className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
          style={{ borderTop: "1px solid #cec9b8" }}
        >
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "rgba(244,241,236,0.5)" }}>
            © 2026 Cluny Gestão Empresarial · CNPJ 36.440.582/0001-74 · Todos os direitos reservados
          </span>
          <div className="flex items-center gap-4">
            <a href="/" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "rgba(244,241,236,0.5)" }} className="hover:opacity-80">Política de Privacidade</a>
            <span style={{ color: "rgba(244,241,236,0.3)" }}>·</span>
            <a href="/" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "rgba(244,241,236,0.5)" }} className="hover:opacity-80">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ Sticky CTA Bar (desktop) ============ */

/* ============ Social Proof Bar ============ */
export function SocialProofBar() {
  return (
    <div
      role="region"
      aria-label="Prova social"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        height: 36,
        background: "#005a54",
        color: "#f4f1ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: "0 16px",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span>+500 empresas atendidas</span>
      <span aria-hidden style={{ opacity: 0.5 }}>•</span>
      <span>12 anos de mercado</span>
      <span aria-hidden style={{ opacity: 0.5 }}>•</span>
      <span style={{ color: "#c48b30", fontWeight: 700 }}>NPS 94</span>
    </div>
  );
}
