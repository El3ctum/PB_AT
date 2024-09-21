import { Timestamp } from "firebase/firestore";

interface UserModel {
    id: string;
    createdAt: Timestamp;
    email?: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'collaborator';
    status: 'active' | 'inactive';
}

export default UserModel;