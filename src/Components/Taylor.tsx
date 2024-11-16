import React, { useState } from "react";
import { Taylor } from "../data/Taylor";
import { serieT } from "../types";

export default function Tay() {
  const [fx, setFx] = useState("-0.1x^4 -0.15x^3 -0.5x^2 -0.25*x +1.2");
  const [xi, setXi] = useState<number | string>("0");
  const [h, setH] = useState<number | string>("1");
  const [terms, setTerms] = useState<number | string>("");
  const [resultados, setResultados] = useState<serieT[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const xiNum = parseFloat(xi as string);
    const hNum = parseFloat(h as string);
    const termsNum = parseInt(terms as string, 10);
    const resultadosTaylor = Taylor(fx, xiNum, hNum, termsNum);
    setResultados(resultadosTaylor);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Inputs para fx, xi, h y terms */}
      <div className="flex flex-col space-y-4 mb-4 w-full max-w-md">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Función (fx):</label>
          <input
            type="text"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            placeholder="Ej: x^2 + sin(x)"
            required
            className="border rounded px-3 py-2 text-center"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">
            Punto de expansión (xi):
          </label>
          <input
            type="number"
            value={xi}
            onChange={(e) => setXi(e.target.value)}
            placeholder="Ej: 0"
            required
            className="border rounded px-3 py-2 text-center"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">
            Desplazamiento (h):
          </label>
          <input
            type="number"
            value={h}
            onChange={(e) => setH(e.target.value)}
            placeholder="Ej: 1"
            required
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
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Ej: 5"
            required
            className="border rounded px-3 py-2 text-center"
          />
        </div>
      </div>

      {/* Botón de cálculo */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-2 w-full rounded hover:bg-indigo-700 cursor-pointer"
      >
        Calcular
      </button>

      {/* Tabla de resultados */}
      {resultados.length > 0 && (
        <div className="overflow-x-auto mt-6 w-full max-w-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-900">
              <tr>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Iteración
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Aproximación
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Error de Truncamiento
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((resultado, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    {resultado.iteracion}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {resultado.AproV}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {resultado.errorTr}
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
