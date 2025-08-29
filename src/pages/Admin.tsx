const url = import.meta.env.VITE_API_URL;

function Admin() {

  async function limpiarSuscription() {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Vuelve a iniciar sesión')
    }
    try {
      const response = await fetch(`${url}/suscription/clean-subscription`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {

    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-8">
          <div className="border-b pb-4">
            <h2 className=" text-2xl text-gray-800 font-bold text-center">Bienvenido al modulo de administrador</h2>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-600 hover:bg-red-300 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition" onClick={limpiarSuscription}>Limpiar suscripciones caducadas</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default Admin