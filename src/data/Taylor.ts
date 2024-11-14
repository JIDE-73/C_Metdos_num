import * as math from "mathjs";
import { serieT } from "../types";

// Función para calcular la Serie de Taylor
export function Taylor(
  fx: string,
  xi: number,
  h: number,
  terms: number
): serieT[] {
  let resultados: serieT[] = [];
  let valorAnterior = 0;
  let valorInicial = math.evaluate(fx, { x: h });
  // Iteramos por el número de términos especificado
  for (let i = 0; i < terms; i++) {
    let term;

    // Si es la primera iteración, evaluamos la función original en `xi`
    if (i === 0) {
      term = math.evaluate(fx, { x: xi });
    } else {
      // Derivamos la función `i` veces para obtener el término en la serie de Taylor
      let derivada = math.derivative(fx, "x");
      for (let j = 1; j < i; j++) {
        derivada = math.derivative(derivada, "x");
      }
      // Evaluamos la derivada en `xi` y aplicamos el término de Taylor correspondiente
      term =
        (math.evaluate(derivada.toString(), { x: xi }) * Math.pow(h, i)) /
        factorial(i);
    }

    // Calculamos el valor aproximado
    let valorAprox = i === 0 ? term : term + valorAnterior;

    // Calcular el error de truncamiento
    let errorTruncamiento = valorInicial - valorAprox;

    // Agregamos el resultado de esta iteración
    resultados.push({
      iteracion: i + 1,
      AproV: parseFloat(valorAprox.toFixed(5)),
      errorTr: parseFloat(errorTruncamiento.toFixed(5)),
    });

    // Actualizamos el valor anterior para la próxima iteración
    valorAnterior = valorAprox;
  }

  return resultados;
}

// Función para calcular el factorial (necesario para los términos de Taylor)
function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
