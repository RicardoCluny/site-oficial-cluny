import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, FAQ, Cadastro, Footer, StickyBar } from "@/components/cluny/Sections";
import { CalcControladoria } from "@/components/cluny/CalcControladoria";

export const Route = createFileRoute("/planos_/controladoria")({
  head: () => ({
    meta: [
      { title: "Controladoria — Cluny" },
      { name: "description", content: "Controladoria Cluny: KPIs sob medida, DRE gerencial comentado, modelagem de cenários e reuniões com o sócio." },
    ],
  }),
  component: ControladoriaPage,
});

const ENTREGAVEIS = [
  ["Painel de KPIs sob medida (gerencial)", "Indicadores desenhados para o seu negócio — não template genérico."],
  ["DRE gerencial mensal comentado", "Relatório que explica o que aconteceu e o que fazer a seguir."],
  ["Análise de margem por linha / cliente / projeto", "Identifica onde você ganha e onde você perde sem saber."],
  ["Orçamento anual com revisão trimestral", "Plano financeiro vivo — revisado conforme a realidade muda."],
  ["Modelagem de cenários (3 horizontes)", "Otimista, base e conservador. Você escolhe com qual trabalhar."],
  ["Reunião mensal com o sócio (90 min)", "Leitura técnica completa. Sem intermediário. Com o sócio Cluny."],
  ["Sessão trimestral de tese (3 horas)", "Revisão profunda de estratégia financeira a cada trimestre."],
];

function ControladoriaPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec]">
      <Nav />
      <main>
        {/* HERO */}
        <section className="bg-[#1F3D2E] text-[#f4f1ec] py-20">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <span className="label-mono text-[#c48b30]">· CONTROLADORIA / TESE FINANCEIRA</span>
            <h1 className="font-display font-semibold text-[40px] lg:text-[56px] leading-[1.05] mt-6 max-w-3xl">
              Decisão com dado.<br /><span className="italic font-normal text-[#c48b30]">Não com intuição.</span>
            </h1>
            <p className="text-[16px] mt-6 max-w-2xl leading-relaxed" style={{ color: "rgba(244,241,236,0.8)" }}>
              Conduzo a inteligência financeira da sua empresa — KPIs sob medida, DRE gerencial comentado, modelagem de cenários e reuniões técnicas com o sócio. Para quem quer tese, não relatório.
            </p>
          </div>
        </section>

        {/* O QUE É CONTROLADORIA */}
        <section className="py-20 bg-[#f4f1ec]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· CONTROLADORIA / O QUE ENTREGO</span>
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[#1F3D2E] mt-4">
                Leitura técnica que <span className="italic text-[#c48b30]">orienta o sócio.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-5 text-[15px] text-[#1A1A1A]/85 leading-relaxed">
                <p>Controladoria não é relatório. É a capacidade de ler os números da sua empresa e transformar isso em decisão técnica — antes que o mercado decida por você.</p>
                <p>Atendo empresas a partir de R$ 8M de faturamento que já têm operação financeira rodando e precisam do próximo nível: saber para onde ir, não apenas onde estão.</p>
                <p>Trabalho com o sócio diretamente. Sem camada de analista intermediário para decisões estratégicas.</p>
              </div>
              <div className="space-y-4">
                {[
                  ["KPIs sob medida", "não painel genérico"],
                  ["DRE comentado", "não apenas número"],
                  ["Tese, não hype", "não moda do trimestre"],
                ].map(([t, d]) => (
                  <div key={t} className="bg-white p-5 rounded-[2px]" style={{ borderLeft: "3px solid #c48b30" }}>
                    <div className="font-bold text-[15px] text-[#1F3D2E]">{t}</div>
                    <div className="text-[13px] text-[#6e7b7c] mt-1">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ESCOPO */}
        <section className="py-20 bg-white">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <div className="mb-12 max-w-3xl">
              <span className="label-mono text-[#005a54]">· ESCOPO / O QUE ESTÁ INCLUÍDO</span>
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[#1F3D2E] mt-4">
                Sete entregáveis. <span className="italic text-[#c48b30]">Uma tese.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ENTREGAVEIS.map(([t, d]) => (
                <div key={t} className="border border-[#e8e4db] rounded-[4px] p-6 flex gap-4">
                  <span className="text-[#c48b30] font-mono-tech text-[18px]">→</span>
                  <div>
                    <div className="font-bold text-[15px] text-[#1F3D2E]">{t}</div>
                    <div className="text-[13px] text-[#6e7b7c] mt-1 leading-relaxed">{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#1F3D2E] rounded-[4px] p-6 lg:p-8">
              <span className="label-mono text-[#c48b30] mb-4 block">· INDICADO PARA</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Faturamento R$ 8M+", "Estrutura financeira organizada", "Sócio que decide com tese"].map((t) => (
                  <div key={t} className="flex gap-2 text-[14px] text-[#f4f1ec]">
                    <span className="text-[#c48b30]">✓</span>{t}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-[#f4f1ec] border border-[#e8e4db] rounded-[4px] p-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-[#1A1A1A]/80 max-w-2xl">
                Não executa rotina financeira diária. Para empresas sem operação organizada, recomendamos começar pelo BPO Financeiro.
              </p>
              <Link to="/planos/bpo" className="text-[13px] font-bold text-[#005a54]">
                Conhecer o BPO Financeiro →
              </Link>
            </div>

            {/* PREÇO */}
            <div className="max-w-[480px] mx-auto mt-12 bg-white border border-[#e8e4db] rounded-[4px] p-8 text-center">
              <span className="label-mono text-[#6e7b7c]">CONTROLADORIA / HONORÁRIOS</span>
              <div className="mt-4">
                <span className="text-[12px] text-[#6e7b7c]">a partir de</span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="font-mono-tech text-[48px] text-[#1A1A1A]">R$ 7.200</span>
                  <span className="text-[14px] text-[#6e7b7c]">/mês</span>
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6e7b7c] mt-3">
                · Contrato mínimo 12 meses · Revisão trimestral
              </div>
              <a href="#cadastro" className="inline-block w-full text-center mt-6 py-3 rounded-[2px] font-bold text-[14px]"
                style={{ background: "#005a54", color: "#f4f1ec" }}>
                Quero a Controladoria Cluny →
              </a>
            </div>
          </div>
        </section>

        <CalcControladoria />
        <Cadastro />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
