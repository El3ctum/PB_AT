import React from 'react';
import UserForm from './Userform';
import UserList from './UserList';

const UserManager: React.FC = () => {
   
    return (
        <div>
            <UserList />
            <UserForm />
        </div>
    );
};

export default UserManager;
