import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth(); // Verifica se o usuário está autenticado

    return user ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
