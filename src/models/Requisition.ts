import { Timestamp, DocumentReference } from "firebase/firestore";

interface RequisitionModel {
    createdAt: Timestamp;
    productId: DocumentReference;
    status: 'open' | 'closed' | 'in progress';
    updatedAt: Timestamp;
    userId: DocumentReference;
}

export default RequisitionModel;
