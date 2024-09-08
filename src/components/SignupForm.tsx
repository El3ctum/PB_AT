import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        signup(email, password, firstName, lastName)
            // Aqui estou recebendo uma promisse `userCredential` 
            // se precisar, por exemplo, para obter o usuário:
            // const user = userCredential.user;
            // Que futuramente posso setar no UserContext();
            .then(() => {
                navigate("/app");
                console.log("Login successful, navigating to /app");
            })
            .catch((error) => {
                console.error('Login Failed in AuthForm:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-700 text-white p-3 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-700 text-white p-3 rounded w-full"
                />
            </div>
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
            {/* <div className="mb-4 flex items-center">
                <input type="checkbox" className="bg-gray-700 text-white p-3 rounded mr-2" />
                <span className="text-gray-400">I agree to the <a href="#" className="text-blue-500">Terms & Conditions</a></span>
            </div> */}
            <button
                type="submit"
                className="bg-purple-600 text-white py-3 px-6 rounded w-full"
            >
                Create account
            </button>

            {/*Layout para futuramente implementar login via plataformas terceiras*/}
            {/* <div className="flex items-center justify-between mt-6">
                <div className="border-t w-full"></div>
                <span className="px-4 text-gray-400">Or register with</span>
                <div className="border-t w-full"></div>
            </div>

            <div className="flex justify-between mt-4">
                <button className="bg-gray-700 text-white py-3 px-6 rounded w-full mr-2">Google</button>
                <button className="bg-gray-700 text-white py-3 px-6 rounded w-full ml-2">Apple</button>
            </div> */}
        </form>
    );
};

export default SignupForm;
