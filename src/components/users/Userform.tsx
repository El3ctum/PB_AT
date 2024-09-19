import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUser } from '../../services/userService'; // Your service for storing user data in Firestore
import { apiKey } from '../../../firebaseConfig'; // Firebase auth configuration
import UserModel from '../../models/User'; // Your User model
import { Timestamp } from '@firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

interface UserFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'collaborator';
    status: 'active' | 'inactive';
}

const UserForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormInputs>();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const { activeUserEdit, setActiveUserEdit } = useAuth();

    // Reset the form when activeUserEdit changes
    useEffect(() => {
        if (activeUserEdit != null) {
            reset({
                firstName: activeUserEdit.firstName,
                lastName: activeUserEdit.lastName,
                email: activeUserEdit.email,
                role: activeUserEdit.role,
                status: activeUserEdit.status,
            });
        } else {
            reset({
                firstName: '',
                lastName: '',
                email: '',
                role: 'collaborator',
                status: 'active',
            });
        }
    }, [activeUserEdit, reset]);

    const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
        try {
            if (!activeUserEdit) {
                // Create the user with Firebase REST API
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        returnSecureToken: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to create user');
                }

                const result = await response.json();

                const userDoc: UserModel = {
                    id: result.localId,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                    status: data.status,
                    createdAt: Timestamp.now(),
                };

                await createUser(userDoc);
                console.log("User created successfully!");
            } else {
                console.log("Editing user:", activeUserEdit);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setRegisterError("Failed to create the account. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="First name"
                    {...register('firstName', { required: "First name is required" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

                <input
                    type="text"
                    placeholder="Last name"
                    {...register('lastName', { required: "Last name is required" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {!activeUserEdit && (
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
            )}

            <div className="mb-4">
                <select
                    {...register('role', { required: "Role is required" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                >
                    <option value="collaborator">Collaborator</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <div className="mb-4">
                <select
                    {...register('status', { required: "Status is required" })}
                    className="bg-dark-gray text-orange-400 p-3 rounded w-full"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {registerError && <p className="text-red-500 text-sm">{registerError}</p>}

            <button
                type="submit"
                className="bg-orange-500 text-dark-gray py-3 px-6 rounded w-full hover:bg-orange-400"
            >
                {activeUserEdit ? "Update account" : "Create account"}
            </button>
        </form>
    );
};

export default UserForm;
