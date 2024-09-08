import { Timestamp } from "firebase/firestore";

interface SupplierModel {
    createdAt: Timestamp;
    address: string;
    name: string;
    zipCode: string;
}

export default SupplierModel;
