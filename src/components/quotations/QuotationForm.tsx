import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import QuotationModel from '../../models/Quotation';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getSuppliers } from '../../services/supplierService'; // Adjust this import based on your project structure

interface QuotationFormInputs {
    supplierId: string;
    value: number;
    description: string;
}

interface QuotationFormProps {
    addQuotation: (quotation: QuotationModel) => Promise<void>;
    editQuotation: (quotation: QuotationModel) => Promise<void>;
    activeQuotationEdit?: QuotationModel;
    requisitionId: string;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ addQuotation, editQuotation, activeQuotationEdit, requisitionId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<QuotationFormInputs>();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch suppliers from the database
        const fetchSuppliers = async () => {
            const supplierList = await getSuppliers();
            setSuppliers(supplierList);
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (activeQuotationEdit) {
            reset({
                supplierId: activeQuotationEdit.supplierId,
                value: activeQuotationEdit.value,
                description: activeQuotationEdit.description,
            });
        } else {
            reset({ supplierId: '', value: 0, description: '' });
        }
    }, [activeQuotationEdit, reset]);

    const onSubmit: SubmitHandler<QuotationFormInputs> = async (data) => {
        const quotation: QuotationModel = {
            ...data,
            createdAt: Timestamp.now(),
            id: activeQuotationEdit ? activeQuotationEdit.id : uuidv4(),
            requisitionId: requisitionId,
        };

        try {
            if (activeQuotationEdit) {
                await editQuotation({ ...activeQuotationEdit, ...quotation });
            } else {
                await addQuotation(quotation);
            }
            reset();
            navigate("/app/requisitions");
        } catch (error) {
            console.error('Error processing quotation:', error);
            setRegisterError("Failed to process the quotation. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <select
                {...register('supplierId', { required: "Supplier ID is required." })}
                className="bg-gray-200 p-3 rounded"
            >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                    </option>
                ))}
            </select>
            {errors.supplierId && <p className="text-red-500">{errors.supplierId.message}</p>}

            <input
                type="number"
                placeholder="Value"
                {...register('value', { required: "Value is required." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.value && <p className="text-red-500">{errors.value.message}</p>}

            <textarea
                placeholder="Description"
                {...register('description', { required: "Description is required." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {registerError && <p className="text-red-500">{registerError}</p>}

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
                {activeQuotationEdit ? "Update" : "Create"}
            </button>
        </form>
    );
};

export default QuotationForm;
