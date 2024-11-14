import { useState } from "react";
import { Msec } from "../data/Sec"; // Asegúrate de que la función Msec esté bien importada
import { IteracionSecante } from "../types"; // Asegúrate de que IteracionSecante esté bien definida
import { iterSec } from "../types";

export default function MetodoSecante() {
  const [fx, setFx] = useState(""); // Valor de la función
  const [xiPrev, setXiPrev] = useState(0); // Valor de Xi-1
  const [xiCurr, setXiCurr] = useState(0); // Valor de Xi
  const [error, setError] = useState(0); // Valor del % de error
  const [resultados, setResultados] = useState<IteracionSecante[]>([]); // Almacenar resultados

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Llamamos a la función Msec y obtenemos los resultados
    const resultadosSecantes = Msec(fx, xiPrev, xiCurr, error);

    // Transformamos los resultados para que coincidan con IteracionSecante
    const resultadosTransformados: IteracionSecante[] = resultadosSecantes.map(
      (iter: iterSec) => ({
        iteraciones: iter.iteraciones,
        xi: iter.xiCurr, // Aquí asegúrate de usar las propiedades correctas de iterSec
        fxi: iter.fXiCurr, // Ajusta según el nombre de la propiedad
        error: iter.error, // Ajusta según el nombre de la propiedad
      })
    );

    // Actualiza el estado con los resultados transformados
    setResultados(resultadosTransformados);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Método de la Secante
      </h2>

      {/* Formulario para cambiar los valores */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-extrabold">
          F(x):
          <input
            type="text"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 8*x^3 + 2*x^2 - 5*x - 6"
          />
        </label>

        <label className="font-extrabold">
          Xi-1:
          <input
            type="number"
            step="0.01"
            value={xiPrev}
            onChange={(e) => setXiPrev(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 4, 3.2, 5.6"
          />
        </label>

        <label className="font-extrabold">
          Xi:
          <input
            type="number"
            step="0.01"
            value={xiCurr}
            onChange={(e) => setXiCurr(Number(e.target.value))}
            className="h-8 w-full rounded-lg text-center mt-2 p-2 border border-gray-300"
            placeholder="Ej. 5, 7.8"
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
            placeholder="Ej. 0.5, 2, 5"
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit} //no borrar
          className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-2 w-full rounded hover:bg-indigo-700 cursor-pointer"
        >
          Resolver
        </button>
      </form>

      {/* Tabla para mostrar los resultados */}
      {resultados.length > 0 && (
        <div className="mt-6 w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <h3 className="font-extrabold text-xl mb-3 text-center">
              Resultados:
            </h3>
            <div className="overflow-x-auto">
              {" "}
              {/* Añadimos desplazamiento horizontal */}
              <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-indigo-900">
                  <tr>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Iteración
                    </th>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Xi
                    </th>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      F(xi)
                    </th>
                    <th className="py-2 px-4 text-left text-gray-300 font-bold">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((resultado, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2 px-4 border-b border-gray-300">
                        {resultado.iteraciones}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {resultado.xi.toFixed(5)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {resultado.fxi.toFixed(5)}
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
        </div>
      )}
    </div>
  );
}
