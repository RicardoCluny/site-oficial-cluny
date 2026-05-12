import { createFileRoute } from "@tanstack/react-router";
import { Nav, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";
import { CalcContabilidade } from "@/components/cluny/CalcContabilidade";

export const Route = createFileRoute("/planos_/contabilidade")({
  head: () => ({
    meta: [
      { title: "Contabilidade Consultiva — Cluny" },
      { name: "description", content: "Contabilidade consultiva Cluny: três planos por porte e plano personalizado para operações complexas." },
    ],
  }),
  component: ContabPage,
});

const PRECOS = { start: "1.890", gestao: "3.490", premium: "5.890" };

const PLANO_DATA = {
  start: {
    icp: "Faturamento até R$ 50.000/mês",
    subt: "Para empresas em fase inicial com operação simples",
    inclui: [
      "Apuração mensal (federal + estadual + municipal)",
      "Departamento pessoal até 5 colaboradores",
      "Emissão de guias e obrigações acessórias",
      "Declarações fiscais anuais (DEFIS, DASN)",
      "Suporte por e-mail (resposta em até 48h)",
      "Reunião semestral com o sócio",
      "Acesso ao portal do cliente Cluny",
    ],
    naoInclui: ["Planejamento tributário", "DRE gerencial", "Reunião mensal", "Departamento pessoal acima de 5"],
  },
  gestao: {
    icp: "Faturamento até R$ 200.000/mês",
    subt: "Para empresas em crescimento que precisam de leitura técnica além da conformidade",
    inclui: [
      "Tudo do Start",
      "Departamento pessoal até 30 colaboradores",
      "Planejamento tributário anual",
      "DRE gerencial mensal padrão",
      "Reunião técnica mensal (60 min)",
      "Suporte direto ao sócio (WhatsApp + e-mail)",
      "Resposta em até 24h úteis",
      "Revisão de regime tributário anual",
    ],
    naoInclui: ["DRE por centro de custo", "Análise de margem por projeto", "Reunião quinzenal"],
  },
  premium: {
    icp: "Faturamento até R$ 400.000/mês",
    subt: "Para empresas consolidadas com operação fiscal e societária complexa",
    inclui: [
      "Tudo do Gestão",
      "Departamento pessoal ilimitado",
      "DRE gerencial por centro de custo",
      "Análise de margem por projeto/cliente",
      "Balanço gerencial trimestral",
      "Reunião técnica quinzenal (60 min)",
      "Suporte prioritário — resposta em até 8h úteis",
      "Planejamento tributário com modelagem de cenários",
      "Suporte societário básico incluído",
      "Coordenador de conta dedicado",
    ],
    naoInclui: [],
  },
};

function PlanCard({ plano }: { plano: keyof typeof PLANO_DATA }) {
  const dark = plano === "gestao";
  const txt = dark ? "#f4f1ec" : "#1A1A1A";
  const sub = dark ? "#cec9b8" : "#6e7b7c";
  const titulos = { start: "Start", gestao: "Gestão", premium: "Premium" };
  const data = PLANO_DATA[plano];

  return (
    <div className="relative p-8 rounded-[4px] flex flex-col h-full"
      style={{ background: dark ? "#1F3D2E" : "#ffffff", border: dark ? "none" : "1px solid #e8e4db" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="label-mono" style={{ color: sub }}>CONTABILIDADE · {plano.toUpperCase()}</span>
        {dark && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>· MAIS CONTRATADO</span>}
      </div>
      <p className="text-[11px] mb-3" style={{ color: sub }}>{data.icp}</p>

      <h3 className="font-display font-semibold text-[28px]" style={{ color: txt }}>{titulos[plano]}</h3>
      <p className="font-display italic text-[14px] mt-1 leading-snug" style={{ color: sub }}>{data.subt}</p>

      <div className="mt-6">
        <div className="flex items-baseline gap-1">
          <span className="font-mono-tech text-[40px]" style={{ color: txt }}>R$ {PRECOS[plano]}</span>
          <span className="text-[14px]" style={{ color: sub }}>/mês</span>
        </div>
      </div>

      <div className="my-6 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "#e8e4db" }} />

      <div className="label-mono mb-3" style={{ color: sub }}>ESCOPO INCLUÍDO</div>
      <ul className="space-y-2 flex-1">
        {data.inclui.map((e) => (
          <li key={e} className="flex gap-2 text-[13px]" style={{ color: txt }}>
            <span style={{ color: "#c48b30" }}>→</span>{e}
          </li>
        ))}
      </ul>

      {data.naoInclui.length > 0 && (
        <div className="mt-5">
          <div className="label-mono mb-2" style={{ color: sub }}>NÃO INCLUI</div>
          <ul className="space-y-1">
            {data.naoInclui.map((e) => (
              <li key={e} className="text-[12px]" style={{ color: sub }}>— {e}</li>
            ))}
          </ul>
        </div>
      )}

      <a href="#cadastro" className="w-full text-center py-3 mt-6 rounded-[2px] font-bold text-[13px]"
        style={
          plano === "gestao" ? { background: "#c48b30", color: "#1A1A1A" }
          : plano === "premium" ? { background: "#005a54", color: "#f4f1ec" }
          : { background: "transparent", color: "#005a54", border: "2px solid #005a54" }
        }>
        Quero o {titulos[plano]} →
      </a>
    </div>
  );
}

function ContabPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        {/* HERO */}
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· CONTABILIDADE / CONSULTIVA</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Contabilidade que<br /><span className="italic font-normal text-[#c48b30]">explica o que faz.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Apuração mensal completa, planejamento tributário e suporte direto ao sócio. O relatório que entrego precisa ser lido — não arquivado.
            </p>
          </div>
        </section>

        {/* PLANOS */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· PLANOS / CONTABILIDADE</span>
              <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
                Três planos. <span className="italic text-[#c48b30]">Uma régua técnica.</span>
              </h2>
              <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
                Escolha conforme o faturamento mensal da sua empresa. A metodologia e o compromisso técnico são os mesmos nos três.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlanCard plano="start" />
              <PlanCard plano="gestao" />
              <PlanCard plano="premium" />
            </div>

            {/* PERSONALIZADO */}
            <div className="mt-8 bg-[#1A1A1A] rounded-[4px] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
              <div>
                <span className="inline-block px-2 py-1 text-[10px] font-bold tracking-wider rounded-[2px]" style={{ background: "#c48b30", color: "#1A1A1A" }}>
                  · ACIMA DE R$ 400.000/MÊS
                </span>
                <h3 className="font-display font-semibold text-[32px] text-[#f4f1ec] mt-4">Plano Personalizado</h3>
                <p className="font-display italic text-[18px] text-[#c48b30] mt-1">Para operações de alta complexidade.</p>
                <p className="text-[15px] text-[#f4f1ec]/85 mt-4 leading-relaxed">
                  Holdings, multi-empresas, operações com regime Real, volume acima de 400 lançamentos mensais ou necessidade de controladoria integrada. Escopo definido após diagnóstico.
                </p>
                <ul className="mt-6 space-y-2">
                  {[
                    "Faturamento acima de R$ 400k/mês",
                    "Mais de uma empresa ou holding",
                    "Regime de Lucro Real",
                    "Necessidade de BPO Financeiro integrado",
                    "Operação em fase de M&A ou restructuring",
                  ].map((t) => (
                    <li key={t} className="flex gap-2 text-[14px] text-[#f4f1ec]"><span className="text-[#c48b30]">→</span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[4px] p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <span className="label-mono text-[#6e7b7c]">PRÓXIMO PASSO</span>
                <p className="text-[14px] text-[#f4f1ec]/85 mt-3 leading-relaxed">
                  Respondo pessoalmente em até 1 dia útil com uma leitura técnica inicial da sua operação. Sem SDR. Sem funil. Apenas critério.
                </p>
                <a href="#cadastro" className="block w-full text-center mt-6 rounded-[2px] font-bold text-[14px] flex items-center justify-center"
                  style={{ background: "#c48b30", color: "#1A1A1A", height: 52 }}>
                  Quero conversar sobre o plano personalizado →
                </a>
                <p className="text-[11px] text-[#6e7b7c] mt-3">Seus dados não são compartilhados.</p>
              </div>
            </div>
          </div>
        </section>

        <CalcContabilidade />
        <Cadastro />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
