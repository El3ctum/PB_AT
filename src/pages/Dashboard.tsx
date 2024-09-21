import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const { activeUserData, loading, error } = useAuth();

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold">Welcome, {activeUserData?.firstName}!</h2>
                <p className="text-gray-600">Role: {activeUserData?.role}</p>
                <p className="text-gray-600">Status: {activeUserData?.status}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold">User Statistics</h3>
                    <ul>
                        <li>Total Projects: 5</li>
                        <li>Active Tasks: 12</li>
                        <li>Messages: 3</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <ul>
                        <li>
                            <Link to="/create-project" className="text-blue-500 hover:underline">
                                Create New Project
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks" className="text-blue-500 hover:underline">
                                View Tasks
                            </Link>
                        </li>
                        <li>
                            <Link to="/messages" className="text-blue-500 hover:underline">
                                Check Messages
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
