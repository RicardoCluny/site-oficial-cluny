import { useState, useMemo, useEffect } from "react";
import { Logo } from "@/components/cluny/Logo";
import heroImg from "@/assets/hero-controladoria.jpg";
import blogTrib from "@/assets/blog-tributario.jpg";
import blogDre from "@/assets/blog-dre.jpg";
import blogHolding from "@/assets/blog-holding.jpg";
import faqIllu from "@/assets/faq-illustration.jpg";

const NAV = [
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#planos" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Comparativo", href: "#calculadora" },
  { label: "Cases", href: "#cases" },
  { label: "Conteúdo", href: "#conteudo" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1F3D2E] border-b border-[rgba(255,255,255,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Barra técnica superior */}
      <div className="bg-[#1A1A1A] border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-7 flex items-center justify-between gap-6">
          <span className="label-tech text-[#6e7b7c]">CRC-SP 2SP-000000 · OPERANDO DESDE 2013</span>
          <span className="label-tech text-[#6e7b7c] hidden md:block">SÃO PAULO · BRASIL</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2 group">
          <Logo size={28} color="#f4f1ec" />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const isActive = active === n.href.replace("#", "");
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative px-4 py-2 text-[13.5px] font-medium transition-all duration-200 border-b-2 ${
                  isActive
                    ? "text-[#f4f1ec] border-[#c48b30] opacity-100"
                    : "text-[#f4f1ec] border-transparent opacity-75 hover:opacity-100 hover:border-[#f4f1ec]"
                }`}
              >
                {n.label}
              </a>
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
          <span className={`block w-6 h-[2px] bg-[#f4f1ec] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#f4f1ec] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#f4f1ec] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgba(255,255,255,0.08)] px-6 py-6 flex flex-col gap-1 bg-[#1F3D2E] animate-fade-in">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-[15px] py-3 px-3 rounded-md hover:bg-[rgba(255,255,255,0.06)] text-[#f4f1ec]"
            >
              {n.label}
            </a>
          ))}
          <a href="#cadastro" onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
            Cadastre-se →
          </a>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section className="bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-16 lg:py-24 min-h-[640px] items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="label-mono text-[#005a54] mb-6">[ Cluny Gestão Empresarial · v.2026 ]</span>
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.96] text-[#1F3D2E]">
              Controladoria<br />
              financeira <span className="italic text-[#005a54]">operada como sistema.</span>
            </h1>
            <p className="mt-8 text-[18px] max-w-[620px] text-[#1A1A1A]/80 leading-relaxed">
              BPO Financeiro e Controladoria conduzidos com método técnico. Tiro o sócio da operação, devolvo leitura para a decisão.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#cadastro" className="btn-primary group">
                Solicite uma proposta
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#diagnostico" className="btn-secondary">Diagnóstico em 60s ↓</a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,90,84,0.08)] to-[rgba(196,139,48,0.05)] rounded-[4px] blur-2xl" />
            <img
              src={heroImg}
              alt="Painel de controladoria financeira: gráficos, KPIs e indicadores conduzidos com método Cluny"
              width={1024}
              height={1024}
              className="relative w-full h-auto rounded-[4px] shadow-[0_30px_80px_-30px_rgba(31,61,46,0.3)]"
            />
            <div className="absolute -bottom-3 -left-3 bg-[#1F3D2E] text-[#f4f1ec] px-4 py-3 rounded-[2px] hidden md:flex items-center gap-3">
              <span className="pulse-dot" />
              <span className="label-mono text-[#cec9b8]">DASHBOARD AO VIVO · 320 EMPRESAS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUESTIONS = [
  { q: "Qual o faturamento anual atual?", opts: ["Até R$ 2M", "R$ 2M – 8M", "R$ 8M – 30M", "Acima de R$ 30M"] },
  { q: "Você tem fluxo de caixa projetado para 90 dias?", opts: ["Não tenho", "Planilha manual", "Sim, mas desatualizado", "Sim, atualizado semanal"] },
  { q: "A diretoria toma decisões com base em quais indicadores?", opts: ["Intuição / saldo bancário", "Faturamento bruto", "DRE mensal básico", "Painel de KPIs gerenciais"] },
  { q: "Quem cuida hoje das rotinas financeiras?", opts: ["O sócio, na correria", "Assistente sem formação", "Analista financeiro", "Estrutura com controller"] },
  { q: "O que mais incomoda hoje?", opts: ["Não enxergo o resultado real", "Decisões lentas por falta de dado", "Operação financeira engasgada", "Quero tese, não relatório"] },
];

export function Diagnostico() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const done = scores.length === 5;
  const total = scores.reduce((a, b) => a + b, 0);
  const score = Math.round((total / 20) * 100);
  const reco = score <= 45 ? "Diagnóstico técnico inicial" : score <= 70 ? "BPO Financeiro" : "BPO + Controladoria";

  const select = (i: number) => {
    const next = [...scores, i + 1];
    setScores(next);
    if (next.length < 5) setTimeout(() => setStep(step + 1), 220);
  };

  const reset = () => { setScores([]); setStep(0); };
  const r = 70, c = 2 * Math.PI * r;

  return (
    <section id="diagnostico" className="bg-[#1F3D2E] text-[#f4f1ec] relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -top-10 right-0 font-display italic text-[280px] lg:text-[420px] leading-none opacity-[0.04] pointer-events-none select-none">60s.</div>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 relative">
        <div>
          <span className="label-mono text-[#c48b30]">· Diagnóstico · 60 segundos</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] mt-6 text-[#f4f1ec]">
            Em 5 perguntas,<br /><span className="italic text-[#cec9b8]">eu indico</span><br />o caminho técnico.
          </h2>
          <p className="mt-6 text-[#f4f1ec]/75 max-w-md">Sem cadastro. Sem e-mail. Respondo aqui mesmo qual frente cabe à sua operação — e por quê.</p>
          <div className="mt-10 flex gap-1.5">
            {[0,1,2,3,4].map((i) => (
              <div key={i} className="flex-1 h-1 rounded-sm transition-all duration-500" style={{
                background: i < scores.length ? "#c48b30" : i === step && !done ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)",
              }} />
            ))}
          </div>
          <div className="mt-4 label-mono text-[#cec9b8]">{done ? "DIAGNÓSTICO PRONTO ✓" : `PERGUNTA 0${step+1} DE 05`}</div>
        </div>

        <div className="rounded-[4px] p-8 lg:p-10 min-h-[480px] flex flex-col" style={{ background: "rgba(244,241,236,0.06)", border: "1px solid rgba(244,241,236,0.18)" }}>
          {!done ? (
            <>
              <div className="label-mono text-[#cec9b8] mb-6">Q{step+1}</div>
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
              <div className="flex items-center gap-8 mb-8">
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
                <div>
                  <div className="label-mono text-[#c48b30] mb-2">RECOMENDAÇÃO</div>
                  <h3 className="font-display text-[28px] text-[#f4f1ec]">{reco}</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a href="#cadastro" className="btn-primary" style={{ background: "#c48b30" }}>Solicite uma proposta →</a>
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
  {
    n: "01",
    t: "Imersão",
    sub: "Leitura inicial",
    desc: "Mergulho no contrato social, regime fiscal, plano de contas e rotinas em uso. Mapeio onde a operação sangra antes de propor qualquer movimento.",
    entregas: ["Mapa de responsabilidades", "Diagnóstico fiscal"],
    dias: "5 dias",
  },
  {
    n: "02",
    t: "Estruturação",
    sub: "Plano de contas vivo",
    desc: "Reconstruo o plano de contas e as réguas de classificação para que cada lançamento conte a verdade do negócio — não a do sistema.",
    entregas: ["Plano de contas gerencial", "Régua de classificação"],
    dias: "10 dias",
  },
  {
    n: "03",
    t: "Operação",
    sub: "Régua de caixa",
    desc: "Coloco a operação financeira para rodar com método: a pagar, a receber, conciliação e fluxo projetado de 90 dias com governança diária.",
    entregas: ["Fluxo de caixa 90 dias", "Conciliação diária"],
    dias: "15 dias",
  },
  {
    n: "04",
    t: "Leitura",
    sub: "Painel de KPIs",
    desc: "Construo o painel de indicadores sob medida e a DRE gerencial comentada — a leitura técnica que orienta a decisão do sócio.",
    entregas: ["Painel KPIs sob medida", "DRE gerencial comentada"],
    dias: "10 dias",
  },
  {
    n: "05",
    t: "Continuidade",
    sub: "Plano 90/365",
    desc: "Entrego o plano operacional de 90 e 365 dias e mantenho a régua viva — com revisões trimestrais de tese junto ao sócio.",
    entregas: ["Plano 90/365", "Revisão trimestral de tese"],
    dias: "Contínuo",
  },
];

export function Metodo() {
  const [active, setActive] = useState(0);
  const cur = ETAPAS[active];

  return (
    <section id="metodo" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <span className="label-mono text-[#005a54]">· Método Cluny</span>
            <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
              Como leio<br /><span className="italic text-[#005a54]">/ uma empresa em</span><br />5 etapas.
            </h2>
          </div>
          <p className="text-[16px] text-[#1A1A1A]/80 leading-relaxed max-w-md">
            Cada empresa que entra na Cluny passa pelo mesmo protocolo. Não é checklist — é régua técnica viva. Em 35 a 45 dias, devolvo um relatório operacional e um plano de 90/365 dias.
          </p>
        </div>

        {/* Timeline interativa */}
        <div className="relative">
          {/* Linha contínua de progresso */}
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
                    ETAPA {et.n}
                  </div>
                  <div className={`font-display text-[18px] mt-1 transition-colors ${i === active ? "text-[#1F3D2E]" : "text-[#1A1A1A]/70"}`}>
                    {et.t}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel da etapa ativa */}
        <div
          key={active}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-0 border-tech overflow-hidden animate-fade-in"
        >
          <div className="lg:col-span-5 bg-[#1F3D2E] text-[#f4f1ec] p-10 lg:p-12 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="label-mono text-[#c48b30]">ETAPA · {cur.n} / 05</span>
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
            <div className="mt-10 pt-8 border-t border-[rgba(26,26,26,0.1)]">
              <div className="label-mono text-[#005a54] mb-4">ENTREGAS DESTA ETAPA</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cur.entregas.map((e) => (
                  <div key={e} className="flex items-center gap-3 p-4 bg-[rgba(0,90,84,0.04)] rounded-[2px] border border-[rgba(0,90,84,0.1)]">
                    <span className="w-8 h-8 rounded-full bg-[#005a54] text-[#f4f1ec] flex items-center justify-center text-[12px]">→</span>
                    <span className="text-[14px] text-[#1F3D2E] font-medium">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="btn-secondary btn-primary-sm disabled:opacity-30"
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
  const PlanCard = ({ dark, tag, camada, price, tagline, escopo, items, indicado, nota, cta }: any) => (
    <div
      className={`group relative p-8 lg:p-10 flex flex-col transition-all duration-500 cursor-pointer rounded-[4px]
        ${dark ? "bg-[#1F3D2E] text-[#f4f1ec]" : "bg-[#f4f1ec] text-[#1A1A1A]"}
        border border-[rgba(26,26,26,0.1)]
        hover:scale-[1.02] hover:shadow-[0_30px_80px_-30px_rgba(31,61,46,0.4)]
        hover:border-[#c48b30]
      `}
    >
      {/* Glow effect on hover */}
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
        <div className="font-mono-tech text-[36px] lg:text-[44px] leading-none mb-2">{price}</div>
        <div className="label-mono opacity-60 mb-6">/MÊS · A PARTIR DE</div>
        <h3 className="font-display text-[26px] mb-3" style={{ color: dark ? "#f4f1ec" : "#1F3D2E" }}>{tagline}</h3>
        <p className="text-[14px] opacity-80 mb-8 leading-relaxed">{escopo}</p>
        <div className="space-y-2.5 mb-8">
          {items.map((it: string) => (
            <div key={it} className="flex gap-3 text-[14px]"><span style={{ color: dark ? "#c48b30" : "#005a54" }}>→</span>{it}</div>
          ))}
        </div>
        <div className="text-[12px] opacity-70 pt-4 mb-3 border-t" style={{ borderColor: dark ? "rgba(244,241,236,0.15)" : "rgba(26,26,26,0.1)" }}>
          <div className="label-mono mb-2">INDICADO PARA</div>
          {indicado.map((ix: string) => <div key={ix}>· {ix}</div>)}
        </div>
        <div className="text-[12px] italic opacity-60 mb-6">{nota}</div>
        <button
          className="btn-primary mt-auto group/btn relative overflow-hidden transition-all duration-300 group-hover:scale-[1.03]"
          style={dark ? { background: "#c48b30", color: "#1F3D2E" } : {}}
        >
          <span className="relative z-10">{cta}</span>
          <span className="relative z-10 transition-transform group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );

  return (
    <section id="planos" className="py-24 lg:py-32 bg-[#ece7dc] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] max-w-2xl">
            Dois serviços. <br /><span className="italic text-[#005a54]">Mesma régua técnica.</span>
          </h2>
          <span className="label-mono text-[#6e7b7c]">SERVIÇO 01 → SERVIÇO 02</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlanCard
            tag="SERVIÇO 01" camada="CAMADA · EXECUÇÃO"
            price="R$ 4.800"
            tagline="BPO Financeiro: a operação financeira conduzida com método."
            escopo="Para empresas que precisam tirar o sócio da operação financeira sem terceirizar o critério."
            items={["Contas a pagar e a receber (rotina diária)","Conciliação bancária e cartões","Emissão de NF e cobrança ativa","Fluxo de caixa diário e projetado 90 dias","Gestor de conta dedicado","Reunião quinzenal de operação (60 min)","Integração com ERP do cliente"]}
            indicado={["Faturamento R$ 2M – 15M","Sem analista financeiro dedicado","Sócio ainda na operação"]}
            nota="Não substitui Controladoria. Foco em execução, não em tese."
            cta="Quero o BPO Financeiro"
          />
          <PlanCard dark
            tag="SERVIÇO 02" camada="CAMADA · TESE"
            price="R$ 7.200"
            tagline="Controladoria: inteligência financeira que orienta a decisão."
            escopo="Para empresas que já têm operação rodando e precisam de leitura técnica para decidir com tese — não com intuição."
            items={["Painel de KPIs sob medida (gerencial)","DRE gerencial mensal comentado","Análise de margem por linha / cliente / projeto","Orçamento anual com revisão trimestral","Modelagem de cenários (3 horizontes)","Reunião mensal com o sócio (90 min)","Sessão trimestral de tese (3 horas)"]}
            indicado={["Faturamento R$ 8M+","Estrutura financeira já organizada","Sócio buscando tese, não relatório"]}
            nota="Não executa rotina financeira. Pressupõe operação saudável — ou contratação conjunta com BPO."
            cta="Quero a Controladoria"
          />
        </div>
        <div className="mt-6 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:scale-[1.01] cursor-pointer" style={{ background: "#c48b30", color: "#1F3D2E" }}>
          <div className="label-mono">· COMBO 01 + 02 — BPO + Controladoria em pacote integrado · 15% de desconto</div>
          <a href="#calculadora" className="btn-primary" style={{ background: "#1F3D2E", color: "#f4f1ec" }}>Calcular meu combo →</a>
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-0 border-tech my-24">
        <div className="lg:col-span-5 bg-[#1F3D2E] text-[#f4f1ec] p-10 lg:p-14 min-h-[520px] flex flex-col">
          <span className="label-mono text-[#c48b30]">· Sobre · /02</span>
          <h2 className="font-display text-[44px] lg:text-[56px] leading-[1.05] mt-8 text-[#f4f1ec] flex-1">
            Há 12 anos<br /><span className="italic text-[#cec9b8]">lendo empresas.</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[rgba(244,241,236,0.18)]">
            <div>
              <div className="label-mono text-[#cec9b8] mb-2">FUNDAÇÃO</div>
              <div className="font-mono-tech text-[20px]">2013</div>
            </div>
            <div>
              <div className="label-mono text-[#cec9b8] mb-2">EQUIPE</div>
              <div className="font-mono-tech text-[20px]">34 profissionais</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 bg-[#f4f1ec] p-10 lg:p-14">
          <span className="label-mono text-[#005a54]">· Manifesto</span>
          <p className="font-display text-[24px] lg:text-[28px] text-[#1F3D2E] leading-snug mt-6">
            A Cluny nasceu de uma <em className="italic">insatisfação técnica</em>: contadores que entregavam guia de imposto, mas nunca explicavam o que os números diziam. Decidi inverter a ordem.
          </p>
          <p className="text-[15.5px] text-[#1A1A1A]/85 mt-6 leading-relaxed">
            Em vez de processar obrigação fiscal, comecei pela leitura técnica do negócio. O que a empresa faz, como cobra, onde sangra margem, qual decisão depende de qual número.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-10 border-tech">
            {[
              ["01", "Critério", "Decisão técnica antes de comercial."],
              ["02", "Clareza", "Linguagem que o sócio entende."],
              ["03", "Continuidade", "Operação que sobrevive ao mês."],
            ].map(([n, t, d]) => (
              <div key={n} className="p-5 border-r border-b md:border-b-0 border-[rgba(26,26,26,0.1)] last:border-r-0">
                <div className="label-mono text-[#005a54] mb-2">{n} · {t}</div>
                <div className="text-[13px] text-[#1A1A1A]/80">{d}</div>
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
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Cases <span className="italic text-[#6e7b7c] text-[28px]">/ registros operacionais</span>
          </h2>
          <a href="#" className="label-mono text-[#005a54]">VER TODOS 14 →</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article className="lg:col-span-7 bg-[#005a54] text-[#f4f1ec] p-10 lg:p-14 min-h-[480px] flex flex-col">
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="label-mono px-2 py-1" style={{ border: "1px solid #c48b30", color: "#c48b30" }}>CASE EM DESTAQUE</span>
              <span className="label-mono text-[#cec9b8]">· FINANÇAS · 18 MESES</span>
            </div>
            <h3 className="font-display text-[34px] lg:text-[42px] leading-tight">
              De gestão por intuição a tese técnica em <em className="italic text-[#cec9b8]">seis trimestres.</em>
            </h3>
            <p className="text-[15px] mt-6 opacity-85 max-w-2xl">
              Estúdio de arquitetura, 38 colaboradores. Entrou na Cluny sem DRE gerencial, sem painel de KPIs e com margem oscilando 9 pontos entre meses.
            </p>
            <div className="mt-auto grid grid-cols-3 gap-6 pt-10 border-t border-[rgba(244,241,236,0.18)]">
              {[["MARGEM","+11pp"],["CARGA TRIBUTÁRIA","-22%"],["CICLO FINANCEIRO","-14 dias"]].map(([k,v])=>(
                <div key={k}>
                  <div className="label-mono text-[#cec9b8] mb-2">{k}</div>
                  <div className="font-mono-tech text-[24px]">{v}</div>
                </div>
              ))}
            </div>
          </article>
          <div className="lg:col-span-5 grid grid-rows-2 gap-6">
            {[
              { tag: "ENGENHARIA · CONTROLADORIA", t: "Reestruturação tributária pré-aquisição", m: "R$ 480k em tributos diferidos legalmente" },
              { tag: "TECNOLOGIA · BPO", t: "Régua de caixa e cobrança em 90 dias", m: "Inadimplência de 14% para 3,2%" },
            ].map((c) => (
              <article key={c.t} className="border-tech p-7 lg:p-8 flex flex-col bg-[#f4f1ec]">
                <span className="label-mono text-[#005a54] mb-4">{c.tag}</span>
                <h4 className="font-display text-[22px] text-[#1F3D2E] mb-4 flex-1">{c.t}</h4>
                <div className="font-mono-tech text-[15px] text-[#005a54] pt-4 border-t border-[rgba(26,26,26,0.1)]">{c.m}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-tech">
          {["ESTÚDIO ÍMPAR","TAVARES ENG.","KHOURY PART.","NORDA & CIA","VEREDA TECH","MERIDIO LAB"].map((l) => (
            <div key={l} className="font-display text-[14px] text-[#6e7b7c] text-center py-6 border-r border-b md:border-b-0 border-[rgba(26,26,26,0.1)] last:border-r-0">{l}</div>
          ))}
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
            Clientes <span className="italic text-[#6e7b7c] text-[28px]">/ registros</span>
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
    // Encargos CLT (~estimativa Brasil): INSS patronal 20% + FGTS 8% + 13º + férias + 1/3 + RAT/SAT/Sistema S ~5,8%
    const encargos = Math.round(salBase * 0.72);
    const beneficios = Math.round(800 + salBase * 0.08); // VR, VT, plano de saúde
    const estrutura = Math.round(450); // posto de trabalho, software, equipamento
    const rescisaoMes = Math.round(salBase * 0.12); // provisão multa + aviso
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
    { t: "Escalabilidade", d: "Crescer significa contratar mais — e gerir mais gente." },
    { t: "Erro humano", d: "Sem segunda camada de revisão técnica nas conciliações." },
    { t: "Risco trabalhista", d: "Passivo trabalhista entra no balanço, processos podem aparecer anos depois." },
  ];

  const beneficiosBpo = [
    { t: "Time multidisciplinar", d: "Analista, controller, contador e tributarista em um único contrato." },
    { t: "Cobertura contínua", d: "Operação rodando 12 meses por ano, sem férias, sem licenças, sem rotatividade." },
    { t: "Método consolidado", d: "Régua técnica aplicada do dia 1 — sem curva de aprendizado." },
    { t: "Sem passivo trabalhista", d: "Contrato de prestação de serviços, zero risco trabalhista." },
    { t: "Escalabilidade plana", d: "Faturamento dobrou? O contrato se ajusta, você não precisa contratar." },
    { t: "Tecnologia inclusa", d: "ERP, automações e dashboards no escopo, sem investimento adicional." },
  ];

  return (
    <section id="calculadora" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <span className="label-mono text-[#005a54]">· Comparativo · CLT vs BPO Financeiro</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Quanto custa, de fato, <span className="italic text-[#005a54]">um financeiro CLT</span> dentro da sua empresa?
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Simule um analista financeiro CLT e compare com o custo de terceirizar o financeiro com a Cluny. A diferença vai além do salário.
          </p>
        </div>

        {/* Controles */}
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

        {/* Comparativo lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-tech">
          {/* CLT */}
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
              {dores.slice(0,4).map((d) => (
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

          {/* BPO */}
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
              {beneficiosBpo.slice(0,4).map((b) => (
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

        {/* Resultado da economia */}
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
          <a href="#cadastro" className="btn-primary group" style={{ background: "#1F3D2E", color: "#f4f1ec" }}>
            Solicite uma proposta
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
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
    <section id="conteudo" className="py-24 lg:py-32 bg-[#ece7dc] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Conteúdo <span className="italic text-[#6e7b7c] text-[28px]">/ últimas edições</span>
          </h2>
          <a href="#" className="label-mono text-[#005a54]">VER TODAS →</a>
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
                  {p.cat}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="label-mono text-[#005a54] mb-4">{p.ed} · {p.min}</div>
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

const FAQS = [
  ["A Cluny atende empresa de qualquer porte?", "Não. Atendo empresas a partir de R$ 2M/ano de faturamento. Abaixo disso, o método não se justifica economicamente — recomendo contadores de menor porte."],
  ["Vocês migram a contabilidade do meu contador atual?", "Sim, é o cenário mais comum. A transição leva 30 a 60 dias e segue um protocolo próprio: rebatimento de saldos, validação fiscal, reabertura do plano de contas."],
  ["O que diferencia a Cluny de uma contabilidade tradicional?", "A leitura. A contabilidade tradicional gera relatório; a Cluny entrega tese. Você recebe o número junto com a leitura técnica do que ele significa para a decisão do mês."],
  ["Há contrato mínimo?", "Sim. 12 meses, com possibilidade de revisão técnica a cada trimestre. O período mínimo existe porque o método precisa de tempo para se acomodar à operação."],
  ["Os sócios falam direto com você ou com um time?", "Os sócios falam diretamente comigo nas reuniões trimestrais de tese. No dia a dia, há um gestor de conta dedicado — sempre com acesso direto a mim por canal técnico."],
  ["Por que terceirizar o financeiro ao invés de contratar CLT?", "Por previsibilidade. CLT envolve encargos, rotatividade, férias, passivo trabalhista e curva de aprendizado. O BPO entrega time completo, contrato único e custo plano."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)] bg-[#f4f1ec]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Coluna esquerda: título + ilustração */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="label-mono text-[#005a54]">· FAQ</span>
            <h2 className="font-display text-[40px] lg:text-[52px] mt-4 leading-[1.05] text-[#1F3D2E]">
              Perguntas <em className="italic text-[#005a54]">técnicas</em><br />que ouvi neste mês.
            </h2>
            <p className="text-[15px] text-[#1A1A1A]/75 mt-6 max-w-md leading-relaxed">
              Reuni as dúvidas mais frequentes de sócios e diretores antes de iniciar o método. Se não encontrar a sua, escreva diretamente.
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

          {/* Coluna direita: perguntas */}
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
                      style={{ maxHeight: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
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
  return (
    <section id="cadastro" className="py-24 lg:py-32 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f4f1ec] border-tech">
          <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[rgba(26,26,26,0.1)]">
            <span className="label-mono text-[#005a54]">· Solicite uma proposta</span>
            <h2 className="font-display text-[40px] lg:text-[52px] leading-[1.05] mt-6 text-[#1F3D2E]">
              Inicie pela <em className="italic text-[#005a54]">conversa.</em>
            </h2>
            <p className="text-[15.5px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
              Respondo pessoalmente, por escrito, em até 1 dia útil. Sem funil de qualificação. Sem SDR. Apenas leitura técnica inicial.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-0 border-tech font-mono-tech text-[12px]">
              {[
                ["CONTATO","contato@cluny.com.br"],
                ["TELEFONE","+55 11 4000-0000"],
                ["ENDEREÇO","Av. Faria Lima, 0000 · São Paulo / SP"],
                ["HORÁRIO","Seg-Sex · 09h às 18h"],
              ].map(([k,v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] p-4 border-b border-[rgba(26,26,26,0.1)] last:border-b-0">
                  <span className="text-[#6e7b7c]">{k}</span>
                  <span className="text-[#1A1A1A]">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-10 lg:p-14">
            {sent ? (
              <div className="h-full flex flex-col justify-center items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#f4f1ec]" style={{ background: "#005a54" }}>✓</div>
                <h3 className="font-display text-[32px] text-[#1F3D2E]">Mensagem registrada.</h3>
                <p className="text-[15px] text-[#1A1A1A]/80 max-w-md">Recebi sua solicitação. Respondo pessoalmente em até 1 dia útil, por escrito.</p>
              </div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}} className="space-y-6">
                {[
                  { n: "nome", l: "Nome completo" },
                  { n: "email", l: "E-mail corporativo", t: "email" },
                  { n: "empresa", l: "Empresa" },
                  { n: "tel", l: "Telefone" },
                ].map((f) => (
                  <div key={f.n}>
                    <label className="label-mono text-[#6e7b7c] block mb-2">{f.l}</label>
                    <input required type={f.t || "text"} name={f.n} className="w-full bg-transparent border-b border-[rgba(26,26,26,0.2)] py-2 outline-none focus:border-[#005a54] text-[15px]" />
                  </div>
                ))}
                <div>
                  <label className="label-mono text-[#6e7b7c] block mb-2">Interesse principal</label>
                  <select required className="w-full bg-transparent border-b border-[rgba(26,26,26,0.2)] py-2 outline-none focus:border-[#005a54] text-[15px]">
                    <option value="">Selecione...</option>
                    <option>BPO Financeiro</option>
                    <option>Controladoria</option>
                    <option>BPO + Controladoria (Combo)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-4">Solicite uma proposta →</button>
                <p className="text-[12px] text-[#6e7b7c]">Resposta em até 1 dia útil. Seus dados não são compartilhados.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f4f1ec] py-8 border-t border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Logo size={22} color="#6e7b7c" />
        <span className="font-mono-tech text-[11px] text-[#6e7b7c]">© 2026 · CLUNY GESTÃO EMPRESARIAL · CRC-SP 2SP-000000</span>
        <span className="font-mono-tech text-[11px] text-[#6e7b7c]">v.2026.05 · BUILD 0511</span>
      </div>
    </footer>
  );
}

// Compat: mantém export Atuacao caso seja referenciado em outro lugar (no-op)
export function Atuacao() { return null; }
