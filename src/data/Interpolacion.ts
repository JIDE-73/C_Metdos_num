import { interPol } from "../types";

export default function inter(
  valores: { xn: number; fx: number }[], // Tabla con los valores de xn y fx
  x: number // Valor a interpolar
): interPol | null {
  // Verifica si hay suficientes datos para interpolar
  if (valores.length < 2) {
    console.error("Se necesitan al menos dos puntos para interpolar.");
    return null;
  }

  // Ordenar valores por xn por si llegan desordenados
  const sortedValores = [...valores].sort((a, b) => a.xn - b.xn);

  // Encontrar el rango donde x se encuentra
  for (let i = 0; i < sortedValores.length - 1; i++) {
    const x0 = sortedValores[i].xn;
    const x1 = sortedValores[i + 1].xn;
    const fx0 = sortedValores[i].fx;
    const fx1 = sortedValores[i + 1].fx;

    if (x >= x0 && x <= x1) {
      // Calcular f(x) usando la fórmula de interpolación lineal
      const fx = fx0 + ((fx1 - fx0) / (x1 + x0)) * (x - x0);

      return {
        x,
        fx,
        x0,
        x1,
        fx0,
        fx1,
      };
    }
  }
  return null;
}
