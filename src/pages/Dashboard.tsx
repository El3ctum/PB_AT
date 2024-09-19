import React from "react";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
    const { activeUserData } = useAuth()
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{activeUserData?.role}</p>
            <p>Teste</p>
        </div>
    )
}

export default Dashboard;