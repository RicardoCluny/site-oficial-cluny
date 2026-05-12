import { useState, useMemo } from "react";
import { Logo } from "@/components/cluny/Logo";

const NAV = [
  { label: "Atuação", href: "#atuacao" },
  { label: "Planos", href: "#planos" },
  { label: "Método", href: "#metodo" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Cases", href: "#cases" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#f4f1ec]/90 backdrop-blur border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <a href="#" className="justify-self-start"><Logo size={28} /></a>
        <nav className="hidden md:flex justify-self-center bg-[rgba(26,26,26,0.04)] rounded-[2px] p-1">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="px-3 py-1.5 text-[13px] text-[#1A1A1A] hover:text-[#005a54] rounded-[2px] transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4 justify-self-end">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="label-mono text-[#6e7b7c]">STATUS · OPERANDO</span>
          </div>
          <a href="#cadastro" className="btn-primary btn-primary-sm">Cadastre-se</a>
        </div>
        <button className="md:hidden justify-self-end label-mono" onClick={() => setOpen(!open)}>
          {open ? "FECHAR" : "MENU"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[rgba(26,26,26,0.1)] px-6 py-4 flex flex-col gap-3 bg-[#f4f1ec]">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm">{n.label}</a>
          ))}
          <a href="#cadastro" onClick={() => setOpen(false)} className="btn-primary btn-primary-sm self-start">Cadastre-se</a>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section className="bg-[#f4f1ec] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 pb-6 border-b border-[rgba(26,26,26,0.1)]">
          {[
            ["INDEX", "/ HOME"],
            ["REGISTRO", "CRC-SP 2SP-000000"],
            ["ATUALIZADO", "11.MAI.2026"],
            ["LATITUDE", "-23.5505, -46.6333"],
          ].map(([k, v]) => (
            <div key={k} className="font-mono-tech text-[11px] flex flex-col gap-1">
              <span className="text-[#6e7b7c]">{k}</span>
              <span className="text-[#1A1A1A]">{v}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 lg:py-24 min-h-[640px]">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="label-mono text-[#005a54] mb-6">[ Cluny Gestão Empresarial · v.2026 ]</span>
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[92px] leading-[0.96] text-[#1F3D2E]">
              Gestão técnica<br />
              operada como sistema. <span className="italic text-[#005a54]"></span>
            </h1>
            <p className="mt-8 text-[18px] max-w-[640px] text-[#1A1A1A]/80 leading-relaxed">
              Contabilidade, BPO Financeiro, Controladoria e legalização em uma única operação. Quatro frentes técnicas, um único método de leitura.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#cadastro" className="btn-primary">Cadastre-se</a>
              <a href="#diagnostico" className="btn-secondary">Diagnóstico em 60s ↓</a>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-1 gap-0 border-tech">
            {[
              { label: "MÉTRICA 01", val: "+12 anos", desc: "de mercado consolidado", dark: true },
              { label: "MÉTRICA 02", val: "320", desc: "empresas atendidas em todo o país" },
              { label: "MÉTRICA 03", val: "R$ 1.2M", desc: "economizados em tributos 2024" },
              { label: "MÉTRICA 04", val: "98%", desc: "de retenção de clientes" },
            ].map((m, i) => (
              <div key={i} className={`p-6 border-b border-[rgba(26,26,26,0.1)] last:border-b-0 ${m.dark ? "bg-[#005a54] text-[#f4f1ec]" : "bg-[#f4f1ec]"}`}>
                <div className="label-mono opacity-70 mb-3">{m.label}</div>
                <div className="font-mono-tech text-[28px] lg:text-[32px] leading-none mb-2">{m.val}</div>
                <div className="text-[13px] opacity-80">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const BUS = [
  { id: "BU-01", area: "Finanças", title: "Gestão financeira sob método", tagline: "Decisão técnica antes da intuição.", desc: "Estruturo o fluxo de caixa, custos e indicadores para que a sua decisão pare de depender da intuição.", entregas: ["DRE gerencial mensal", "Painel de KPIs", "Plano orçamentário"] },
  { id: "BU-02", area: "Contabilidade", title: "Contabilidade consultiva", tagline: "Conformidade com inteligência.", desc: "Conduzo a contabilidade da sua empresa de forma técnica, fiscal e estratégica — não apenas conformidade, mas inteligência tributária.", entregas: ["Apuração mensal", "Planejamento tributário", "Suporte ao sócio"] },
  { id: "BU-03", area: "Legalização", title: "Constituição e regularização", tagline: "Estrutura societária com rigor.", desc: "Abro, regularizo e ajusto a estrutura societária do seu negócio com o rigor que o crescimento exige.", entregas: ["Abertura de empresa", "Alterações contratuais", "Licenças e alvarás"] },
  { id: "BU-04", area: "Educação Corporativa", title: "Capacitação técnica aplicada", tagline: "Equipe que lê o próprio negócio.", desc: "Formo a equipe interna e os sócios em finanças, gestão e leitura de demonstrativos — para que a empresa cresça com método.", entregas: ["Mentorias individuais", "Cursos in-company", "Trilhas para sócios"] },
];

export function Atuacao() {
  return (
    <section id="atuacao" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E]">
            Atuação <span className="italic text-[#6e7b7c] text-[28px]">/ 4 módulos</span>
          </h2>
          <span className="label-mono text-[#6e7b7c]">BU-01 → BU-04</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-tech">
          {BUS.map((bu) => (
            <article key={bu.id} className="p-7 border-r border-b lg:border-b-0 border-[rgba(26,26,26,0.1)] last:border-r-0 min-h-[380px] flex flex-col bg-[#f4f1ec]">
              <div className="flex items-center gap-2 mb-6">
                <span className="pulse-dot" />
                <span className="label-mono text-[#005a54]">{bu.id} · {bu.area}</span>
              </div>
              <h3 className="font-display text-[24px] lg:text-[26px] text-[#1F3D2E] leading-tight">{bu.title}</h3>
              <p className="font-display italic text-[14px] text-[#6e7b7c] mt-2 mb-5">{bu.tagline}</p>
              <p className="text-[13.5px] text-[#1A1A1A]/80 leading-relaxed flex-1">{bu.desc}</p>
              <div className="mt-6 pt-4 border-t border-[rgba(26,26,26,0.1)] flex justify-between items-center">
                <span className="label-mono text-[#6e7b7c]">{bu.entregas.length} ENTREGÁVEIS</span>
                <span className="label-mono text-[#005a54]">VER →</span>
              </div>
              <div className="mt-3 space-y-1">
                {bu.entregas.map((e) => (
                  <div key={e} className="text-[12px] text-[#1A1A1A]/70 flex gap-2"><span className="text-[#005a54]">→</span>{e}</div>
                ))}
              </div>
            </article>
          ))}
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
              <div key={i} className="flex-1 h-1 rounded-sm" style={{
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
                  <text x="90" y="95" textAnchor="middle" className="font-mono-tech" fill="#f4f1ec" fontSize="32" fontFamily="JetBrains Mono">{score}</text>
                  <text x="90" y="115" textAnchor="middle" fill="#cec9b8" fontSize="9" fontFamily="JetBrains Mono">MATURIDADE</text>
                </svg>
                <div>
                  <div className="label-mono text-[#c48b30] mb-2">RECOMENDAÇÃO</div>
                  <h3 className="font-display text-[28px] text-[#f4f1ec]">{reco}</h3>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-8">
                {scores.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="label-mono text-[#cec9b8]">Q{i+1}</div>
                    <div className="flex flex-col gap-1">
                      {[1,2,3,4].map(n => (
                        <span key={n} className="w-2 h-2 rounded-full" style={{ background: n <= s ? "#c48b30" : "rgba(244,241,236,0.18)" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a href="#cadastro" className="btn-primary" style={{ background: "#c48b30" }}>Quero esta proposta →</a>
                <button className="btn-secondary" style={{ borderColor: "#f4f1ec", color: "#f4f1ec" }}>↓ Baixar relatório PDF</button>
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
  { n: "01", t: "Societário", i: "Contrato social, quadro de sócios", e: "Mapa de responsabilidades" },
  { n: "02", t: "Fiscal", i: "Regime, obrigações, riscos", e: "Diagnóstico tributário" },
  { n: "03", t: "Contábil", i: "Plano de contas atual", e: "Plano de contas vivo" },
  { n: "04", t: "Financeiro", i: "Extratos, contas a pagar/receber", e: "Régua de caixa" },
  { n: "05", t: "Gerencial", i: "Indicadores em uso", e: "Painel de KPIs próprios" },
  { n: "06", t: "Continuidade", i: "Tese do sócio, horizonte", e: "Plano de 90/365 dias" },
];

export function Metodo() {
  return (
    <section id="metodo" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <span className="label-mono text-[#005a54]">· Método</span>
            <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
              Como leio<br /><span className="italic text-[#005a54]">/ uma empresa em</span><br />6 etapas.
            </h2>
          </div>
          <p className="text-[16px] text-[#1A1A1A]/80 leading-relaxed max-w-md">
            Cada empresa que entra na Cluny passa pelo mesmo protocolo. Não é checklist — é régua técnica. Em 35 a 45 dias, devolvo um relatório operacional e um plano de 90/365 dias.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-tech">
          {ETAPAS.map((et, i) => (
            <div key={et.n} className="p-6 border-r border-b border-[rgba(26,26,26,0.1)] last:border-r-0 min-h-[260px] flex flex-col" style={{ background: i === 0 ? "rgba(0,90,84,0.05)" : "#f4f1ec" }}>
              <div className="label-mono mb-4" style={{ color: i < 3 ? "#005a54" : "#c48b30" }}>ETAPA · {et.n}</div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono-tech text-[13px] mb-4" style={{ border: `1px solid ${i < 3 ? "#005a54" : "#c48b30"}`, color: i < 3 ? "#005a54" : "#c48b30" }}>{et.n}</div>
              <h4 className="font-display text-[20px] text-[#1F3D2E] mb-4">{et.t}</h4>
              <div className="text-[12px] mt-auto">
                <div className="label-mono text-[#6e7b7c] mb-1">INPUT</div>
                <div className="text-[#1A1A1A]/80 mb-3">{et.i}</div>
                <div className="label-mono text-[#005a54] mb-1">ENTREGA →</div>
                <div className="text-[#1A1A1A]">{et.e}</div>
              </div>
            </div>
          ))}
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
    <div className={`p-8 lg:p-10 border-tech flex flex-col ${dark ? "bg-[#1F3D2E] text-[#f4f1ec]" : "bg-[#f4f1ec] text-[#1A1A1A]"}`}>
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
      <div className="text-[12px] opacity-70 border-t border-[rgba(244,241,236,0.15)] pt-4 mb-3" style={{ borderColor: dark ? "rgba(244,241,236,0.15)" : "rgba(26,26,26,0.1)" }}>
        <div className="label-mono mb-2">INDICADO PARA</div>
        {indicado.map((ix: string) => <div key={ix}>· {ix}</div>)}
      </div>
      <div className="text-[12px] italic opacity-60 mb-6">{nota}</div>
      <button className="btn-primary mt-auto" style={dark ? { background: "#f4f1ec", color: "#1F3D2E" } : {}}>{cta}</button>
    </div>
  );

  return (
    <section id="planos" className="py-24 lg:py-32 bg-[#ece7dc] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mb-16 max-w-3xl">
          Dois serviços. <br /><span className="italic text-[#005a54]">Mesma régua técnica.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlanCard
            tag="SERVIÇO 01" camada="CAMADA · EXECUÇÃO"
            price="R$ 4.800"
            tagline="A operação financeira da sua empresa, conduzida com método."
            escopo="Para empresas que precisam tirar o sócio da operação financeira sem terceirizar o critério."
            items={["Contas a pagar e a receber (rotina diária)","Conciliação bancária e cartões","Emissão de NF e cobrança ativa","Fluxo de caixa diário e projetado 90 dias","Gestor de conta dedicado","Reunião quinzenal de operação (60 min)","Integração com ERP do cliente"]}
            indicado={["Faturamento R$ 2M – 15M","Sem analista financeiro dedicado","Sócio ainda na operação"]}
            nota="Não substitui Controladoria. Foco em execução, não em tese."
            cta="Quero o BPO Financeiro →"
          />
          <PlanCard dark
            tag="SERVIÇO 02" camada="CAMADA · TESE"
            price="R$ 7.200"
            tagline="A inteligência financeira que orienta a decisão do sócio."
            escopo="Para empresas que já têm operação rodando e precisam de leitura técnica para decidir com tese — não com intuição."
            items={["Painel de KPIs sob medida (gerencial)","DRE gerencial mensal comentado","Análise de margem por linha / cliente / projeto","Orçamento anual com revisão trimestral","Modelagem de cenários (3 horizontes)","Reunião mensal com o sócio (90 min)","Sessão trimestral de tese (3 horas)"]}
            indicado={["Faturamento R$ 8M+","Estrutura financeira já organizada","Sócio buscando tese, não relatório"]}
            nota="Não executa rotina financeira. Pressupõe operação saudável — ou contratação conjunta com BPO."
            cta="Quero a Controladoria →"
          />
        </div>
        <div className="mt-6 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: "#c48b30", color: "#1F3D2E" }}>
          <div className="label-mono">· COMBO 01 + 02 — BPO + Controladoria em pacote integrado · 15% de desconto</div>
          <button className="btn-primary" style={{ background: "#1F3D2E", color: "#f4f1ec" }}>Calcular meu combo →</button>
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
            Em vez de processar obrigação fiscal, comecei pela leitura técnica do negócio. O que a empresa faz, como cobra, onde sangra margem, qual decisão depende de qual número. A obrigação acessória virou consequência, não centro.
          </p>
          <p className="text-[15.5px] text-[#1A1A1A]/85 mt-4 leading-relaxed">
            Hoje, conduzo um time de 34 profissionais e 320 empresas. A régua continua igual: critério antes de comercial, clareza antes de complexidade.
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
              { tag: "ENGENHARIA · CONTABILIDADE", t: "Reestruturação tributária pré-aquisição", m: "R$ 480k em tributos diferidos legalmente" },
              { tag: "TECNOLOGIA · LEGALIZAÇÃO", t: "Holding e separação patrimonial em 90 dias", m: "90d do diagnóstico ao registro final" },
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

export function Calculadora() {
  const [fat, setFat] = useState(8);
  const [col, setCol] = useState(20);
  const [regime, setRegime] = useState<"sn" | "lp" | "lr">("lp");
  const [setor, setSetor] = useState<"servicos"|"tech"|"comercio"|"industria">("servicos");
  const [bpo, setBpo] = useState(true);
  const [control, setControl] = useState(false);

  const calc = useMemo(() => {
    const baseFat = Math.pow(fat / 5, 0.55);
    const baseCol = Math.pow(col / 20, 0.45);
    const multRegime = { sn: 0.85, lp: 1.0, lr: 1.18 }[regime];
    const multSetor = { industria: 1.15, tech: 1.05, comercio: 1.08, servicos: 1.0 }[setor];
    const bpoVal = bpo ? Math.round((3800 * baseFat * baseCol * multRegime * multSetor) / 100) * 100 : 0;
    const controlVal = control ? Math.round((5400 * baseFat * multRegime * multSetor) / 100) * 100 : 0;
    const desconto = (bpo && control) ? Math.round((bpoVal + controlVal) * 0.15 / 100) * 100 : 0;
    const total = bpoVal + controlVal - desconto;
    const score = Math.min(95, Math.round(40 + fat * 1.5 + col * 0.3 + (bpo ? 6 : 0) + (control ? 8 : 0)));
    const reco = score < 55 ? "BPO Financeiro" : score < 75 ? "Controladoria" : "BPO + Controladoria";
    return { bpoVal, controlVal, desconto, total, score, reco };
  }, [fat, col, regime, setor, bpo, control]);

  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

  return (
    <section id="calculadora" className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mb-16 max-w-3xl">
          Quanto custa <span className="italic text-[#005a54]">/ ter Cluny</span> dentro<br />da sua empresa?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-tech">
          <div className="p-8 lg:p-12 bg-[#f4f1ec] space-y-8">
            <div>
              <div className="flex justify-between mb-3"><span className="label-mono text-[#005a54]">FATURAMENTO ANUAL</span><span className="font-mono-tech text-[15px] text-[#1F3D2E]">R$ {fat}M</span></div>
              <input type="range" min={2} max={80} step={1} value={fat} onChange={(e)=>setFat(+e.target.value)} className="w-full accent-[#005a54]" />
            </div>
            <div>
              <div className="flex justify-between mb-3"><span className="label-mono text-[#005a54]">COLABORADORES (CLT)</span><span className="font-mono-tech text-[15px] text-[#1F3D2E]">{col}</span></div>
              <input type="range" min={3} max={300} step={1} value={col} onChange={(e)=>setCol(+e.target.value)} className="w-full accent-[#005a54]" />
            </div>
            <div>
              <div className="label-mono text-[#005a54] mb-3">REGIME TRIBUTÁRIO</div>
              <div className="flex gap-2">
                {[["sn","Simples"],["lp","Presumido"],["lr","Real"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setRegime(k as any)} className="flex-1 py-3 text-[13px] rounded-[2px] transition-colors"
                    style={{ background: regime===k?"#005a54":"transparent", color: regime===k?"#f4f1ec":"#1A1A1A", border: "1px solid #005a54" }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="label-mono text-[#005a54] mb-3">SETOR PRINCIPAL</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[["servicos","Serviços"],["tech","Tech"],["comercio","Comércio"],["industria","Indústria"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setSetor(k as any)} className="py-3 text-[13px] rounded-[2px]"
                    style={{ background: setor===k?"#005a54":"transparent", color: setor===k?"#f4f1ec":"#1A1A1A", border: "1px solid #005a54" }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="label-mono text-[#005a54] mb-3">ESCOPO DESEJADO</div>
              <label className="flex items-start gap-3 p-4 border border-[rgba(26,26,26,0.1)] mb-2 cursor-pointer rounded-[2px]" style={{ background: bpo ? "rgba(0,90,84,0.05)" : "transparent" }}>
                <input type="checkbox" checked={bpo} onChange={(e)=>setBpo(e.target.checked)} className="mt-1 accent-[#005a54]" />
                <div><div className="text-[14px] font-medium">BPO Financeiro</div><div className="text-[12px] text-[#6e7b7c]">Execução: a pagar/receber, conciliação, fluxo</div></div>
              </label>
              <label className="flex items-start gap-3 p-4 border border-[rgba(26,26,26,0.1)] cursor-pointer rounded-[2px]" style={{ background: control ? "rgba(0,90,84,0.05)" : "transparent" }}>
                <input type="checkbox" checked={control} onChange={(e)=>setControl(e.target.checked)} className="mt-1 accent-[#005a54]" />
                <div><div className="text-[14px] font-medium">Controladoria</div><div className="text-[12px] text-[#6e7b7c]">Tese: KPIs, leitura técnica, projeção</div></div>
              </label>
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-[#1F3D2E] text-[#f4f1ec]">
            <span className="label-mono text-[#c48b30]">· Estimativa técnica</span>
            <div className="mt-6 flex items-baseline gap-3">
              <div className="font-mono-tech text-[44px] lg:text-[64px] leading-none">{fmt(calc.total)}</div>
              <div className="label-mono text-[#cec9b8]">/MÊS</div>
            </div>
            <div className="label-mono text-[#cec9b8] mt-3">± 12% · CONFIRMADO APÓS DIAGNÓSTICO · 12 MESES MÍNIMO</div>

            <div className="mt-8 space-y-2 text-[13px]">
              <div className="flex justify-between py-2 border-b border-[rgba(244,241,236,0.18)]"><span>BPO Financeiro</span><span className="font-mono-tech">{fmt(calc.bpoVal)}</span></div>
              <div className="flex justify-between py-2 border-b border-[rgba(244,241,236,0.18)]"><span>Controladoria</span><span className="font-mono-tech">{fmt(calc.controlVal)}</span></div>
              {calc.desconto > 0 && (
                <div className="flex justify-between py-2 px-3" style={{ background: "rgba(196,139,48,0.12)" }}><span>Desconto combo (15%)</span><span className="font-mono-tech text-[#c48b30]">−{fmt(calc.desconto)}</span></div>
              )}
            </div>

            <div className="mt-8 p-5" style={{ background: "rgba(244,241,236,0.06)", border: "1px solid rgba(244,241,236,0.18)" }}>
              <div className="label-mono text-[#c48b30] mb-2">PLANO INDICADO</div>
              <div className="font-display text-[24px]">{calc.reco}</div>
              <div className="text-[13px] text-[#cec9b8] mt-2">Combinação técnica adequada ao porte e maturidade da operação.</div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2"><span className="label-mono text-[#cec9b8]">FIT TÉCNICO COM CLUNY</span><span className="font-mono-tech text-[#c48b30]">{calc.score}</span></div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(244,241,236,0.15)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${calc.score}%`, background: "linear-gradient(90deg, #005a54, #c48b30)" }} />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#cadastro" className="btn-primary" style={{ background: "#c48b30", color: "#1F3D2E" }}>Quero esta proposta →</a>
              <button className="btn-secondary" style={{ borderColor: "#f4f1ec", color: "#f4f1ec" }}>↓ Receber PDF</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Conteudo() {
  const POSTS = [
    ["ED. 042", "TRIBUTÁRIO", "7 min", "02.MAI.2026", "Quando a reforma tributária deixa de ser hipótese e vira régua operacional"],
    ["ED. 041", "GESTÃO", "5 min", "24.ABR.2026", "DRE gerencial: a diferença entre relatório bonito e leitura útil"],
    ["ED. 040", "SOCIETÁRIO", "9 min", "17.ABR.2026", "Holding patrimonial: três armadilhas comuns na constituição"],
  ];
  return (
    <section className="py-24 lg:py-32 bg-[#ece7dc] border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-[40px] lg:text-[56px] text-[#1F3D2E]">
            Conteúdo <span className="italic text-[#6e7b7c] text-[28px]">/ últimas edições</span>
          </h2>
          <a href="#" className="label-mono text-[#005a54]">VER TODAS →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p[0]} className="bg-[#f4f1ec] border-tech p-7 flex flex-col min-h-[280px]">
              <div className="label-mono text-[#005a54] mb-5">{p[0]} · {p[1]} · {p[2]}</div>
              <h3 className="font-display text-[22px] text-[#1F3D2E] flex-1">{p[4]}</h3>
              <div className="flex justify-between mt-6 pt-4 border-t border-[rgba(26,26,26,0.1)]">
                <span className="label-mono text-[#6e7b7c]">{p[3]}</span>
                <span className="label-mono text-[#005a54]">LER →</span>
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
];

export function FAQ() {
  return (
    <section className="py-24 lg:py-32 border-b border-[rgba(26,26,26,0.1)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div>
          <span className="label-mono text-[#005a54]">· FAQ</span>
          <h2 className="font-display text-[40px] lg:text-[48px] mt-4 leading-[1.05] text-[#1F3D2E]">
            Perguntas <em className="italic text-[#005a54]">técnicas</em> que ouvi neste mês.
          </h2>
        </div>
        <div className="lg:col-span-2 border-t border-[rgba(26,26,26,0.1)]">
          {FAQS.map(([q, a], i) => (
            <details key={i} className="group border-b border-[rgba(26,26,26,0.1)] py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none gap-6">
                <span className="font-display text-[18px] lg:text-[20px] text-[#1F3D2E]">
                  <span className="font-mono-tech text-[#6e7b7c] text-[12px] mr-3">0{i+1}.</span>{q}
                </span>
                <span className="font-mono-tech text-[#005a54] text-[20px] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[14.5px] text-[#1A1A1A]/80 mt-4 leading-relaxed pl-9">→ {a}</p>
            </details>
          ))}
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
            <span className="label-mono text-[#005a54]">· Cadastro</span>
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
                    <option>Contabilidade</option>
                    <option>Legalização</option>
                    <option>Educação Corporativa</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-4">Quero conversar com a Cluny →</button>
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
