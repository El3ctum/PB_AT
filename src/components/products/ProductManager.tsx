import React, { useEffect, useState } from 'react';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../../services/productService';
import ProductModel from '../../models/Product';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsList = await getProducts();
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    const addProduct = async (product: ProductModel) => {
        await createProduct(product);
        setProducts((prev) => [...prev, product]);
    };

    const editProduct = async (product: ProductModel) => {
        await updateProduct(product);
        setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? product : p))
        );
    };

    const removeProduct = async (id: string) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div>
            <ProductList products={products} removeProduct={removeProduct} />
            <ProductForm addProduct={addProduct} editProduct={editProduct} />
        </div>
    );
};

export default ProductManager;
