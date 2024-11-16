import { useState } from "react";
import { Terroress } from "../data/3Errores"; // Asegúrate de que la ruta sea correcta
import { Terrores } from "../types";

export default function CalcularErrores() {
  const [vReal, setVReal] = useState<number>(4.5);
  const [vAprox, setVAprox] = useState<number>(4.444);
  const [errores, setErrores] = useState<Terrores[]>([]);

  // Manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previene la recarga de la página
    const resultados = Terroress(vReal, vAprox); // Llama a la función Terroress
    setErrores(resultados); // Guarda los resultados en el estado
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Formulario para los valores */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-lg"
      >
        <label className="font-extrabold">
          Valor Real:
          <input
            type="number"
            step="0.01"
            value={vReal}
            onChange={(e) => setVReal(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 3.14159"
          />
        </label>

        <label className="font-extrabold">
          Valor Aproximado:
          <input
            type="number"
            step="0.01"
            value={vAprox}
            onChange={(e) => setVAprox(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 3.14"
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-2 w-full rounded hover:bg-indigo-700 cursor-pointer"
        >
          Calcular Errores
        </button>
      </form>

      {/* Tabla para mostrar los resultados */}
      {errores.length > 0 && (
        <div className="overflow-x-auto mt-6 w-full max-w-md">
          <div className="w-full max-w-4xl">
            <h3 className="font-extrabold text-xl mb-3 text-center">
              Resultados de Errores:
            </h3>
            <div className="overflow-x-auto">
              {/* Añadir scroll horizontal si la tabla excede el ancho */}
              <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-indigo-900">
                  <tr>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Error Absoluto
                    </th>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Error Relativo
                    </th>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Error Porcentual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {errores.map((error, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2 px-4 border-b border-gray-300">
                        {error.eAbsoluto.toFixed(5)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {error.eRelativo.toFixed(5)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {error.ePorcentual.toFixed(5)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
