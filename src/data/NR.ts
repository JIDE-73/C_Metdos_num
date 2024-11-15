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

export function nrM(fx: string, xi: number, er: number): nr[] {
  let resultados: nr[] = []; // Arreglo que almacena los resultados
  let errorActual = Infinity; // Error completo o máximo
  // Valores para cálculos
  let i = 0;
  let xim1act = 0;
  let xim1ant = 0;
  // Calcular derivadas
  const der1 = math.derivative(fx, "x").toString();
  const der2 = math.derivative(der1, "x").toString();

  do {
    const scope = { x: xim1ant };

    if (i == 0) {
      xim1act = xi; // Si es la primera iteración, asignamos el valor inicial
    } else {
      // Calculamos el siguiente valor de xim1act utilizando la fórmula de Newton-Raphson Mejorado
      xim1act =
        xim1ant -
        (math.evaluate(fx, scope) * math.evaluate(der1, scope)) /
          (Math.pow(math.evaluate(der1, scope), 2) -
            math.evaluate(fx, scope) * math.evaluate(der2, scope));

      // Calculamos el error actual en función de los valores consecutivos de xim1act
      errorActual = math.abs((xim1act - xim1ant) / xim1act) * 100;
    }

    // Incrementamos la iteración
    i++;

    // Actualizamos el valor anterior para la siguiente iteración
    xim1ant = xim1act;

    // Actualizamos los resultados en cada ciclo
    resultados.push({
      iteracion: i,
      xi: xim1act,
      error: errorActual,
    });
  } while (errorActual > er); // Hacer mientras el error sea mayor al esperado

  return resultados; // Envío de resultados
}
