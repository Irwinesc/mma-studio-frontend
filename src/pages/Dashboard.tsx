import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
const url = import.meta.env.VITE_API_URL;
import QRCode from "react-qr-code";

interface DecodedToken {
    id: string;
}

type user = {
    _id: string
    activeSubscription: boolean
    subscription: string
    subscriptionEndDate: Date | null
    idNumber: string
}

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState<user | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function consultarDatos() {
        const token = localStorage.getItem('token');
        if (!token) {
            return alert('Vuelve a iniciar sesión');
        }
        const decode = jwtDecode<DecodedToken>(token);
        const { id } = decode;
        try {
            const response = await fetch(`${url}/clientes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()
            if (data?.error) {
                console.log(data.error)
                if (data.error === 'Sesión expirada. Por favor, inicia sesión nuevamente.') {
                    alert(data.error)
                    return navigate('/login')
                }
            }
            console.log(data)
            setUser(data.cliente)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        consultarDatos()
    }, [])

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("es-ES", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getQrColor = (expirationDate: Date | null) => {
        if (expirationDate === null) {
            return "#000000";
        }
        const today = new Date();
        const remainingDays = Math.ceil((new Date(expirationDate).getTime() - today.getTime()) / (1000 * 3600 * 24));

        if (remainingDays > 20) {
            return "#4CAF50"; // Verde
        } else if (remainingDays <= 20 && remainingDays > 10) {
            return "#FFEB3B"; // Amarillo
        } else if (remainingDays <= 10 && remainingDays > 5) {
            return "#FF9800"; // Naranja (rojo también funciona)
        } else if (remainingDays <= 5 && remainingDays > 0) {
            return "#F44336"; // Rojo
        } else {
            return "#000000"; // Negro si ya caducó
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg font-semibold text-gray-600 animate-pulse">
                    Cargando...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-8">
                {user ? (
                    <>
                        {/* Encabezado */}
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Bienvenido a tu Dashboard
                            </h2>
                            <p className="text-gray-600">
                                Número de cliente: <span className="font-semibold">{user.idNumber}</span>
                            </p>
                        </div>

                        {/* Estado de la suscripción */}
                        {user.activeSubscription && user.subscriptionEndDate !== null ? (
                            <div className="bg-indigo-50 rounded-xl p-6 shadow-inner">
                                <p className="text-lg text-gray-700">
                                    <span className="font-semibold">Plan activo:</span> {user.subscription}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Vence el:</span>{" "}
                                    {formatDate(user.subscriptionEndDate)}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-red-50 rounded-xl p-6 text-center shadow-inner">
                                <p className="text-lg text-gray-700 mb-4">
                                    No tienes una suscripción activa.
                                </p>
                                <button
                                    onClick={() => navigate("/suscriptions")}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition"
                                >
                                    Ver planes de suscripción
                                </button>
                            </div>
                        )}

                        {/* QR de acceso */}
                        <div className="flex flex-col items-center space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Código QR de acceso
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                                <QRCode
                                    value={JSON.stringify({
                                        idNumber: user.idNumber,
                                        _id: user._id,
                                        subscriptionEndDate: user.subscriptionEndDate,
                                        subscription: user.subscription,
                                    })}
                                    size={200}
                                    fgColor={getQrColor(user.subscriptionEndDate)}
                                    level="H"
                                />
                            </div>
                            {/* Botón de cerrar sesión */}
                            <div className="flex justify-end">
                                <button
                                    onClick={logout}
                                    className="bg-red-200 hover:bg-red-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-600">
                        No se encontró información de usuario.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Dashboard