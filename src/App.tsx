import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Suscriptions from './pages/Suscriptions'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes'
import Admin from './pages/Admin'
import AdminRoute from './components/AdminRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/suscriptions' element={<Suscriptions />} />
        <Route path='/login' element={<LogIn />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Rutas de administrador */}
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<Admin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
