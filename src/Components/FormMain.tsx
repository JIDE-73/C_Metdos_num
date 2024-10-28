import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/Categories";
import FNR from "./FNR";
import FNRM from "./FNRM";

// Mapa de componentes de formularios por categoría
const formComponents: { [key: number]: JSX.Element } = {
  1: <></>,
  2: <></>,
  3: <></>,
  4: <></>,
  5: <></>,
  6: <FNR />,
  7: <FNRM />,
  8: <></>,
  9: <></>,
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
    <form
      className="p-10 rounded-lg border border-gray-500 bg-indigo-200"
      onSubmit={handleSubmit} // Agregar el evento onSubmit
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-extrabold">
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
          <label htmlFor="Valores" className="font-extrabold">
            Ingresa los valores:
          </label>
          {/* Renderiza el formulario correspondiente a la categoría seleccionada */}
          {formComponents[category] || (
            <p>Formulario no disponible para esta categoría.</p>
          )}
        </div>
      </div>
    </form>
  );
}
