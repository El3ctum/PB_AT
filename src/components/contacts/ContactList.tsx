import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import ContactModel from '../../models/Contact';
import { getSupplierById } from '../../services/supplierService';

interface ContactListProps {
    contacts: ContactModel[];
    removeContact: (id: string) => Promise<void>;
    supplierId: string;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, removeContact, supplierId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);
    const [supplierName, setSupplierName] = useState<string>('');

    useEffect(() => {
        const fetchSupplierName = async () => {
            try {
                const supplier = await getSupplierById(supplierId);
                setSupplierName(supplier.name);
            } catch (error) {
                console.error('Erro ao buscar o fornecedor:', error);
            }
        };

        fetchSupplierName();
    }, [supplierId]);

    const idxLastContact = currentPage * contactsPerPage;
    const idxFirstContact = idxLastContact - contactsPerPage;
    const currentContacts = contacts.slice(idxFirstContact, idxLastContact);

    const totalPages = Math.ceil(contacts.length / contactsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <h3>Fornecedor: {supplierName}</h3> {/* Exibe o nome do fornecedor */}
            <Table striped bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td className="flex gap-4 align-middle justify-center">
                                <Button variant="danger" onClick={() => removeContact(contact.id)}>
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

export default ContactList;
