import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password).then(() => {
            console.log("Login bem-sucedido");
            navigate("/app")
        }).catch((error) => {
            console.error('Falha no login', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 text-white p-3 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 text-white p-3 rounded w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-purple-600 text-white py-3 px-6 rounded w-full"
            >
                Login
            </button>

            {/*Layout para futuramente implementar login via plataformas terceiras*/}
            {/* <div className="flex items-center justify-between mt-6">
                <div className="border-t w-full"></div>
                <span className="px-4 text-gray-400">Or Login with</span>
                <div className="border-t w-full"></div>
            </div>

            <div className="flex justify-between mt-4">
                <button className="bg-gray-700 text-white py-3 px-6 rounded w-full mr-2">Google</button>
                <button className="bg-gray-700 text-white py-3 px-6 rounded w-full ml-2">Apple</button>
            </div> */}
        </form>
    );
};

export default LoginForm;
