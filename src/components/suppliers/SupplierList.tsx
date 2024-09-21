import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import SupplierModel from '../../models/Supplier';
import { Link } from 'react-router-dom';

interface SupplierListProps {
    suppliers: SupplierModel[];
    removeSupplier: (id: string) => Promise<void>;
}

const SupplierList: React.FC<SupplierListProps> = ({ suppliers, removeSupplier }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [suppliersPerPage] = useState(5); // Número de fornecedores por página

    const idxLastSupplier = currentPage * suppliersPerPage;
    const idxFirstSupplier = idxLastSupplier - suppliersPerPage;
    const currentSuppliers = suppliers.slice(idxFirstSupplier, idxLastSupplier);

    const totalPages = Math.ceil(suppliers.length / suppliersPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>CEP</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSuppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.zipCode}</td>
                            <td className='flex gap-4 align-middle justify-center'>
                                <Button variant="warning">
                                    <Link to={`${supplier.id}`}>Contacts</Link>
                                </Button>
                                <Button variant="danger" onClick={() => removeSupplier(supplier.id)}>
                                    Excluir
                                </Button>
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

export default SupplierList;
