import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { nr } from "../types";
import {
  evaluateFunction,
  firstDerivative,
  secondDerivative,
} from "../data/NR";

interface IterationResult {
  iteration: number;
  xi: number;
  error: number;
}

export default function FNRM() {
  const [info, setInfo] = useState<nr>({
    fx: "x^2 + 2*x + 1",
    xi: 0,
    error: 0.1,
  });
  const [iterations, setIterations] = useState<IterationResult[]>([]);

  // Manejo del cambio en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [id]: id === "xi" || id === "error" ? parseFloat(value) || 0 : value,
    }));
  };

  // Verificación de validez del formulario
  const isFormValid = useCallback(() => {
    const { fx, xi, error } = info;
    return fx.trim() !== "" && !isNaN(xi) && error > 0;
  }, [info]);

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { fx, xi, error } = info;
    const tolerance = error;

    let currentXi = xi;
    let currentError = 100;
    let iteration = 1;
    const newIterations: IterationResult[] = [];

    while (currentError > tolerance) {
      const fxValue = evaluateFunction(fx, currentXi);
      const fxPrime = firstDerivative(fx, currentXi);
      const fxDoublePrime = secondDerivative(fx, currentXi);

      const nextXi =
        currentXi -
        (fxValue * fxPrime) / (Math.pow(fxPrime, 2) - fxValue * fxDoublePrime);

      currentError = Math.abs((nextXi - currentXi) / nextXi) * 100;

      newIterations.push({
        iteration,
        xi: nextXi, // Usamos nextXi para la siguiente iteración
        error: currentError,
      });

      // Actualizar los valores para la siguiente iteración
      currentXi = nextXi;
      iteration += 1;
    }

    setIterations(newIterations);
  };

  return (
    <div>
      <form>
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="fx" className="font-extrabold">
            F(x):
          </label>
          <input
            id="fx"
            type="text"
            value={info.fx}
            onChange={handleChange}
            className="h-8 w-full rounded-lg text-center"
            placeholder="Ej. x^2 + 2*x + 1"
          />

          <label htmlFor="xi" className="font-extrabold p-3">
            Xi
          </label>
          <input
            id="xi"
            type="number"
            step="0.01"
            value={info.xi}
            onChange={handleChange}
            className="h-8 w-full rounded-lg text-center"
            placeholder="Ej. 1, 2.2, 123.123"
          />

          <label htmlFor="error" className="font-extrabold p-3">
            % Error
          </label>
          <input
            id="error"
            type="number"
            step="0.01"
            value={info.error}
            onChange={handleChange}
            className="h-8 w-full rounded-lg text-center"
            placeholder="Ej. 0.1, 5, 100"
          />

          {/* Botón de envío */}
          <input
            type="submit"
            value="Resolver"
            onClick={handleSubmit}
            className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-1 w-full rounded hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
            disabled={!isFormValid()}
          />
        </div>
      </form>

      {/* Tabla de resultados de iteraciones */}
      {iterations.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold text-center">Resultados de Iteraciones</h2>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-indigo-900 rounded-t-lg">
              <tr>
                <th className="text-gray-300 px-4 py-2 rounded-tl-lg">
                  Iteración
                </th>
                <th className="text-gray-300 px-4 py-2">Xi Actual</th>
                <th className="text-gray-300 px-4 py-2 rounded-tr-lg">
                  % Error
                </th>
              </tr>
            </thead>
            <tbody>
              {iterations.map(({ iteration, xi, error }, index) => (
                <tr
                  key={iteration}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {iteration}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {xi.toFixed(6)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {error.toFixed(6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
