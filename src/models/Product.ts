import { Timestamp } from "firebase/firestore";

interface ProductModel {
    id: string;
    name: string;
    category: string;
    quantity: number;
    description: string;
    createdAt: Timestamp;
}

export default ProductModel;
