import { useState, useMemo } from "react";

type Setor = "servicos" | "comercio" | "industria" | "tech";

const PRESUNCAO: Record<Setor, number> = { servicos: 0.32, comercio: 0.08, industria: 0.12, tech: 0.32 };

function aliquotaSimples(faturamento: number, setor: Setor): number | null {
  if (faturamento > 4_800_000) return null;
  // tabela simplificada
  const t = setor === "comercio"
    ? [[180_000, 0.04], [360_000, 0.073], [720_000, 0.095], [1_800_000, 0.107], [3_600_000, 0.143], [4_800_000, 0.19]]
    : [[180_000, 0.06], [360_000, 0.112], [720_000, 0.135], [1_800_000, 0.16], [3_600_000, 0.21], [4_800_000, 0.23]];
  for (const [lim, al] of t) if (faturamento <= lim) return al;
  return 0.23;
}

export function CalcContabilidade() {
  const [faturamento, setFat] = useState(2_000_000);
  const [setor, setSetor] = useState<Setor>("servicos");
  const [folha, setFolha] = useState(50_000);
  const [socios, setSocios] = useState(2);

  const resultado = useMemo(() => {
    const alSimples = aliquotaSimples(faturamento, setor);
    const impSimples = alSimples != null ? faturamento * alSimples : null;

    const basePresumida = faturamento * PRESUNCAO[setor];
    const irpjPresExtra = Math.max(0, basePresumida - 240_000) * 0.10;
    const irpjPres = basePresumida * 0.15 + irpjPresExtra;
    const csllPres = basePresumida * 0.09;
    const pisPres = faturamento * 0.0065;
    const cofinsPres = faturamento * 0.03;
    const impPresumido = irpjPres + csllPres + pisPres + cofinsPres;

    const lucroReal = faturamento * 0.12;
    const irpjRealExtra = Math.max(0, lucroReal - 240_000) * 0.10;
    const irpjReal = lucroReal * 0.15 + irpjRealExtra;
    const csllReal = lucroReal * 0.09;
    const pisReal = faturamento * 0.0165;
    const cofinsReal = faturamento * 0.076;
    const impReal = irpjReal + csllReal + pisReal + cofinsReal;

    const valid = [impSimples, impPresumido, impReal].filter((v) => v != null) as number[];
    const menor = Math.min(...valid);
    const ordenados = [...valid].sort((a, b) => a - b);
    const segundo = ordenados[1] ?? menor;
    const economia = segundo - menor;
    const max = Math.max(...valid);

    return { impSimples, impPresumido, impReal, menor, economia, max };
  }, [faturamento, setor, folha, socios]);

  const fmt = (n: number) => `R$ ${Math.round(n).toLocaleString("pt-BR")}`;
  const fmtPct = (imp: number) => `${((imp / faturamento) * 100).toFixed(2)}%`;

  const regimes = [
    { key: "simples", label: "Simples Nacional", color: "#005a54", value: resultado.impSimples },
    { key: "presumido", label: "Lucro Presumido", color: "#c48b30", value: resultado.impPresumido },
    { key: "real", label: "Lucro Real", color: "#6e7b7c", value: resultado.impReal },
  ];

  return (
    <section id="calculadora" className="py-24 bg-[#cec9b8]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <span className="label-mono text-[#005a54]">· CALCULADORA / REGIME TRIBUTÁRIO</span>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1.05] text-[#1F3D2E] mt-4">
            Qual regime tributário<br /><span className="italic text-[#c48b30]">paga menos imposto?</span>
          </h2>
          <p className="text-[16px] text-[#1A1A1A]/80 mt-6 leading-relaxed">
            Estimativa comparativa entre Simples Nacional, Lucro Presumido e Lucro Real com base nos dados da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-[#f4f1ec] p-8 rounded-[4px] border border-[#e8e4db] space-y-7">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="label-mono text-[#005a54]">FATURAMENTO ANUAL</span>
                <span className="font-mono-tech text-[18px] text-[#005a54]">{fmt(faturamento)}</span>
              </div>
              <input type="range" min={360_000} max={78_000_000} step={120_000} value={faturamento} onChange={(e) => setFat(+e.target.value)} className="w-full accent-[#005a54]" />
              <div className="flex justify-between mt-1 text-[10px] text-[#6e7b7c] font-mono-tech">
                <span>R$360k</span><span>R$4,8M</span><span>R$15M</span><span>R$48M</span><span>R$78M</span>
              </div>
              {faturamento > 4_800_000 && <div className="text-[11px] text-[#c48b30] mt-2">⚠ Acima do limite do Simples Nacional</div>}
            </div>

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

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="label-mono text-[#005a54]">FOLHA DE PAGAMENTO MENSAL</span>
                <span className="font-mono-tech text-[18px] text-[#005a54]">{fmt(folha)}</span>
              </div>
              <input type="range" min={0} max={500_000} step={5_000} value={folha} onChange={(e) => setFolha(+e.target.value)} className="w-full accent-[#005a54]" />
              <div className="text-[10px] text-[#6e7b7c] mt-1">Impacta o fator R no Simples</div>
            </div>

            <div>
              <div className="label-mono text-[#005a54] mb-2">NÚMERO DE SÓCIOS</div>
              <input type="number" min={1} max={10} value={socios} onChange={(e) => setSocios(Math.max(1, Math.min(10, +e.target.value)))}
                className="w-full p-2 border border-[#e8e4db] rounded-[2px] font-mono-tech text-[14px]" />
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-[#1F3D2E] rounded-[4px] p-8 lg:p-10 text-[#f4f1ec]">
            <span className="label-mono text-[#c48b30]">· COMPARATIVO / REGIMES TRIBUTÁRIOS</span>

            <div className="mt-8 space-y-5">
              {regimes.map((r) => {
                const vedado = r.value == null;
                const isMenor = !vedado && r.value === resultado.menor;
                const widthPct = vedado ? 30 : Math.max(5, ((r.value as number) / resultado.max) * 100);
                return (
                  <div key={r.key}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#f4f1ec]">{r.label}</span>
                        {isMenor && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "#c48b30", color: "#1A1A1A" }}>MENOR CARGA</span>}
                        {vedado && <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider" style={{ background: "rgba(110,123,124,0.25)", color: "#6e7b7c" }}>VEDADO</span>}
                      </div>
                      <span className="font-mono-tech text-[14px] text-[#cec9b8]">{vedado ? "—" : fmtPct(r.value as number)}</span>
                    </div>
                    <div className="font-mono-tech text-[20px] mb-2">{vedado ? "—" : fmt(r.value as number)}</div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full transition-all" style={{
                        width: `${widthPct}%`,
                        background: vedado ? "transparent" : r.color,
                        backgroundImage: vedado ? "repeating-linear-gradient(45deg, #6e7b7c, #6e7b7c 4px, transparent 4px, transparent 8px)" : "none",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <div className="text-[13px] text-[#cec9b8]">Economia potencial adotando o melhor regime</div>
              <div className="font-mono-tech text-[36px] leading-none mt-2 text-[#c48b30]">{fmt(resultado.economia)}</div>
              <div className="text-[12px] text-[#6e7b7c] mt-1">/ano em tributos</div>
            </div>

            <p className="text-[11px] text-[#6e7b7c] mt-6 leading-snug">
              Estimativa baseada em alíquotas médias. Planejamento real depende de análise técnica completa da Cluny.
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
