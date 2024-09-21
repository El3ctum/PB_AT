import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import ProductModel from '../../models/Product';

interface ProductListProps {
    products: ProductModel[];
    removeProduct: (id: string) => Promise<void>;
}

const ProductList: React.FC<ProductListProps> = ({ products, removeProduct }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // Número de produtos por página

    const idxLastProduct = currentPage * productsPerPage;
    const idxFirstProduct = idxLastProduct - productsPerPage;
    const currentProducts = products.slice(idxFirstProduct, idxLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td className='flex gap-4 align-middle justify-center'>
                                <Button variant="danger" onClick={() => removeProduct(product.id)}>
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

export default ProductList;
