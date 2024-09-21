import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from '@firebase/firestore';
import ContactModel from '../../models/Contact';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

interface ContactFormInputs {
    name: string;
    email: string;
    phone: string;
}

interface ContactFormProps {
    addContact: (contact: ContactModel) => Promise<void>;
    editContact: (contact: ContactModel) => Promise<void>;
    activeContactEdit?: ContactModel;
}

const ContactForm: React.FC<ContactFormProps> = ({ addContact, editContact, activeContactEdit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (activeContactEdit) {
            reset({
                name: activeContactEdit.name,
                email: activeContactEdit.email,
                phone: activeContactEdit.phone,
            });
        } else {
            reset({ name: '', email: '', phone: '' });
        }
    }, [activeContactEdit, reset]);

    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        const contact: ContactModel = {
            ...data,
            createdAt: Timestamp.now(),
            id: activeContactEdit ? activeContactEdit.id : uuidv4(),
        };

        try {
            if (activeContactEdit) {
                await editContact({ ...activeContactEdit, ...contact });
            } else {
                await addContact(contact);
            }
            reset();
        } catch (error) {
            console.error('Erro ao processar o contato:', error);
            setRegisterError("Falha ao processar o contato. Tente novamente.");
        }

        navigate("/app/admin/supplierForm")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Nome do contato"
                {...register('name', { required: "Nome é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <input
                type="email"
                placeholder="Email"
                {...register('email', { required: "Email é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <input
                type="text"
                placeholder="Telefone"
                {...register('phone', { required: "Telefone é obrigatório." })}
                className="bg-gray-200 p-3 rounded"
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

            {registerError && <p className="text-red-500">{registerError}</p>}

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
            >
                {activeContactEdit ? "Atualizar" : "Criar"}
            </button>
        </form>
    );
};

export default ContactForm;
