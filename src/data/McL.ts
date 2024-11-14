import { factorial, evaluate } from "mathjs";
import { McL } from "../types";
// Función para calcular la serie de Maclaurin de e^x
export function mcl(x: number, terms: number): McL[] {
  let approximation = 0;
  let previousApproximation = 0;
  const exactValue = evaluate(`e^${x}`); // Valor exacto de e^x
  let resultados: McL[] = [];

  for (let n = 0; n < terms; n++) {
    const term = Math.pow(x, n) / factorial(n);
    approximation += term;

    // Calcular errores
    const relativeError =
      Math.abs((exactValue - approximation) / exactValue) * 100;
    const approximateError =
      n === 0
        ? 0
        : Math.abs((approximation - previousApproximation) / approximation) *
          100;

    // Almacenar el resultado para este término en el array
    resultados.push({
      approx: parseFloat(approximation.toFixed(5)),
      relE: parseFloat(relativeError.toFixed(5)),
      approxE: parseFloat(approximateError.toFixed(5)),
    });

    // Actualizar previousApproximation para la próxima iteración
    previousApproximation = approximation;
  }

  return resultados;
}
