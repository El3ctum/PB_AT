import React from "react";
import { useUser } from "../hooks/useUser";

const Dashboard: React.FC = () => {
    const { activeUser } = useUser()
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{activeUser?.firstName}</p>
            <p>Teste</p>
        </div>
    )
}

export default Dashboard;