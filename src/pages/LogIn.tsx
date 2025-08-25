import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_API_URL;

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password) {
            return alert('Por favor completa todos los campos')
        }

        try {
            const response = await fetch(`${url}/clientes/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json();
            console.log(data)
            localStorage.setItem('token', data.token);
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
                <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
                        Inicia sesión
                    </h2>
                    <p className="text-center text-gray-500 mb-6">Ingresa tus datos</p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>
                        {/* Contraseña */}
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Contraseña</label>
                            <input
                                minLength={6}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$"
                                type='password'
                                id='password'
                                required
                                title="La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none'
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default SignUp