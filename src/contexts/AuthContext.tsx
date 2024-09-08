import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createUser, getUserById } from '../services/userService';
import { Timestamp } from '@firebase/firestore';
import { useUser } from '../hooks/useUser';
import UserModel from '../models/User'

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string, firstName: string, lastName: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { loadUser } = useUser()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setUser(userCredential.user);
                const activeUser = await getUserById(userCredential.user.uid)
                if (activeUser) {
                    loadUser(activeUser);
                } else {
                    console.error('User data not found for UID:', userCredential.user.uid);
                }
                return userCredential;
            })
            .catch((error) => {
                console.error('Login Failed in AuthProvider:', error);
                throw error;
            });
    }

    async function signup(email: string, password: string, firstName: string, lastName: string): Promise<UserCredential> {
        console.log('Attempting to log in...');

        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setUser(userCredential.user);
                const user = userCredential.user

                const userDoc: UserModel = {
                    id: userCredential.user.uid,
                    email: user.email || undefined,
                    firstName: firstName,
                    lastName: lastName,
                    role: "collaborator",
                    status: "active",
                    createdAt: Timestamp.now(),
                };

                await createUser(userDoc)
                
                login(email, password)

                return userCredential;
            })
            .catch((error) => {
                console.error('Signup Failed in AuthProvider:', error);
                throw error;
            });;
    }

    async function logout(): Promise<void> {
        return signOut(auth).then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
