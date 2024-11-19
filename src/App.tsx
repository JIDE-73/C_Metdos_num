import Main from "./Components/FormMain";
import dev from "./Components/Integrantes";

const App = () => {
  return (
    <>
      <header className="bg-gray-800 py-3 text-gray-400">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-center text-lg font-bold uppercase flex-1">
            Calculadoras
          </h1>
          <button
            type="submit"
            className="text-white bg-slate-900 hover:text-indigo-950 p-3 rounded hover:bg-slate-500 cursor-pointer"
          >
            Desarrolladores
          </button>
        </div>
      </header>

      <section className="py-6 text-gray-700 bg-indigo-900 min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4">
          <Main />
        </div>
      </section>
    </>
  );
};

export default App;
