import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { getUsers } from '../../services/userService';
import UserModel from '../../models/User';
import { useAuth } from '../../hooks/useAuth';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const { activeUserEdit, setActiveUserEdit } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            const usersList = await getUsers();
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    const handleEdit = (user: UserModel) => {
        if (activeUserEdit) {
            setActiveUserEdit(null);
            return;
        }
        setActiveUserEdit(user);
    };

    // useEffect(() => {
    //     if (activeUserEdit) {
    //         console.log('Active User Edit:', activeUserEdit);
    //     }
    // }, [activeUserEdit]);

    const idxLastUser = currentPage * usersPerPage;
    const idxFirstUser = idxLastUser - usersPerPage;
    const currentUsers = users.slice(idxFirstUser, idxLastUser)

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(users.length / usersPerPage)

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
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td className='flex gap-4 align-middle justify-center'>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === currentPage}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </>
    );
};

export default UserList;
