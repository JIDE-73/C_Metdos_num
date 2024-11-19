export default function Integrantes() {
  const teamMembers = [
    {
      name: "Juan Pérez",
      role: "Desarrollador Frontend",
      description: "Experto en React y diseño de interfaces.",
    },
    {
      name: "Ana Gómez",
      role: "Desarrolladora Backend",
      description: "Especialista en Node.js y bases de datos.",
    },
    {
      name: "Carlos López",
      role: "Diseñador UX/UI",
      description: "Crea experiencias de usuario excepcionales.",
    },
  ];

  return (
    <div className="bg-gray-800 text-gray-400 min-h-screen py-8">
      <header className="bg-gray-800 py-3 text-gray-400">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-center text-lg font-bold uppercase flex-1">
            Equipo de Trabajo
          </h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-indigo-900 text-white rounded-lg p-6 hover:bg-indigo-700 transition-colors"
            >
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-sm text-gray-300">{member.role}</p>
              <p className="mt-4">{member.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
