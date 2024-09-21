import { Timestamp } from "firebase/firestore";

interface RequisitionModel {
    id: string;
    userId: string;
    productId: string;
    status: 'open' | 'closed' | 'in progress';
    updatedAt: Timestamp;
    createdAt: Timestamp;
}

export default RequisitionModel;