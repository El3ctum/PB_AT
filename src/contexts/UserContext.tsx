import React, { createContext, useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import UserModel from '../models/User';

interface UserContextType {
    activeUser?: UserModel;
    users: UserModel[];
    addUser: (user: UserModel) => void;
    loadUser: (user: UserModel) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeUser, setActiveUser] = useState<UserModel | undefined>(undefined);
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        getUsers().then(fetchedUsers => {
            console.log("Fetched users:", fetchedUsers); // Debug log
            setUsers(fetchedUsers);
        });
    }, []);

    useEffect(() => {
        // Side effect when activeUser changes, e.g., logging or other operations
        console.log("Active user updated:", activeUser);
    }, [activeUser]);

    const loadUser = (user: UserModel) => {
        console.log("Loading user:", user); // Debug log
        setActiveUser(user);
    };

    const addUser = (newUser: UserModel) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
        // Here you can also make a POST request to the database to add the user
        // For example, calling a function to save to Firestore
    };

    return (
        <UserContext.Provider value={{ activeUser, users, addUser, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};
