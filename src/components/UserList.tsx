import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import UserModel from '../models/User';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersList = await getUsers();
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
