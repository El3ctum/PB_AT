import { Timestamp } from "firebase/firestore";

interface ContactModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Timestamp;
}

export default ContactModel;
