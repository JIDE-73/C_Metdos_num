import { create, all, derivative, parse, evaluate } from "mathjs";

// Crear una instancia de mathjs
const math = create(all);

// Tipo para representar la información de la función
export type nr = {
  fx: string; // La función matemática como cadena
  xi: number; // Valor inicial para evaluar la función
  error: number; // Porcentaje de error
};

/**
 * Evalúa una función matemática en un valor específico.
 * @param {string} fx - La función matemática como cadena.
 * @param {number} xi - El valor en el que evaluar la función.
 * @returns {number} - El resultado de la evaluación.
 * @throws Will throw an error if the evaluation fails.
 */
export function evaluateFunction(fx: string, xi: number): number {
  const scope = { x: xi }; // Asignar el valor de xi a x
  return math.evaluate(fx, scope); // Evaluar la expresión
}

/**
 * Derivar una función matemática.
 * @param {string} fx - La función a derivar en formato string.
 * @param {string} variable - La variable con respecto a la cual derivar (por ejemplo, "x").
 * @returns {string} - La función derivada en formato string.
 */
export function deriveFunction(fx: string, variable: string = "x"): string {
  try {
    const expr = parse(fx); // Analizar la función
    const der = derivative(expr, variable); // Derivar la función
    return der.toString(); // Devolver la función derivada como string
  } catch (error) {
    console.error("Error al derivar la función:", error);
    return "";
  }
}

/**
 * Realiza un proceso iterativo para encontrar raíces usando el método de Newton-Raphson.
 * @param {nr} info - Un objeto que contiene la función, el valor inicial y el error permitido.
 * @param {number} iterations - Número de iteraciones a realizar.
 * @returns {Array<{ iteracion: number; xi: number; error: number }>} - Resultados de cada iteración.
 */
export function iterativeProcess(info: nr) {
  const results: { iteracion: number; xi: number; error: number }[] = [];

  let { fx, xi, error } = info;

  // Inicializar variables
  let i = 0; // Contador de iteraciones
  let percentageError = Infinity; // Inicializar el error para que entre en el bucle

  while (Math.abs(percentageError) > error) {
    const fxEvaluated = evaluateFunction(fx, xi);
    const derivativeString = deriveFunction(fx);
    const derivativeEvaluated = evaluateFunction(derivativeString, xi);

    // Calcular xi+1
    const xiPlusOne = xi - fxEvaluated / derivativeEvaluated;

    // Calcular el % error
    percentageError = ((xiPlusOne - xi) / xiPlusOne) * 100;

    // Almacenar el resultado en el arreglo
    results.push({
      iteracion: i + 1,
      xi: xiPlusOne,
      error: Math.abs(percentageError), // Usar el valor absoluto del error
    });

    // Actualizar xi para la próxima iteración
    xi = xiPlusOne;

    // Incrementar el contador de iteraciones
    i++;
  }

  return results;
}

/**
 * Calcula la primera derivada de una función en formato string y la evalúa en un punto dado.
 * @param fx - La función en formato string, por ejemplo "x^2 + 2*x + 1".
 * @param xValue - El valor de x en el cual se evaluará la primera derivada.
 * @returns - El resultado de evaluar la primera derivada en xValue.
 */
export function firstDerivative(fx: string, xValue: number): number {
  const fxPrime = derivative(fx, "x").toString();
  return evaluate(fxPrime, { x: xValue });
}

/**
 * Calcula la segunda derivada de una función en formato string y la evalúa en un punto dado.
 * @param fx - La función en formato string, por ejemplo "x^2 + 2*x + 1".
 * @param xValue - El valor de x en el cual se evaluará la segunda derivada.
 * @returns - El resultado de evaluar la segunda derivada en xValue.
 */
export function secondDerivative(fx: string, xValue: number): number {
  const fxDoublePrime = derivative(derivative(fx, "x"), "x").toString();
  return evaluate(fxDoublePrime, { x: xValue });
}
