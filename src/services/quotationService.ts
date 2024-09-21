import { collection, doc, getDocs, setDoc, getDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import QuotationModel from "../models/Quotation";

// Create a quotation document linked to a requisition
const createQuotation = async (requisitionId: string, quotation: QuotationModel & { id: string }): Promise<QuotationModel & { id: string }> => {
    const quotationDocRef = doc(db, `requisitions/${requisitionId}/quotations`, quotation.id);

    const existingQuotation = await getDoc(quotationDocRef);
    if (existingQuotation.exists()) {
        throw new Error(`Quotation with id ${quotation.id} already exists for requisition ${requisitionId}`);
    }

    await setDoc(quotationDocRef, {
        id: quotation.id,
        requisitionId: quotation.requisitionId,
        supplierId: quotation.supplierId,
        value: quotation.value,
        description: quotation.description,
        createdAt: Timestamp.now(),
    });

    return { ...quotation, id: quotation.id };
};

// Get a quotation by document ID
const getQuotationById = async (requisitionId: string, quotationId: string): Promise<QuotationModel | null> => {
    try {
        const quotationDocRef = doc(db, `requisitions/${requisitionId}/quotations`, quotationId);
        const quotationDoc = await getDoc(quotationDocRef);

        if (quotationDoc.exists()) {
            return quotationDoc.data() as QuotationModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching quotation with id ${quotationId} for requisition ${requisitionId}:`, error);
        return null;
    }
};

// Get all quotations for a requisition
const getQuotations = async (requisitionId: string): Promise<QuotationModel[]> => {
    try {
        const quotationsRef = collection(db, `requisitions/${requisitionId}/quotations`);
        const querySnapshot = await getDocs(quotationsRef);
        const quotations: QuotationModel[] = querySnapshot.docs.map((doc) => doc.data() as QuotationModel);

        return quotations;
    } catch (error) {
        console.error(`Error fetching quotations for requisition ${requisitionId}:`, error);
        return [];
    }
};

// Update a quotation document
const updateQuotation = async (requisitionId: string, quotation: QuotationModel & { id: string }): Promise<void> => {
    const quotationDocRef = doc(db, `requisitions/${requisitionId}/quotations`, quotation.id);
    await setDoc(quotationDocRef, {
        ...quotation,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

// Delete a quotation document
const deleteQuotation = async (requisitionId: string, quotationId: string): Promise<void> => {
    try {
        const quotationRef = doc(db, `requisitions/${requisitionId}/quotations`, quotationId);
        await deleteDoc(quotationRef);
        console.log(`Quotation with id ${quotationId} deleted successfully from requisition ${requisitionId}.`);
    } catch (error) {
        console.error(`Error deleting quotation with id ${quotationId} for requisition ${requisitionId}:`, error);
    }
};

export { createQuotation, getQuotationById, getQuotations, updateQuotation, deleteQuotation };
