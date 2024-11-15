import * as math from "mathjs"; //libreria de matematicas
import { nr } from "../types"; //interface

//funcion newton rapshon
export function nR(fx: string, xi: number, er: number): nr[] {
  let resultados: nr[] = []; //arreglo que alamcena los resultados
  let errorActual = Infinity; //error ompleto o maximo
  //valores para calculos
  let i = 0;
  let xim1act = 0;
  let xim1ant = 0;
  //calcular derivadas
  const der = math.derivative(fx, "x").toString();

  do {
    const scope = { x: xim1act };
    if (i == 0) {
      xim1act = xi;
    } else {
      xim1act = xim1ant - math.evaluate(fx, scope) / math.evaluate(der, scope);
      errorActual = math.abs((xim1act - xim1ant) / xim1act) * 100;
    }

    i++; //incrementamos la iteracion
    xim1ant = xim1act; //actualizamos el valor anterior

    //actualizamos los resultados en cada ciclo
    resultados.push({
      iteracion: i,
      xi: xim1act,
      error: errorActual,
    });
  } while (er <= errorActual); //hacer mientras el error sea mayor al esperado

  return resultados; //envio de resultados
}

//funcion Newton Rapshon Mejorado
export function nrM(fx: string, xi: number, er: number): nr[] {
  let resultados: nr[] = []; //arreglo que alamcena los resultados
  let errorActual = Infinity; //error ompleto o maximo
  //valores para calculos
  let i = 0;
  let xim1act = 0;
  let xim1ant = 0;
  //calcular derivadas
  const der1 = math.derivative(fx, "x").toString();
  const der2 = math.derivative(der1, "x").toString();

  do {
    const scope = { x: xim1act };
    if (i == 0) {
      xim1act = xi;
    } else {
      xim1act =
        xim1ant -
        (math.evaluate(fx, scope) * math.evaluate(der1, scope)) /
          Math.pow(math.evaluate(der1, scope), 2) -
        math.evaluate(fx, scope) * math.evaluate(der2, scope);
      errorActual = math.abs((xim1act - xim1ant) / xim1act) * 100;
    }

    i++; //incrementamos la iteracion
    xim1ant = xim1act; //actualizamos el valor anterior

    //actualizamos los resultados en cada ciclo
    resultados.push({
      iteracion: i,
      xi: xim1act,
      error: errorActual,
    });
  } while (er <= errorActual); //hacer mientras el error sea mayor al esperado

  return resultados; //envio de resultados
}
