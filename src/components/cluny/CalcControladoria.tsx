import { useState, useMemo } from "react";

export function CalcControladoria() {
  const [faturamento, setFat] = useState(500_000);
  const [margem, setMargem] = useState(35);
  const [despesas, setDesp] = useState(120_000);
  const [regime, setRegime] = useState<"simples" | "presumido" | "real">("presumido");
  const [carga, setCarga] = useState(20);
  const [crescimento, setCresc] = useState(20);
  const [reducao, setReducao] = useState(15);

  const r = useMemo(() => {
    const receitaAtual = faturamento * 12;
    const receitaMes12 = receitaAtual * (1 + crescimento / 100);
    const margemBrutaValor = receitaMes12 * (margem / 100);
    const tributosAtuais = receitaAtual * (carga / 100);
    const tributosOtim = tributosAtuais * (1 - reducao / 100);
    const economia = tributosAtuais - tributosOtim;
    const despesasAnuais = despesas * 12;
    const lucroLiq = margemBrutaValor - despesasAnuais - tributosOtim;
    const margemFinal = receitaMes12 > 0 ? (lucroLiq / receitaMes12) * 100 : 0;
    return { lucroLiq, economia, margemFinal };
  }, [faturamento, margem, despesas, carga, crescimento, reducao]);

  const fmt = (n: number) =>
    `R$ ${Math.round(n).toLocaleString("pt-BR")}`;

  const setRegimeAuto = (k: "simples" | "presumido" | "real") => {
    setRegime(k);
    setCarga(k === "simples" ? 12 : k === "presumido" ? 20 : 30);
  };

  return (
    <section id="calculadora" className="py-24 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="label-mono text-[#005a54]">· CALCULADORA / PROJEÇÃO</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Quanto sua empresa<br /> pode <span className="italic text-[#c48b30]">lucrar em 12 meses?</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Estimativa técnica com base em dados reais da sua operação. Resultado em segundos — sem cadastro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-[#f4f1ec] p-8 rounded-[4px] border border-[#e8e4db] space-y-7">
            <Slider label="Faturamento mensal atual" value={faturamento} onChange={setFat} min={50_000} max={5_000_000} step={10_000} fmt={fmt} marks={["R$50k", "R$500k", "R$1M", "R$2M", "R$5M"]} />
            <Slider label="Margem bruta atual (%)" value={margem} onChange={setMargem} min={5} max={80} step={1} fmt={(v) => `${v}%`} marks={["5%", "20%", "40%", "60%", "80%"]} tip="Receita menos custos diretos dividido pela receita" />
            <Slider label="Despesas fixas mensais" value={despesas} onChange={setDesp} min={10_000} max={500_000} step={5_000} fmt={fmt} marks={["R$10k", "R$100k", "R$200k", "R$500k"]} />

            <div>
              <div className="label-mono text-[#005a54] mb-3">CARGA TRIBUTÁRIA ATUAL</div>
              <div className="flex gap-2 mb-3">
                {[["simples", "Simples"], ["presumido", "Presumido"], ["real", "Real"]].map(([k, l]) => (
                  <button key={k} onClick={() => setRegimeAuto(k as any)}
                    className="flex-1 py-2 text-[12px] rounded-[2px] transition-all"
                    style={{ background: regime === k ? "#005a54" : "transparent", color: regime === k ? "#f4f1ec" : "#1A1A1A", border: "1px solid #005a54" }}>
                    {l}
                  </button>
                ))}
              </div>
              <input type="number" value={carga} onChange={(e) => setCarga(Math.max(0, Math.min(50, +e.target.value)))} className="w-full p-2 border border-[#e8e4db] rounded-[2px] font-mono-tech text-[14px]" />
              <div className="text-[11px] text-[#6e7b7c] mt-1">% médio (editável)</div>
            </div>

            <Slider label="Meta de crescimento de receita em 12 meses" value={crescimento} onChange={setCresc} min={0} max={100} step={1} fmt={(v) => `${v}%`} marks={["0%", "25%", "50%", "75%", "100%"]} />
            <Slider label="Potencial de redução tributária estimada" value={reducao} onChange={setReducao} min={0} max={40} step={1} fmt={(v) => `${v}%`} marks={["0%", "10%", "20%", "30%", "40%"]} tip="Estimativa da Cluny no diagnóstico técnico" />
          </div>

          {/* Resultado */}
          <div className="bg-[#1F3D2E] rounded-[4px] p-8 lg:p-10 text-[#f4f1ec]">
            <span className="label-mono text-[#c48b30]">· PROJEÇÃO / 12 MESES</span>

            <div className="mt-8">
              <div className="text-[13px] text-[#cec9b8]">Lucro líquido projetado (mês 12)</div>
              <div className="font-mono-tech text-[48px] leading-none mt-2 text-[#f4f1ec] transition-all">
                {fmt(r.lucroLiq)}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[13px] text-[#cec9b8]">Economia acumulada em tributos</div>
              <div className="font-mono-tech text-[32px] leading-none mt-2 text-[#c48b30]">
                {fmt(r.economia)}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[13px] text-[#cec9b8]">Margem líquida final estimada</div>
              <div className="font-mono-tech text-[28px] leading-none mt-2">{r.margemFinal.toFixed(1)}%</div>
              <div className="h-1 mt-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, Math.min(100, r.margemFinal))}%`, background: "#c48b30" }} />
              </div>
            </div>

            <p className="text-[11px] text-[#6e7b7c] mt-8 leading-snug">
              Projeção estimada com base nos parâmetros fornecidos. Resultado real depende de diagnóstico técnico completo.
            </p>

            <a href="#cadastro" className="block w-full text-center mt-6 py-4 rounded-[2px] font-bold text-[14px]"
              style={{ background: "#c48b30", color: "#1A1A1A" }}>
              Quero esta projeção validada →
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
