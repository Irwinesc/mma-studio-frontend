import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col justify-center items-center text-center px-6">
      {/* Logo o título */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-wide">
        Imperio <span className="text-red-600">MMA</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-300 max-w-xl mb-10">
        Entrena, progresa y lleva tu disciplina al siguiente nivel.  
        Regístrate y obtén tu acceso exclusivo.
      </p>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/signUp")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition"
        >
          Clase muestra gratuita
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
