import { collection, doc, getDocs, setDoc, query, getDoc, Timestamp, limit, startAfter, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import RequisitionModel from "../models/Requisition";

// Create a requisition document in FirestoreDB
const createRequisition = async (requisition: RequisitionModel & { id: string }): Promise<RequisitionModel & { id: string }> => {
    const requisitionDocRef = doc(db, "requisitions", requisition.id);

    const existingRequisition = await getDoc(requisitionDocRef);
    if (existingRequisition.exists()) {
        throw new Error(`Requisition with id ${requisition.id} already exists`);
    }

    await setDoc(requisitionDocRef, {
        id: requisition.id,
        userId: requisition.userId,
        productId: requisition.productId,
        status: requisition.status,
        quotations: requisition.quotations,
        createdAt: Timestamp.now(),
    });

    return { ...requisition, id: requisition.id };
};

// Get a requisition by document ID
const getRequisitionById = async (id: string): Promise<RequisitionModel | null> => {
    try {
        const requisitionDocRef = doc(db, "requisitions", id);
        const requisitionDoc = await getDoc(requisitionDocRef);

        if (requisitionDoc.exists()) {
            return requisitionDoc.data() as RequisitionModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching requisition with id ${id}:`, error);
        return null;
    }
};

// Get all requisitions with optional pagination
const getRequisitions = async (startAfterDoc?: unknown, pageSize: number = 10): Promise<RequisitionModel[]> => {
    try {
        const requisitionsRef = collection(db, "requisitions");
        const requisitionsQuery = startAfterDoc
            ? query(requisitionsRef, limit(pageSize), startAfter(startAfterDoc))
            : query(requisitionsRef, limit(pageSize));

        const querySnapshot = await getDocs(requisitionsQuery);
        const requisitions: RequisitionModel[] = querySnapshot.docs.map((doc) => doc.data() as RequisitionModel);

        return requisitions;
    } catch (error) {
        console.error("Error fetching requisitions:", error);
        return [];
    }
};

// Update a requisition document
const updateRequisition = async (requisition: RequisitionModel & { id: string }): Promise<void> => {
    const requisitionDocRef = doc(db, "requisitions", requisition.id);
    await setDoc(requisitionDocRef, {
        ...requisition,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

const deleteRequisition = async (id: string): Promise<void> => {
    try {
        const requisitionRef = doc(db, "requisitions", id);
        await deleteDoc(requisitionRef);
        console.log(`Requisition with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting requisition with id ${id}:`, error);
    }
};

export { createRequisition, getRequisitionById, getRequisitions, updateRequisition, deleteRequisition };
