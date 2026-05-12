import { useState, useMemo } from "react";

type Setor = "servicos" | "comercio" | "industria" | "tech";

const PRESUNCAO: Record<Setor, number> = { servicos: 0.32, comercio: 0.08, industria: 0.12, tech: 0.32 };

const TABELA_SIMPLES: Record<string, Array<[number, number]>> = {
  anexoIII: [[180_000, 0.06], [360_000, 0.112], [720_000, 0.135], [1_800_000, 0.16], [3_600_000, 0.21], [4_800_000, 0.23]],
  anexoV:   [[180_000, 0.155], [360_000, 0.18], [720_000, 0.195], [1_800_000, 0.205], [3_600_000, 0.23], [4_800_000, 0.305]],
  comercio: [[180_000, 0.04], [360_000, 0.073], [720_000, 0.095], [1_800_000, 0.107], [3_600_000, 0.143], [4_800_000, 0.19]],
  industria:[[180_000, 0.045], [360_000, 0.078], [720_000, 0.10], [1_800_000, 0.112], [3_600_000, 0.148], [4_800_000, 0.20]],
};

function aliquotaTabela(faturamento: number, tabela: Array<[number, number]>): number {
  for (const [lim, al] of tabela) if (faturamento <= lim) return al;
  return tabela[tabela.length - 1][1];
}

