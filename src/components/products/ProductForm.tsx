import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from '@firebase/firestore';
import ProductModel from '../../models/Product';
import { v4 as uuidv4 } from 'uuid';


interface ProductFormInputs {
    name: string;
    description: string;
    category: string;
}

interface ProductFormProps {
    addProduct: (product: ProductModel) => Promise<void>;
    editProduct: (product: ProductModel) => Promise<void>;
    activeProductEdit?: ProductModel; // Prop opcional para edição
}

const ProductForm: React.FC<ProductFormProps> = ({ addProduct, editProduct, activeProductEdit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormInputs>();
    const [registerError, setRegisterError] = useState<string | null>(null);

    useEffect(() => {
        if (activeProductEdit) {
            reset({
                name: activeProductEdit.name,
                description: activeProductEdit.description,
                category: activeProductEdit.category,
            });
        } else {
            reset({ name: '', description: '', category: '' });
        }
    }, [activeProductEdit, reset]);

    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        const product: ProductModel = {
            ...data,
            createdAt: Timestamp.now(),
            id: activeProductEdit ? activeProductEdit.id : uuidv4(),
            quantity: 0, // Valor padrão para quantity
        };

        try {
            if (activeProductEdit) {
                await editProduct({ ...activeProductEdit, ...product });
            } else {
                await addProduct(product);
            }
            reset();
        } catch (error) {
            console.error('Erro ao processar o produto:', error);
            setRegisterError("Falha ao processar o produto. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Nome do produto"
                {...register('name', { required: "Nome é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            
            <textarea
                placeholder="Descrição"
                {...register('description', { required: "Descrição é obrigatória." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            
            <input
                type="text"
                placeholder="Categoria"
                {...register('category', { required: "Categoria é obrigatória." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            
            {registerError && <p className="text-red-500">{registerError}</p>}
            
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
                {activeProductEdit ? "Atualizar" : "Criar"}
            </button>
        </form>
    );
};

export default ProductForm;
