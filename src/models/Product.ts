import { Timestamp } from "firebase/firestore";

interface ProductModel {
    category: string;
    createdAt: Timestamp;
    description: string;
    name: string;
}

export default ProductModel;
