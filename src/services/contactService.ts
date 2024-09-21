import { collection, doc, getDocs, setDoc, getDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ContactModel from "../models/Contact";

// Create a contact document in a supplier's subcollection
const createContact = async (supplierId: string, contact: ContactModel & { id: string }): Promise<ContactModel & { id: string }> => {
    const contactDocRef = doc(db, `suppliers/${supplierId}/contacts`, contact.id);

    const existingContact = await getDoc(contactDocRef);
    if (existingContact.exists()) {
        throw new Error(`Contact with id ${contact.id} already exists for supplier ${supplierId}`);
    }

    await setDoc(contactDocRef, {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        createdAt: Timestamp.now(),
    });

    return { ...contact, id: contact.id };
};

// Get a contact by document ID
const getContactById = async (supplierId: string, contactId: string): Promise<ContactModel | null> => {
    try {
        const contactDocRef = doc(db, `suppliers/${supplierId}/contacts`, contactId);
        const contactDoc = await getDoc(contactDocRef);

        if (contactDoc.exists()) {
            return contactDoc.data() as ContactModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching contact with id ${contactId} for supplier ${supplierId}:`, error);
        return null;
    }
};

// Get all contacts for a supplier
const getContacts = async (supplierId: string): Promise<ContactModel[]> => {
    try {
        const contactsRef = collection(db, `suppliers/${supplierId}/contacts`);
        const querySnapshot = await getDocs(contactsRef);
        const contacts: ContactModel[] = querySnapshot.docs.map((doc) => doc.data() as ContactModel);

        return contacts;
    } catch (error) {
        console.error(`Error fetching contacts for supplier ${supplierId}:`, error);
        return [];
    }
};

// Update a contact document
const updateContact = async (supplierId: string, contact: ContactModel & { id: string }): Promise<void> => {
    const contactDocRef = doc(db, `suppliers/${supplierId}/contacts`, contact.id);
    await setDoc(contactDocRef, {
        ...contact,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

// Delete a contact document
const deleteContact = async (supplierId: string, contactId: string): Promise<void> => {
    try {
        const contactRef = doc(db, `suppliers/${supplierId}/contacts`, contactId);
        await deleteDoc(contactRef);
        console.log(`Contact with id ${contactId} deleted successfully from supplier ${supplierId}.`);
    } catch (error) {
        console.error(`Error deleting contact with id ${contactId} for supplier ${supplierId}:`, error);
    }
};

export { createContact, getContactById, getContacts, updateContact, deleteContact };
