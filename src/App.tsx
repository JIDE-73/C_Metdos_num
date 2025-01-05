import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Main from "./Components/FormMain";
import Integrantes from "./Components/Integrantes";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 py-3 text-gray-400">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        {/* Navegar a la página anterior al hacer clic en el título */}
        <h1
          className="text-center text-lg font-bold uppercase flex-1 cursor-pointer hover:text-gray-200"
          onClick={() => navigate(-1)} // Navega a la página anterior
        >
          Calculadoras
        </h1>
        <button
          type="button"
          onClick={() => navigate("/integrantes")}
          className="text-white bg-slate-700 hover:text-indigo-950 p-3 rounded hover:bg-slate-500 cursor-pointer border border-indigo-900 hover:border-indigo-700"
        >
          Desarrollador
        </button>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Ruta raíz que muestra <Main /> */}
        <Route
          path="/C_Metdos_num"
          element={
            <section className="py-6 text-gray-700 bg-indigo-900 min-h-screen">
              <div className="w-full max-w-4xl mx-auto px-4">
                <Main />
              </div>
            </section>
          }
        />
        {/* Ruta para el componente <Integrantes /> */}
        <Route path="/integrantes" element={<Integrantes />} />
      </Routes>
    </Router>
  );
};

export default App;
