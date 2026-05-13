import logoVerde from "@/assets/logo-cluny-verde.svg";
import logoBranco from "@/assets/logo-cluny-branco.svg";
import logoCinza from "@/assets/logo-cluny-cinza.svg";
import logoPreto from "@/assets/logo-cluny-preto.svg";

export type LogoVariant = "verde" | "branco" | "cinza" | "preto";

const SRC: Record<LogoVariant, string> = {
  verde: logoVerde,
  branco: logoBranco,
  cinza: logoCinza,
  preto: logoPreto,
};

/**
 * Cluny — official horizontal wordmark.
 * Use `height` to scale (width auto). Aspect ratio is preserved by the SVG viewBox.
 */
export function Logo({
  variant = "verde",
  height = 28,
  className = "",
}: {
  variant?: LogoVariant;
  height?: number;
  className?: string;
}) {
  return (
    <img
      src={SRC[variant]}
      alt="Cluny Gestão Empresarial"
      height={height}
      style={{ height, width: "auto", display: "block" }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}
