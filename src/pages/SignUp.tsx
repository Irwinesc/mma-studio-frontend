import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_API_URL;

const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [classes, setClasses] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('Las contraseñas no coinciden')
        }

        if (!name || !lastName || !gender || !email || !telephone || !address || !classes) {
            return alert('Por favor completa todos los campos')
        }

        try {
            const response = await fetch(`${url}/clientes/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    gender,
                    email,
                    telephone: +telephone,
                    address,
                    password,
                    online: classes === 'true' ? true : false
                })
            })

            if (response.status === 409) {
              return alert('El correo ya está registrado')
            }
            const data = await response.json();
            console.log(data)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
                <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
                        Inscríbete a tu clase muestra
                    </h2>
                    <p className="text-center text-gray-500 mb-6">Llena el formulario</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre(s)</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* Apellido */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido(s)</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* Género */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                id="telephone"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* Dirección */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>

                        {/* Clases */}
                        <div>
                            <label htmlFor="classes" className="block text-sm font-medium text-gray-700">Clases</label>
                            <select
                                id="classes"
                                value={classes}
                                onChange={(e) => setClasses(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="false">Presenciales</option>
                                <option value="true">En línea</option>
                            </select>
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
                        <div>
                            <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>Confirmar Contraseña</label>
                            <input
                                type='password'
                                id='confirm-password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none'
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default SignUp