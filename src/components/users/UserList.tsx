import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import { getUsers, setUserState, updateUser } from '../../services/userService';
import UserModel from '../../models/User';
import { useAuth } from '../../hooks/useAuth';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const { activeUserEdit, setActiveUserEdit, user } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const usersPerPage = 5;

    const fetchUsers = async () => {
        setLoading(true);
        const usersList = await getUsers();
        setUsers(usersList);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user: UserModel) => {
        if (activeUserEdit && activeUserEdit.id === user.id) {
            setActiveUserEdit(null);
            return;
        }
        setActiveUserEdit(user);
    };

    const handleUpdate = async (user: UserModel) => {
        const updatedUser = {
            ...user,
            role: user.role === 'admin' ? 'collaborator' : 'admin' as "admin" | "collaborator",
        };

        try {
            await updateUser(updatedUser);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleInactivation = async (user: UserModel) => {
        try {
            const userStatus = user.status === "active" ? "inactive" : "active"
            await setUserState(user.id, userStatus);
            console.log(`User with id ${user.id} successfully inactivated.`);
            fetchUsers();
        } catch (error) {
            console.error(`Error changing user status with id ${user.id}:`, error);
        }
    };

    const idxLastUser = currentPage * usersPerPage;
    const idxFirstUser = idxLastUser - usersPerPage;
    const currentUsers = users.slice(idxFirstUser, idxLastUser);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center">Loading...</td>
                        </tr>
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map(currentUser => (
                            user?.uid !== currentUser.id &&
                            <tr key={currentUser.id} className="text-center">
                                <td>{currentUser.firstName}</td>
                                <td>{currentUser.lastName}</td>
                                <td>{currentUser.email}</td>
                                <td>{currentUser.role}</td>
                                <td>{currentUser.status}</td>
                                <td>
                                    <Button onClick={() => handleEdit(currentUser)}>
                                        {activeUserEdit && activeUserEdit.id === currentUser.id ? "Cancel" : "Edit"}
                                    </Button>
                                    <Button onClick={() => handleUpdate(currentUser)}>Change Role</Button>
                                    <Button onClick={() => handleInactivation(currentUser)}>Change Status</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handlePageChange(page + 1)}>
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default UserList;
