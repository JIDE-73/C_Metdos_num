import { useState } from "react";
import { nrM } from "../data/NR";
import { nr } from "../types";

export default function NewtonRaphsonMejorado() {
  const [fx, setFx] = useState<string>("x^3 - 4*x^2 +6x -24");
  const [xi, setXi] = useState<number>(3);
  const [error, setError] = useState<number>(0.1);
  const [resultados, setResultados] = useState<nr[]>([]);

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previene la recarga de la página
    const res = nrM(fx, xi, error); // Ejecuta la función Newton-Raphson Mejorado
    setResultados(res); // Almacena los resultados en el estado
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Formulario para cambiar los valores */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-lg"
      >
        <label className="font-extrabold">
          F(x):
          <input
            type="text"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. x^3 - 2*x - 5"
            tabIndex={1} // Tabula primero a este campo
          />
        </label>

        <label className="font-extrabold">
          Xi:
          <input
            type="number"
            step="0.01"
            value={xi}
            onChange={(e) => setXi(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 2, 3.1, 5"
            tabIndex={2} // Tabula a este campo segundo
          />
        </label>

        <label className="font-extrabold">
          % Error:
          <input
            type="number"
            step="0.01"
            value={error}
            onChange={(e) => setError(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 0.01, 0.1"
            tabIndex={3} // Tabula a este campo tercero
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-2 w-full rounded hover:bg-indigo-700 cursor-pointer"
          tabIndex={4} // Este botón será el siguiente
        >
          Resolver
        </button>
      </form>

      {/* Tabla para mostrar los resultados */}
      {resultados.length > 0 && (
        <div className="overflow-x-auto mt-6 w-full max-w-md">
          <div className="w-full max-w-4xl">
            <h3 className="font-extrabold text-xl mb-3 text-center">
              Resultados:
            </h3>
            <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-indigo-900">
                <tr>
                  <th className="py-2 px-2 text-left text-gray-300 font-bold">
                    Iteración
                  </th>
                  <th className="py-2 px-4 text-left text-gray-300 font-bold">
                    Xi
                  </th>
                  <th className="py-2 px-4 text-left text-gray-300 font-bold">
                    % Error
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-2 border-b border-gray-300">
                      {resultado.iteracion}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {resultado.xi.toFixed(5)}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {resultado.error.toFixed(5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
