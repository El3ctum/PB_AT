import { Timestamp } from "firebase/firestore";

interface QuotationModel {
    id: string;
    requisitionId: string;
    supplierId: string;
    value: number;
    description: string;
    createdAt: Timestamp;
}

export default QuotationModel;
