import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        login(data.email, data.password)
            .then(() => {
                console.log("Login bem-sucedido");
                navigate("/app");
            })
            .catch((error) => {
                console.error('Falha no login', error);
                setLoginError("Falha no login: Verifique o seu e-mail ou senha e tente novamente.")
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Formato de email inválido" } })}
                    className="bg-dark-gray text-orange-700 p-3 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Senha é obrigatória" })}
                    className="bg-dark-gray text-orange-700 p-3 rounded w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 rounded w-full hover:bg-orange-400"
            >
                Login
            </button>

            {/* Future login with third-party platforms */}
            {/* <div className="flex items-center justify-between mt-6">
                <div className="border-t w-full"></div>
                <span className="px-4 text-gray-400">Or Login with</span>
                <div className="border-t w-full"></div>
            </div>

            <div className="flex justify-between mt-4">
                <button className="bg-dark-gray text-white py-3 px-6 rounded w-full mr-2">Google</button>
                <button className="bg-dark-gray text-white py-3 px-6 rounded w-full ml-2">Apple</button>
            </div> */}
        </form>
    );
};

export default LoginForm;
