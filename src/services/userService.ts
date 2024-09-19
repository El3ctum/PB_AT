import { collection, doc, getDocs, setDoc, query, where, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import UserModel from "../models/User";

// Create a user document in FirestoreDB
const createUser = async (user: UserModel): Promise<UserModel & { id: string }> => {
    const userDocRef = doc(db, "users", user.id);
    
    await setDoc(userDocRef, {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
    });
    
    return { ...user, id: user.id };
};

// Get a user by document ID
const getUserById = async (id: string): Promise<UserModel | null> => {
    const userDocRef = doc(db, "users", id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        return userDoc.data() as UserModel;
    } else {
        return null;
    }
};

// Get a user by a specific field (e.g., email)
const getUser = async (field: keyof UserModel, value: string | number | Timestamp): Promise<UserModel | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where(field, "==", value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data() as UserModel;
    } else {
        return null;
    }
};

// Get all users
const getUsers = async (): Promise<UserModel[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: UserModel[] = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data() as UserModel);
    });
    return users;
};

// Update the status of a user
const setUserState = async (id: string, status: string) => {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, { status }, { merge: true });
};

// Update the role of a user
const setUserRole = async (id: string, role: string) => {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, { role }, { merge: true });
};

export { createUser, getUser, getUsers, setUserState, setUserRole, getUserById };
