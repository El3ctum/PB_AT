import { Timestamp, DocumentReference } from "firebase/firestore";

interface QuotationModel {
    createdAt: Timestamp;
    description: string;
    requisitionId: DocumentReference;
    supplierId: DocumentReference;
    value: number;
}

export default QuotationModel;
