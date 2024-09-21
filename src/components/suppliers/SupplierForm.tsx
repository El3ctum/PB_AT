import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from '@firebase/firestore';
import SupplierModel from '../../models/Supplier';
import { v4 as uuidv4 } from 'uuid';

interface SupplierFormInputs {
    name: string;
    address: string;
    zipCode: string;
}

interface SupplierFormProps {
    addSupplier: (supplier: SupplierModel) => Promise<void>;
    editSupplier: (supplier: SupplierModel) => Promise<void>;
    activeSupplierEdit?: SupplierModel; // Prop opcional para edição
}

const SupplierForm: React.FC<SupplierFormProps> = ({ addSupplier, editSupplier, activeSupplierEdit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SupplierFormInputs>();
    const [registerError, setRegisterError] = useState<string | null>(null);

    useEffect(() => {
        if (activeSupplierEdit) {
            reset({
                name: activeSupplierEdit.name,
                address: activeSupplierEdit.address,
                zipCode: activeSupplierEdit.zipCode,
            });
        } else {
            reset({ name: '', address: '', zipCode: '' });
        }
    }, [activeSupplierEdit, reset]);

    const onSubmit: SubmitHandler<SupplierFormInputs> = async (data) => {
        const supplier: SupplierModel = {
            ...data,
            createdAt: Timestamp.now(),
            id: activeSupplierEdit ? activeSupplierEdit.id : uuidv4(),
        };

        try {
            if (activeSupplierEdit) {
                await editSupplier({ ...activeSupplierEdit, ...supplier });
            } else {
                await addSupplier(supplier);
            }
            reset();
        } catch (error) {
            console.error('Erro ao processar o fornecedor:', error);
            setRegisterError("Falha ao processar o fornecedor. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Nome do fornecedor"
                {...register('name', { required: "Nome é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            
            <input
                type="text"
                placeholder="Endereço"
                {...register('address', { required: "Endereço é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            
            <input
                type="text"
                placeholder="CEP"
                {...register('zipCode', { required: "CEP é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
            
            {registerError && <p className="text-red-500">{registerError}</p>}
            
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
                {activeSupplierEdit ? "Atualizar" : "Criar"}
            </button>
        </form>
    );
};

export default SupplierForm;
