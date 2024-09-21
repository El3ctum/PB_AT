import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, activeUserData } = useAuth();

    return user && activeUserData?.status === 'active' ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
