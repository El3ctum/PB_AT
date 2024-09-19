import React from "react";
import { Link } from "react-router-dom";

interface RegistrationProps {
    title: string;
    description: string;
    route: string;
}

const RegistrationCard: React.FC<RegistrationProps> = ({ title, description, route }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <p className="text-gray-300 mb-6">{description}</p>
            <Link
                to={route}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
                Register {title}
            </Link>
        </div>
    );
}

export default RegistrationCard;
