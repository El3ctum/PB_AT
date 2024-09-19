import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SignupFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignupForm: React.FC = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
    const [signupError, setSignupError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
        signup(data.email, data.password, data.firstName, data.lastName)
            .then(() => {
                navigate("/app");
                console.log("Signup successful, navigating to /app");
            })
            .catch((error) => {
                console.error('Signup Failed:', error);
                setSignupError("Falha ao criar a conta. Tente novamente.");
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="First name"
                    {...register('firstName', { required: "O primeiro nome é obrigatório" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

                <input
                    type="text"
                    placeholder="Last name"
                    {...register('lastName', { required: "O sobrenome é obrigatório" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Formato de email inválido" } })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', { required: "Senha é obrigatória", minLength: { value: 6, message: "A senha precisa ter pelo menos 6 caracteres" } })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {signupError && <p className="text-red-500 text-sm">{signupError}</p>}

            <button
                type="submit"
                className="bg-orange-500 text-dark-gray py-3 px-6 rounded w-full hover:bg-orange-400"
            >
                Create account
            </button>
        </form>
    );
};

export default SignupForm;
