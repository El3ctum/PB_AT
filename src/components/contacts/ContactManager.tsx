import React, { useEffect, useState } from 'react';
import { createContact, getContacts, updateContact, deleteContact } from '../../services/contactService';
import ContactModel from '../../models/Contact';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { useParams } from 'react-router-dom';

const ContactManager: React.FC = () => {
    const { id: supplierId } = useParams<{ id: string }>();
    const [contacts, setContacts] = useState<ContactModel[]>([]);

    useEffect(() => {
        if (supplierId) {
            const fetchContacts = async () => {
                const contactsList = await getContacts(supplierId);
                setContacts(contactsList);
            };
            fetchContacts();
        }
    }, [supplierId]);

    const addContact = async (contact: ContactModel) => {
        if (supplierId) {
            await createContact(supplierId, contact);
            setContacts((prev) => [...prev, contact]);
        }
    };

    const editContact = async (contact: ContactModel) => {
        if (supplierId) {
            await updateContact(supplierId, contact);
            setContacts((prev) =>
                prev.map((c) => (c.id === contact.id ? contact : c))
            );
        }
    };

    const removeContact = async (id: string) => {
        if (supplierId) {
            await deleteContact(supplierId, id);
            setContacts((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <div>
            <ContactList contacts={contacts} removeContact={removeContact} supplierId={supplierId || ''}/>
            <ContactForm addContact={addContact} editContact={editContact} />
        </div>
    );
};

export default ContactManager;