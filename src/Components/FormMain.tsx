import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/Categories";
import Te from "./3Errores";
import FNR from "./FNR";
import FNRM from "./FNRM";
import Bis from "./Biseccion";
import Sec from "./Secante";
import Mc from "./McL";

// Mapa de componentes de formularios por categoría
const formComponents: { [key: number]: JSX.Element } = {
  1: <Te />, //3 errores
  2: <Mc />, //McLaurin
  3: <></>, //Taylor
  4: <Bis />, //Biseccion
  5: <></>, //Interpolacion
  6: <FNR />, //Newton
  7: <FNRM />, //mejorado
  8: <Sec />, //Secante
  9: <></>, //
};

export default function Formulario() {
  // Estado de la categoría seleccionada
  const [category, setCategory] = useState<number>(1);

  // Listener para cambio de categoría
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar que la página se recargue
    // Aquí puedes agregar cualquier lógica que necesites al enviar el formulario
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-900 p-4">
      <form
        className="bg-indigo-200 p-10 rounded-lg border border-gray-500 w-full max-w-lg"
        onSubmit={handleSubmit} // Agregar el evento onSubmit
      >
        <div className="grid grid-cols-1 gap-4">
          <label htmlFor="category" className="font-extrabold text-lg">
            Selecciona una categoría:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="text-black rounded-lg border-2 p-2 w-full"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 gap-3">
            <label htmlFor="Valores" className="font-extrabold text-lg">
              Ingresa los valores:
            </label>
            {/* Renderiza el formulario correspondiente a la categoría seleccionada */}
            {formComponents[category] || (
              <p>Formulario no disponible para esta categoría.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
