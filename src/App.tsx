import Main from "./Components/FormMain";

const App = () => {
  return (
    <>
      <header className="bg-gray-800 py-3 text-gray-400">
        <div className="max-w-4xl mx-auto flex justify-between px-4">
          <h1 className="text-center text-lg font-bold uppercase w-full">
            Calculadoras
          </h1>
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
