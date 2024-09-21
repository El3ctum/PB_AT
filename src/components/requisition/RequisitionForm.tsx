// components/RequisitionForm.tsx
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import RequisitionModel from '../../models/Requisition';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../hooks/useAuth';
import { getProducts } from '../../services/productService';

interface RequisitionFormInputs {
    productId: string;
}

interface RequisitionFormProps {
    addRequisition: (requisition: RequisitionModel) => Promise<void>;
    editRequisition: (requisition: RequisitionModel) => Promise<void>;
    activeRequisitionEdit?: RequisitionModel; // Optional prop for editing
}

const RequisitionForm: React.FC<RequisitionFormProps> = ({
    addRequisition,
    editRequisition,
    activeRequisitionEdit
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RequisitionFormInputs>();
    const { activeUserData } = useAuth();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [products, setProducts] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activeRequisitionEdit) {
            reset({
                productId: activeRequisitionEdit.productId,
            });
        } else {
            reset({ productId: '' });
        }
    }, [activeRequisitionEdit, reset]);

    const onSubmit: SubmitHandler<RequisitionFormInputs> = async (data) => {
        const quotationsCount = activeRequisitionEdit?.quotations.length || 0;
        const status = quotationsCount === 0 
            ? 'open' 
            : quotationsCount < 3 
            ? 'in progress' 
            : 'closed';

        const requisition: RequisitionModel = {
            ...data,
            userId: activeUserData?.id || '',
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            id: activeRequisitionEdit ? activeRequisitionEdit.id : uuidv4(),
            quotations: [],
            status,
        };

        try {
            if (activeRequisitionEdit) {
                await editRequisition({ ...activeRequisitionEdit, ...requisition });
            } else {
                await addRequisition(requisition);
            }
            reset();
        } catch (error) {
            console.error('Error processing the requisition:', error);
            setRegisterError("Failed to process the requisition. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <select {...register('productId', { required: "Product ID is required." })} className="bg-gray-200 p-3 rounded">
                <option value="">Select a Product</option>
                {products.map(product => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
            {errors.productId && <p className="text-red-500">{errors.productId.message}</p>}
            
            {registerError && <p className="text-red-500">{registerError}</p>}
            
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
                {activeRequisitionEdit ? "Update" : "Create"}
            </button>
        </form>
    );
};

export default RequisitionForm;
