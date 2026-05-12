import { useState, useMemo } from "react";

type Regime = "simples" | "presumido" | "real";

export function CalcControladoria() {
  const [receita, setReceita] = useState(800_000);
  const [csp, setCsp] = useState(35);
  const [despesas, setDesp] = useState(150_000);
  const [depAm, setDepAm] = useState(15_000);
  const [regime, setRegime] = useState<Regime>("presumido");
  const [carga, setCarga] = useState(20);
  const [crescimento, setCresc] = useState(30);

  const r = useMemo(() => {
    const meses = Array.from({ length: 12 }, (_, i) => receita * (1 + (crescimento / 100) * (i / 11)));
    const receitaAnual = meses.reduce((s, v) => s + v, 0);
    const cspAnual = receitaAnual * (csp / 100);
    const lucroBruto = receitaAnual - cspAnual;
    const despesasAnuais = despesas * 12;
    const depreciacao = depAm * 12;
    const tributos = receitaAnual * (carga / 100);
    const EBITDA = lucroBruto - despesasAnuais;
    const margemEBITDA = receitaAnual > 0 ? (EBITDA / receitaAnual) * 100 : 0;
    const EBIT = EBITDA - depreciacao;
    const lucroLiquido = EBIT - tributos;
    const margemLiquida = receitaAnual > 0 ? (lucroLiquido / receitaAnual) * 100 : 0;
    const geracaoCaixa = lucroLiquido + depreciacao;
    const denom = 1 - csp / 100;
    const pontoEquilibrio = denom > 0 ? (despesasAnuais + tributos) / denom / 12 : 0;
    const distribuicao = lucroLiquido * 0.6;
    return { EBITDA, margemEBITDA, lucroLiquido, margemLiquida, geracaoCaixa, pontoEquilibrio, distribuicao };
  }, [receita, csp, despesas, depAm, carga, crescimento]);

  const fmt = (n: number) => `R$ ${Math.round(n).toLocaleString("pt-BR")}`;

  const setRegimeAuto = (k: Regime) => {
    setRegime(k);
    setCarga(k === "simples" ? 13 : k === "presumido" ? 20 : 27);
  };

  return (
    <section id="calculadora" className="py-24 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="label-mono text-[#005a54]">· CALCULADORA / PROJEÇÃO FINANCEIRA</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Quanto sua empresa pode<br /><span className="italic text-[#c48b30]">gerar em 12 meses?</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Projeção de EBITDA, Lucro Líquido e Geração de Caixa com base nos dados da sua operação. Sem cadastro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-[#f4f1ec] p-8 rounded-[4px] border border-[#e8e4db] space-y-7">
            <Slider label="Receita bruta mensal atual" value={receita} onChange={setReceita} min={100_000} max={10_000_000} step={50_000} fmt={fmt} marks={["R$100k", "R$500k", "R$1M", "R$3M", "R$10M"]} />
            <Slider label="Custo dos serviços prestados — CSP (%)" value={csp} onChange={setCsp} min={5} max={70} step={1} fmt={(v) => `${v}%`} marks={["5%", "20%", "40%", "60%", "70%"]} tip="Custos diretamente ligados à entrega do serviço (mão de obra direta, terceiros, insumos)" />
            <Slider label="Despesas operacionais fixas mensais" value={despesas} onChange={setDesp} min={20_000} max={2_000_000} step={10_000} fmt={fmt} marks={["R$20k", "R$200k", "R$500k", "R$1M", "R$2M"]} tip="Aluguel, folha administrativa, marketing, TI, etc." />
            <Slider label="Depreciação e amortização mensal" value={depAm} onChange={setDepAm} min={0} max={100_000} step={1_000} fmt={fmt} marks={["R$0", "R$10k", "R$30k", "R$60k", "R$100k"]} tip="Usado para calcular EBITDA. Pode deixar em zero se não souber." />

            <div>
              <div className="label-mono text-[#005a54] mb-3">CARGA TRIBUTÁRIA SOBRE RECEITA</div>
              <div className="flex gap-2 mb-3">
                {[["simples", "Simples"], ["presumido", "Presumido"], ["real", "Real"]].map(([k, l]) => (
                  <button key={k} onClick={() => setRegimeAuto(k as Regime)}
                    className="flex-1 py-2 text-[12px] rounded-[2px] transition-all"
                    style={{ background: regime === k ? "#005a54" : "transparent", color: regime === k ? "#f4f1ec" : "#1A1A1A", border: "1px solid #005a54" }}>
                    {l}
                  </button>
                ))}
              </div>
              <input type="number" value={carga} onChange={(e) => setCarga(Math.max(0, Math.min(50, +e.target.value)))} className="w-full p-2 border border-[#e8e4db] rounded-[2px] font-mono-tech text-[14px]" />
              <div className="text-[11px] text-[#6e7b7c] mt-1">% médio (editável)</div>
            </div>

            <Slider label="Meta de crescimento de receita em 12 meses" value={crescimento} onChange={setCresc} min={0} max={150} step={1} fmt={(v) => `${v}%`} marks={["0%", "25%", "50%", "100%", "150%"]} />
          </div>

          {/* Resultado */}
          <div className="bg-[#1F3D2E] rounded-[4px] p-8 lg:p-10 text-[#f4f1ec]">
            <span className="label-mono text-[#c48b30]">· PROJEÇÃO / 12 MESES</span>
            <p className="text-[12px] text-[#cec9b8] mt-1">Valores anuais acumulados · Estimativa técnica</p>

            <div className="mt-8">
              <div className="label-mono text-[#6e7b7c]">EBITDA PROJETADO</div>
              <div className="font-mono-tech text-[44px] leading-none mt-2 text-[#f4f1ec]">{fmt(r.EBITDA)}</div>
              <div className="font-mono-tech text-[14px] text-[#c48b30] mt-2">Margem EBITDA: {r.margemEBITDA.toFixed(1)}%</div>
              <div className="h-1 mt-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full transition-all" style={{ width: `${Math.max(0, Math.min(100, r.margemEBITDA))}%`, background: "#c48b30" }} />
              </div>
            </div>

            <div className="mt-8">
              <div className="label-mono text-[#6e7b7c]">LUCRO LÍQUIDO ESTIMADO</div>
              <div className="font-mono-tech text-[36px] leading-none mt-2">{fmt(r.lucroLiquido)}</div>
              <div className="font-mono-tech text-[13px] text-[#c48b30] mt-1">Margem líquida: {r.margemLiquida.toFixed(1)}%</div>
            </div>

            <div className="mt-8">
              <div className="label-mono text-[#6e7b7c]">GERAÇÃO DE CAIXA (FCO)</div>
              <div className="font-mono-tech text-[32px] leading-none mt-2">{fmt(r.geracaoCaixa)}</div>
              <div className="text-[11px] text-[#6e7b7c] mt-1">Lucro líquido + depreciação. Proxy conservador de FCO.</div>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <div className="label-mono text-[#6e7b7c]">PONTO DE EQUILÍBRIO MENSAL</div>
              <div className="font-mono-tech text-[24px] leading-none mt-2 text-[#c48b30]">{fmt(r.pontoEquilibrio)}</div>
              <div className="text-[11px] text-[#6e7b7c] mt-1">Receita mínima para cobrir todos os custos</div>
            </div>

            <div className="mt-6">
              <div className="label-mono text-[#6e7b7c]">CAPACIDADE DE DISTRIBUIÇÃO DE LUCRO</div>
              <div className="font-mono-tech text-[24px] leading-none mt-2">{fmt(r.distribuicao)}</div>
              <div className="text-[11px] text-[#6e7b7c] mt-1">Estimativa conservadora (60% do lucro líquido)</div>
            </div>

            <p className="text-[11px] text-[#6e7b7c] mt-6 leading-snug">
              Projeção estimada. Resultado real depende de diagnóstico técnico completo. Não constitui assessoria financeira ou garantia de resultado.
            </p>

            <a href="#cadastro" className="block w-full text-center mt-6 py-4 rounded-[2px] font-bold text-[14px]"
              style={{ background: "#c48b30", color: "#1A1A1A" }}>
              Quero validar esta projeção com a Cluny →
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
