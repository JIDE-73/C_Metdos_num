import { useState } from "react";
import { mcl } from "../data/McL";
import { McL } from "../types";

export default function Mc() {
  // Estados para los valores de entrada y resultados
  const [x, setX] = useState<number>(0.25);
  const [terms, setTerms] = useState<number>(5);
  const [results, setResults] = useState<McL[]>([]);

  // Función para calcular la serie de Maclaurin
  const handleCalculate = () => {
    const result = mcl(x, terms);
    setResults(result);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Inputs para x y terms */}

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Valor de x:</label>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="border rounded px-3 py-2 text-center"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">
          Número de términos:
        </label>
        <input
          type="number"
          value={terms}
          onChange={(e) => setTerms(parseInt(e.target.value))}
          className="border rounded px-3 py-2 text-center"
        />
      </div>

      {/* Botón de cálculo */}
      <button
        onClick={handleCalculate}
        className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-2 w-full rounded hover:bg-indigo-700 cursor-pointer"
      >
        Calcular
      </button>

      {/* Tabla de resultados */}
      {results.length > 0 && (
        <div className="overflow-x-auto mt-6 w-full max-w-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-900">
              <tr>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Término
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Aproximación
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Error Relativo (%)
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Error Aproximado
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {result.approx}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {result.relE}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {result.approxE}
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
