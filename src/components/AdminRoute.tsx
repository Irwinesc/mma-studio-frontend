import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    role: string;
}

const AdminRoute: React.FC = () => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        console.log(decoded)
        return decoded.role === 'admin' ? (<Outlet />) : <Navigate to="/login" />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;
