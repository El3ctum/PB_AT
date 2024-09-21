import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import RequisitionModel from '../../models/Requisition';
import { Link } from 'react-router-dom';

interface RequisitionListProps {
    requisitions: RequisitionModel[];
    removeRequisition: (id: string) => Promise<void>;
    users: { id: string; name: string }[];
    products: { id: string; name: string }[];
    quotations: { requisitionId: string; id: string }[]; // Add quotations prop
}

const RequisitionList: React.FC<RequisitionListProps> = ({
    requisitions,
    removeRequisition,
    users,
    products,
    quotations, // Destructure quotations
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [requisitionsPerPage] = useState(5);

    const idxLastRequisition = currentPage * requisitionsPerPage;
    const idxFirstRequisition = idxLastRequisition - requisitionsPerPage;
    const currentRequisitions = requisitions.slice(idxFirstRequisition, idxLastRequisition);

    const totalPages = Math.ceil(requisitions.length / requisitionsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getStatus = (requisitionId: string): string => {
        const count = quotations.filter(q => q.requisitionId === requisitionId).length;
        if (count === 0) return 'open';
        if (count >= 1 && count <= 2) return 'in progress';
        return 'closed';
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Nome do Usuário</th>
                        <th>Nome Produto</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequisitions.map((requisition) => {
                        const user = users.find(user => user.id === requisition.userId);
                        const product = products.find(product => product.id === requisition.productId);
                        const status = getStatus(requisition.id); // Get the status based on quotations

                        return (
                            <tr key={requisition.id}>
                                <td>{user ? user.name : 'Usuário não encontrado'}</td>
                                <td>{product ? product.name : 'Produto não encontrado'}</td>
                                <td>{status}</td> {/* Display the calculated status */}
                                <td className='flex gap-4 align-middle justify-center'>
                                    <Button variant="warning">
                                        <Link to={`${requisition.id}`}>Quotations</Link>
                                    </Button>
                                    <Button variant="danger" onClick={() => removeRequisition(requisition.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
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

export default RequisitionList;
