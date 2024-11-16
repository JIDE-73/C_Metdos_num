import { useState } from "react";
import inter from "../data/Interpolacion";

export default function Interpolacion() {
  //manejo de informacion de la tabla
  const [tabla, setTabla] = useState<{ xn: number; fx: number }[]>([
    { xn: 0.564, fx: 1.23456 },
    { xn: 1.345, fx: 2.87654 },
    { xn: 2.789, fx: 4.56789 },
    { xn: 3.456, fx: 6.12345 },
    { xn: 4.123, fx: 7.65432 },
    { xn: 5.789, fx: 9.87654 },
    { xn: 6.432, fx: 10.34567 },
  ]);
  //envio de comparacion de la tabla y el valor a interpolar
  const [valorX, setValorX] = useState<number>(2);
  const [resultado, setResultado] = useState<{
    x: number;
    fx: number;
    x0: number;
    x1: number;
    fx0: number;
    fx1: number;
  } | null>(null);

  //actualizacion de valores en la tabla
  const handleTablaChange = (
    index: number,
    field: "xn" | "fx",
    value: number
  ) => {
    const nuevaTabla = [...tabla];
    nuevaTabla[index][field] = value;
    setTabla(nuevaTabla);
  };

  //manejo del calculo para interpolacion
  const calcularInterpolacion = () => {
    const resultadoInter = inter(tabla, valorX);
    setResultado(resultadoInter);
  };

  return (
    <div className="overflow-x-auto mt-6 w-full max-w-md">
      <table className="min-w-full bg-gray-300 border border-gray-300 rounded-lg shadow-md table-auto">
        <thead className="bg-indigo-900">
          <tr>
            <th className="py-2 px-4 text-gray-300 font-bold">#</th>
            <th className="py-2 px-4 text-gray-300 font-bold">Xn</th>
            <th className="py-2 px-4 text-gray-300 font-bold">f(Xn)</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((fila, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4 border-b border-gray-300">
                {index + 1}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <input
                  type="number"
                  step="any"
                  value={fila.xn}
                  onChange={(e) =>
                    handleTablaChange(index, "xn", Number(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-300 p-1"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                <input
                  type="number"
                  step="any"
                  value={fila.fx}
                  onChange={(e) =>
                    handleTablaChange(index, "fx", Number(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-300 p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="font-bold">
          Valor a interpolar (x):
          <input
            type="number"
            step="any"
            value={valorX}
            onChange={(e) => setValorX(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 p-2 mt-2"
          />
        </label>
      </div>

      <button
        onClick={calcularInterpolacion}
        className="text-white bg-indigo-900 hover:text-yellow-500 p-3 my-4 w-full rounded hover:bg-indigo-700"
      >
        Calcular Interpolación
      </button>

      {resultado && (
        <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-2xl font-bold text-center text-indigo-900 mb-4">
            Resultado
          </h3>
          <div className="text-center space-y-2">
            <div className="text-lg font-medium text-gray-800">
              f(<span className="text-indigo-600 font-bold">{resultado.x}</span>
              ) ={" "}
              <span className="text-indigo-600 font-bold">
                {resultado.fx.toFixed(5)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Usando puntos:{" "}
                <span className="font-bold text-indigo-700">
                  x₀ = {resultado.x0}, f(x₀) = {resultado.fx0.toFixed(5)}
                </span>
              </p>
              <p>
                y{" "}
                <span className="font-bold text-indigo-700">
                  x₁ = {resultado.x1}, f(x₁) = {resultado.fx1.toFixed(5)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
