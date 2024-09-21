import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import QuotationModel from '../../models/Quotation';
import { Link } from 'react-router-dom';

interface Supplier {
    id: string;
    name: string;
}

interface QuotationListProps {
    quotations: QuotationModel[];
    removeQuotation: (id: string) => Promise<void>;
    suppliers: Supplier[]; // New prop for suppliers
}

const QuotationList: React.FC<QuotationListProps> = ({ quotations, removeQuotation, suppliers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [quotationsPerPage] = useState(5);

    const idxLastQuotation = currentPage * quotationsPerPage;
    const idxFirstQuotation = idxLastQuotation - quotationsPerPage;
    const currentQuotations = quotations.slice(idxFirstQuotation, idxLastQuotation);

    const totalPages = Math.ceil(quotations.length / quotationsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Nome do Fornecedor</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentQuotations.map((quotation) => {
                        const supplier = suppliers.find(supplier => supplier.id === quotation.supplierId);
                        return (
                            <tr key={quotation.id}>
                                <td>{supplier ? supplier.name : 'Fornecedor não encontrado'}</td>
                                <td>{quotation.value}</td>
                                <td>{quotation.description}</td>
                                <td className='flex gap-4 align-middle justify-center'>
                                    <Button variant="warning">
                                        <Link to={`/quotations/${quotation.id}`}>Detalhes</Link>
                                    </Button>
                                    <Button variant="danger" onClick={() => removeQuotation(quotation.id)}>
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

export default QuotationList;
