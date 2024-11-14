import { useState, ChangeEvent, FormEvent } from "react";
import { nr } from "../types"; // tipos de info
import { iterativeProcess } from "../data/NR"; // import de tus funciones matemáticas

export default function FNR() {
  const [info, setInfo] = useState<nr>({
    fx: "x^2 + 2*x + 1",
    xi: 0,
    error: 0,
  });
  const [resultados, setResultados] = useState<
    { iteracion: number; xi: number; error: number }[]
  >([]);

  // Listener de cambio en valores de input
  const LisChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [id]: id === "xi" || id === "error" ? +value || 0 : value,
    }));
  };

  // Manejo del envío del formulario: evaluación y derivación
  const inSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Llama a la función iterativa para calcular los resultados
      const resultadosIterativos = iterativeProcess(info);
      setResultados(resultadosIterativos); // Almacena los resultados en el estado

      // Llama a la función deriveFunction para obtener la derivada de la función
      //const derived = deriveFunction(info.fx);
      //setDerivada(derived); // Almacena la derivada en el estado
    } catch (error) {
      console.error("Error al procesar:", error);
    }
  };

  return (
    <form onSubmit={inSubmit}>
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="fx" className="font-extrabold">
          F(x):
        </label>
        <input
          id="fx"
          type="text"
          value={info.fx}
          onChange={LisChange}
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
          onChange={LisChange}
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
          onChange={LisChange}
          className="h-8 w-full rounded-lg text-center"
          placeholder="Ej. 0.1, 5, 100"
        />
        <button
          type="button" // Cambiar el tipo a "button"
          onClick={inSubmit} // Maneja el clic, por alguna razon marca error pero si lo borras no funciona
          className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-1 w-full rounded hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
        >
          Resolver
        </button>
      </div>

      {/* Mostrar resultados de las iteraciones */}
      {resultados.map((resultado, index) => (
        <div className="mt-4">
          <h3 className="font-extrabold text-xl mb-2">Resultados:</h3>
          <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-indigo-900">
              <tr className="rounded-t-lg">
                <th className="py-2 px-4 text-left text-gray-300 font-bold rounded-tl-lg">
                  Iteración
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold">
                  Xi
                </th>
                <th className="py-2 px-4 text-left text-gray-300 font-bold rounded-tr-lg">
                  % Error
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b border-gray-300">
                  {resultado.iteracion}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {resultado.xi.toFixed(5)}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {resultado.error.toFixed(5)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </form>
  );
}
