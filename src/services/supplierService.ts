import { collection, doc, getDocs, setDoc, query, getDoc, Timestamp, limit, startAfter, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import SupplierModel from "../models/Supplier";

// Create a supplier document in FirestoreDB
const createSupplier = async (supplier: SupplierModel & { id: string }): Promise<SupplierModel & { id: string }> => {
    const supplierDocRef = doc(db, "suppliers", supplier.id);

    const existingSupplier = await getDoc(supplierDocRef);
    if (existingSupplier.exists()) {
        throw new Error(`Supplier with id ${supplier.id} already exists`);
    }

    await setDoc(supplierDocRef, {
        id: supplier.id,
        name: supplier.name,
        address: supplier.address,
        zipCode: supplier.zipCode,
        createdAt: Timestamp.now(),
    });

    return { ...supplier, id: supplier.id };
};

// Get a supplier by document ID
const getSupplierById = async (id: string): Promise<SupplierModel | null> => {
    try {
        const supplierDocRef = doc(db, "suppliers", id);
        const supplierDoc = await getDoc(supplierDocRef);

        if (supplierDoc.exists()) {
            return supplierDoc.data() as SupplierModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching supplier with id ${id}:`, error);
        return null;
    }
};

// Get all suppliers with optional pagination
const getSuppliers = async (startAfterDoc?: unknown, pageSize: number = 10): Promise<SupplierModel[]> => {
    try {
        const suppliersRef = collection(db, "suppliers");
        const suppliersQuery = startAfterDoc
            ? query(suppliersRef, limit(pageSize), startAfter(startAfterDoc))
            : query(suppliersRef, limit(pageSize));

        const querySnapshot = await getDocs(suppliersQuery);
        const suppliers: SupplierModel[] = querySnapshot.docs.map((doc) => doc.data() as SupplierModel);

        return suppliers;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return [];
    }
};

// Update a supplier document
const updateSupplier = async (supplier: SupplierModel & { id: string }): Promise<void> => {
    const supplierDocRef = doc(db, "suppliers", supplier.id);
    await setDoc(supplierDocRef, {
        ...supplier,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

// Delete a supplier document
const deleteSupplier = async (id: string): Promise<void> => {
    try {
        const supplierRef = doc(db, "suppliers", id);
        await deleteDoc(supplierRef);
        console.log(`Supplier with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting supplier with id ${id}:`, error);
    }
};

export { createSupplier, getSupplierById, getSuppliers, updateSupplier, deleteSupplier };
