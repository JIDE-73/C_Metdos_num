// Importa las imágenes

import leo from "../assets/leo.jpg";

//import Iconos
import gitIcon from "../assets/git.svg";
import linkedIcon from "../assets/linked.svg";
import igIcon from "../assets/ig.svg";
import faceIcon from "../assets/facebook.svg";

export default function Integrantes() {
  const teamMembers = [
    {
      name: "Leonardo Sebastian Jimenez Delgado",
      role: "Desarrolladora Backend",
      description: "Desarrollador experto en React",
      image: leo,
      icons: [
        { icon: gitIcon, link: "https://github.com/JIDE-73" },
        {
          icon: linkedIcon,
          link: "https://www.linkedin.com/in/leonardo-jim%C3%A9nez-29725b338/",
        },
        { icon: igIcon, link: "https://www.instagram.com/limon_leo_limon/" },
        { icon: faceIcon, link: "https://www.facebook.com/taquitos.leonardo" },
      ],
    },
  ];

  return (
    <div className="bg-gray-400 text-gray-800 min-h-screen py-8">
      <main className="max-w-6xl mx-auto px-4">
        <ul className="space-y-5">
          {teamMembers.map((member, index) => (
            <li
              key={index}
              className="bg-indigo-900 text-white rounded-lg p-6 hover:bg-indigo-700 transition-colors shadow-md"
            >
              {/* Imagen centrada y redonda */}
              <div className="w-full h-40 mb-4 flex justify-center items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  <img
                    src={member.image} // Usamos la ruta importada
                    alt={`Foto de ${member.name}`}
                    className="w-full h-full object-cover" // Aseguramos que la imagen cubra el contenedor
                  />
                </div>
              </div>
              {/* Contenido */}
              <h2 className="text-4xl font-bold">{member.name}</h2>
              <p className="text-2xl text-gray-300">{member.role}</p>
              <p className="text-xl mt-4">{member.description}</p>
              {/* Íconos */}
              <div className="flex space-x-4 mt-6 justify-center">
                {member.icons.map((icon, i) => (
                  <a
                    key={i}
                    href={icon.link}
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={icon.icon} // Usamos la ruta importada para los íconos
                      alt={`Ícono de ${icon.link}`}
                      className="w-10 h-10" // Tamaño del ícono
                    />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
