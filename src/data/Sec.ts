import * as math from "mathjs";
import { iterSec } from "../types";

export function Msec( // valores que acepta
  fx: string, // La función f(x) en formato de string
  xiPrev: number, // Aproximación anterior (x_i-1)
  xiCurr: number, // Aproximación actual (x_i)
  errorThreshold: number // Umbral de error para detener las iteraciones
): iterSec[] {
  let xiNext = 0; // Próxima aproximación (x_{i+1})
  let errorCurr = Infinity; // Error inicial (muy alto)
  let fXiPrev = 0; // f(x_i-1)
  let fXiCurr = 0; // f(x_i)
  let fXiNext = 0; // f(x_{i+1})
  let iterations: iterSec[] = []; // Arreglo para almacenar los resultados de las iteraciones

  while (errorCurr > errorThreshold) {
    // Evaluamos la función en los puntos xiPrev y xiCurr
    fXiPrev = math.evaluate(fx, { x: xiPrev });
    fXiCurr = math.evaluate(fx, { x: xiCurr });

    // Calculamos la siguiente aproximación xi+1
    xiNext = xiCurr - (fXiCurr * (xiPrev - xiCurr)) / (fXiPrev - fXiCurr);
    fXiNext = math.evaluate(fx, { x: xiNext });

    // Calculamos el error relativo
    if (iterations.length === 0) {
      errorCurr = 100; // Inicializamos el error en la primera iteración
    } else {
      errorCurr = (Math.abs(xiNext - xiCurr) / Math.abs(xiNext)) * 100;
    }

    // Guardamos los valores de esta iteración
    iterations.push({
      iteraciones: iterations.length + 1, // Contador de iteraciones
      xiCurr: parseFloat(xiCurr.toFixed(5)), // xi actual redondeado
      xiPrev: parseFloat(xiPrev.toFixed(5)), // xi anterior redondeado
      xiNext: parseFloat(xiNext.toFixed(5)), // xi+1 redondeado
      fXiNext: parseFloat(fXiNext.toFixed(5)), // f(xi+1) redondeado
      fXiPrev: parseFloat(fXiPrev.toFixed(5)), // f(xi-1) redondeado
      fXiCurr: parseFloat(fXiCurr.toFixed(5)), // f(xi) redondeado
      error: parseFloat(errorCurr.toFixed(5)), // Error redondeado
    });

    // Actualizamos los valores para la siguiente iteración
    xiPrev = xiCurr; // El xi actual pasa a ser el xi anterior para la próxima iteración
    xiCurr = xiNext; // El xi+1 calculado pasa a ser el xi actual
  }

  return iterations; // Devolvemos el array de iteraciones con todos los datos
}
