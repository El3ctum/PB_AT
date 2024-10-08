import { Timestamp } from "firebase/firestore";

interface SupplierModel {
    id: string;
    name: string;
    address: string;
    zipCode: string;
    createdAt: Timestamp;
}

export default SupplierModel;
