import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";
import { createUser, getUserById } from '../services/userService'; // Assuming you handle user creation in Firestore here
import { Timestamp } from '@firebase/firestore';
import UserModel from '../models/User';

interface AuthContextType {
    user: User | null;
    activeUserData?: UserModel | null;
    activeUserEdit?: UserModel | null;
    setActiveUserEdit: React.Dispatch<React.SetStateAction<UserModel | null>>;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string, firstName: string, lastName: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [activeUserData, setActiveUserData] = useState<UserModel | null>(null);
    const [activeUserEdit, setActiveUserEdit] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Using this to presist the state of user, evictin the 
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDoc = await getUserById(user.uid);
                setActiveUserData(userDoc);
            } else {
                setUser(null);
                setActiveUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<UserCredential> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential;
        } catch (error) {
            console.error('Login Failed in AuthProvider:', error);
            throw new Error('Failed to login');
        }
    };

    const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<UserCredential> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);

            const userDoc: UserModel = {
                id: user.uid,
                email: user.email || undefined,
                firstName: firstName,
                lastName: lastName,
                role: "collaborator",
                status: "active",
                createdAt: Timestamp.now(),
            };

            await createUser(userDoc);
            setActiveUserData(userDoc);
            return userCredential;
        } catch (error) {
            console.error('Signup Failed in AuthProvider:', error);
            throw new Error('Failed to sign up');
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null);
            setActiveUserData(null);
        } catch (error) {
            console.error('Logout Failed in AuthProvider:', error);
            throw new Error('Failed to log out');
        }
    };

    return (
        <AuthContext.Provider value={{ user, activeUserData, activeUserEdit, setActiveUserEdit,login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
