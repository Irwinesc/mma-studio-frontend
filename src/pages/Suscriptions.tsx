function handleSuscription(price: number) {
  console.log(`Suscripción de $${price} seleccionada`);
}

function Suscriptions() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Título */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Planes de Suscripción</h1>

      {/* Contenedor de planes */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {/* Plan Básico */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Plan Básico</h2>
          <p className="text-gray-500 mb-4">2 clases por semana al mes</p>
          <span className="block text-3xl font-extrabold text-indigo-600 mb-6">$2500</span>
          <button
            onClick={() => handleSuscription(2500)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            Suscribirme
          </button>
        </div>

        {/* Plan Intermedio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300 border-2 border-indigo-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Plan Intermedio</h2>
          <p className="text-gray-500 mb-4">3 clases por semana al mes</p>
          <span className="block text-3xl font-extrabold text-indigo-600 mb-6">$2800</span>
          <button
            onClick={() => handleSuscription(2800)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            Suscribirme
          </button>
        </div>

        {/* Plan Avanzado */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition transform duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Plan Avanzado</h2>
          <p className="text-gray-500 mb-4">5 clases por semana al mes</p>
          <span className="block text-3xl font-extrabold text-indigo-600 mb-6">$3000</span>
          <button
            onClick={() => handleSuscription(3000)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            Suscribirme
          </button>
        </div>
      </div>
    </div>
  );
}

export default Suscriptions;