export function CalcContabilidade() {
  const [faturamento, setFat] = useState(2_000_000);
  const [setor, setSetor] = useState<Setor>("servicos");
  const [folha, setFolha] = useState(50_000);
  const [proLabore, setPro] = useState(20_000);
  const [margemL, setMargemL] = useState(15);

  const r = useMemo(() => {
    const fatorR = faturamento > 0 ? (folha * 12) / faturamento : 0;
    const usaAnexoIII = (setor === "servicos" || setor === "tech") && fatorR >= 0.28;

    let impSimples: number | null = null;
    if (faturamento <= 4_800_000) {
      const tabela =
        setor === "comercio" ? TABELA_SIMPLES.comercio :
        setor === "industria" ? TABELA_SIMPLES.industria :
        usaAnexoIII ? TABELA_SIMPLES.anexoIII : TABELA_SIMPLES.anexoV;
      impSimples = faturamento * aliquotaTabela(faturamento, tabela);
    }

    const basePresumida = faturamento * PRESUNCAO[setor];
    const irpjPres = basePresumida * 0.15 + Math.max(0, basePresumida - 240_000) * 0.10;
    const csllPres = basePresumida * 0.09;
    const pisPres = faturamento * 0.0065;
    const cofinsPres = faturamento * 0.03;
    const impPresumido = irpjPres + csllPres + pisPres + cofinsPres;

    const lucroReal = faturamento * (margemL / 100);
    const irpjReal = lucroReal * 0.15 + Math.max(0, lucroReal - 240_000) * 0.10;
    const csllReal = lucroReal * 0.09;
    const pisReal = faturamento * 0.0165;
    const cofinsReal = faturamento * 0.076;
    const impReal = irpjReal + csllReal + pisReal + cofinsReal;

    const valid = [impSimples, impPresumido, impReal].filter((v): v is number => v != null);
    const menor = Math.min(...valid);
    const max = Math.max(...valid);
    const ordenados = [...valid].sort((a, b) => a - b);
    const segundo = ordenados[1] ?? menor;
    const economiaVsSegundo = segundo - menor;
    const economiaVsPior = max - menor;

    return { impSimples, impPresumido, impReal, menor, max, economiaVsSegundo, economiaVsPior, fatorR, usaAnexoIII };
  }, [faturamento, setor, folha, proLabore, margemL]);

  const fmt = (n: number) => `R$ ${Math.round(n).toLocaleString("pt-BR")}`;
  const fmtPct = (imp: number) => faturamento > 0 ? `${((imp / faturamento) * 100).toFixed(2)}%` : "—";

  const regimes = [
    { key: "simples", label: "Simples Nacional", color: "#005a54", value: r.impSimples },
    { key: "presumido", label: "Lucro Presumido", color: "#c48b30", value: r.impPresumido },
    { key: "real", label: "Lucro Real", color: "#6e7b7c", value: r.impReal },
  ];

  const isServicos = setor === "servicos" || setor === "tech";

  return (
    <section id="calculadora" className="py-24 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="label-mono text-[#005a54]">· CALCULADORA / REGIME TRIBUTÁRIO</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Qual regime tributário<br /><span className="italic text-[#c48b30]">paga menos imposto?</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Comparativo técnico entre Simples Nacional, Lucro Presumido e Lucro Real com base nos dados da sua empresa. Estimativa em segundos — sem cadastro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#f4f1ec] p-8 rounded-[4px] border border-[#e8e4db] space-y-7">
            <Slider label="Faturamento anual" value={faturamento} onChange={setFat} min={360_000} max={78_000_000} step={120_000} fmt={fmt} marks={["R$360k", "R$4,8M", "R$15M", "R$48M", "R$78M"]} />
            {faturamento > 4_800_000 && (
              <div className="-mt-4 text-[11px] text-[#6e7b7c] flex items-center gap-2">
                <span className="text-[#c48b30]">⚠</span> Simples Nacional indisponível acima de R$ 4,8M
              </div>
            )}

            <div>
              <div className="label-mono text-[#005a54] mb-3">SETOR DE ATUAÇÃO</div>
              <div className="grid grid-cols-4 gap-2">
                {[["servicos", "Serviços"], ["comercio", "Comércio"], ["industria", "Indústria"], ["tech", "Tech"]].map(([k, l]) => (
                  <button key={k} onClick={() => setSetor(k as Setor)}
                    className="py-2 text-[11px] rounded-[2px] transition-all"
                    style={{ background: setor === k ? "#005a54" : "transparent", color: setor === k ? "#f4f1ec" : "#1A1A1A", border: "1px solid #005a54" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <Slider label="Folha de pagamento mensal (CLT)" value={folha} onChange={setFolha} min={0} max={600_000} step={5_000} fmt={fmt} marks={["R$0", "R$50k", "R$150k", "R$300k", "R$600k"]} tip="Impacta o Fator R no Simples Nacional" />
            <Slider label="Pró-labore mensal (total dos sócios)" value={proLabore} onChange={setPro} min={0} max={100_000} step={1_000} fmt={fmt} marks={["R$0", "R$25k", "R$50k", "R$75k", "R$100k"]} tip="Incide INSS sobre pró-labore" />
            <Slider label="Margem líquida estimada (%)" value={margemL} onChange={setMargemL} min={2} max={40} step={1} fmt={(v) => `${v}%`} marks={["2%", "10%", "20%", "30%", "40%"]} tip="Usado para calcular IRPJ/CSLL no Lucro Real" />
          </div>

          <div className="bg-[#1F3D2E] rounded-[4px] p-8 lg:p-10 text-[#f4f1ec]">
            <span className="label-mono text-[#c48b30]">· COMPARATIVO / CARGA TRIBUTÁRIA ANUAL</span>

            <div className="mt-8 space-y-5">
              {regimes.map((reg) => {
                const vedado = reg.value == null;
                const isMenor = !vedado && reg.value === r.menor;
                const widthPct = vedado ? 30 : Math.max(5, ((reg.value as number) / r.max) * 100);
                return (
                  <div key={reg.key}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#f4f1ec]">{reg.label}</span>
                        {isMenor && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>MENOR CARGA</span>}
                        {vedado && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "rgba(110,123,124,0.25)", color: "#6e7b7c" }}>INDISPONÍVEL</span>}
                      </div>
                      <span className="font-mono-tech text-[13px] text-[#cec9b8]">{vedado ? "—" : fmtPct(reg.value as number)}</span>
                    </div>
                    <div className={`font-mono-tech text-[22px] mb-2 ${vedado ? "line-through opacity-60" : ""}`}>{vedado ? "—" : fmt(reg.value as number)}</div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full transition-all" style={{
                        width: `${widthPct}%`,
                        background: vedado ? "transparent" : reg.color,
                        backgroundImage: vedado ? "repeating-linear-gradient(45deg, #6e7b7c, #6e7b7c 4px, transparent 4px, transparent 8px)" : "none",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <div className="text-[13px] text-[#cec9b8]">Economia potencial adotando o melhor regime:</div>
              <div className="font-mono-tech text-[40px] leading-none mt-2 text-[#c48b30]">{fmt(r.economiaVsPior)}</div>
              <div className="text-[12px] text-[#6e7b7c] mt-1">/ano em tributos</div>
            </div>

            {isServicos && (
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <div className="text-[13px] text-[#cec9b8]">Fator R calculado:</div>
                <div className="font-mono-tech text-[18px] mt-1 text-[#f4f1ec]">{(r.fatorR * 100).toFixed(1)}%</div>
                <div className="text-[12px] mt-1" style={{ color: r.usaAnexoIII ? "#9bbf8a" : "#6e7b7c" }}>
                  {r.usaAnexoIII ? "✓ Fator R favorável — Anexo III aplicável" : "Fator R desfavorável — Anexo V aplicável"}
                </div>
                <div className="text-[10px] text-[#6e7b7c] mt-2 leading-snug">
                  Relação entre folha e faturamento. Acima de 28%, serviços podem usar o Anexo III com alíquotas menores.
                </div>
              </div>
            )}

            <p className="text-[11px] text-[#6e7b7c] mt-6 leading-snug">
              Estimativa com base em alíquotas médias vigentes. Planejamento tributário real exige análise técnica completa. Alíquotas sujeitas a alteração legislativa.
            </p>

            <a href="#cadastro" className="block w-full text-center mt-6 py-4 rounded-[2px] font-bold text-[14px]"
              style={{ background: "#c48b30", color: "#1A1A1A" }}>
              Quero análise técnica do meu regime →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, onChange, min, max, step, fmt, marks, tip }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; fmt: (v: number) => string; marks: string[]; tip?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <div>
          <span className="label-mono text-[#005a54]">{label.toUpperCase()}</span>
          {tip && <div className="text-[10px] text-[#6e7b7c] mt-0.5">{tip}</div>}
        </div>
        <span className="font-mono-tech text-[18px] text-[#005a54]">{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-[#005a54]" />
      <div className="flex justify-between mt-1 text-[10px] text-[#6e7b7c] font-mono-tech">
        {marks.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}
