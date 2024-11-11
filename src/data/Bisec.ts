import * as math from "mathjs";
import { IteracionBiseccion } from "../types";

export function biseccion(
  fx: string,
  xi: number,
  xs: number,
  error: number
): IteracionBiseccion[] {
  let xiActual = xi;
  let xsActual = xs;
  let xrAnt = 0;
  let xrAct = 0;
  let errorAct = 100; // Comienza con un valor alto
  let iteraciones: IteracionBiseccion[] = []; // Array para almacenar las iteraciones

  while (errorAct > error) {
    const xr = (xiActual + xsActual) / 2; // Calculo de xr
    xrAct = xr; // Actualizamos xrAct

    // Calculamos el error (si no es la primera iteración)
    if (iteraciones.length === 0) {
      errorAct = 100;
    } else {
      errorAct = (Math.abs(xrAct - xrAnt) / Math.abs(xrAct)) * 100;
    }

    // Evaluación de la función en xi y xr
    const fxi = math.evaluate(fx, { x: xiActual });
    const fxr = math.evaluate(fx, { x: xrAct });
    const camb = fxi * fxr;

    // Guardamos los resultados de esta iteración
    iteraciones.push({
      iteracion: iteraciones.length + 1,
      xi: xiActual,
      xs: xsActual,
      xr: xrAct,
      fxi,
      fxr,
      camb,
      er: errorAct,
    });

    // Actualizamos xi y xs según el valor de camb
    if (camb < 0) {
      xsActual = xr;
    } else {
      xiActual = xr;
    }

    // Actualizamos xrAnt para la próxima iteración
    xrAnt = xrAct;
  }

  return iteraciones;
}
