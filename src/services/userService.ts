import { collection, doc, getDocs, setDoc, query, where, getDoc, Timestamp, limit, startAfter } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import UserModel from "../models/User";

// Create a user document in FirestoreDB
const createUser = async (user: UserModel): Promise<UserModel & { id: string }> => {
    const userDocRef = doc(db, "users", user.id);

    const existingUser = await getDoc(userDocRef);
    if (existingUser.exists()) {
        throw new Error(`User with id ${user.id} already exists`);
    }

    await setDoc(userDocRef, {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
    });

    return { ...user, id: user.id };
};

// Get a user by document ID
const getUserById = async (id: string): Promise<UserModel | null> => {
    try {
        const userDocRef = doc(db, "users", id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data() as UserModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        return null;
    }
};

// Get a user by a specific field (e.g., email)
const getUser = async (field: keyof UserModel, value: string | number | Timestamp): Promise<UserModel | null> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where(field, "==", value), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return doc.data() as UserModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user by ${field}:`, error);
        return null;
    }
};

// Get all users with optional pagination
const getUsers = async (startAfterDoc?: unknown, pageSize: number = 10): Promise<UserModel[]> => {
    try {
        const usersRef = collection(db, "users");
        const usersQuery = startAfterDoc
            ? query(usersRef, limit(pageSize), startAfter(startAfterDoc))
            : query(usersRef, limit(pageSize));

        const querySnapshot = await getDocs(usersQuery);
        const users: UserModel[] = querySnapshot.docs.map((doc) => doc.data() as UserModel);

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// Update the status of a user
const setUserState = async (id: string, status: string): Promise<void> => {
    try {
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error(`User with id ${id} does not exist`);
        }
        await setDoc(userRef, { status }, { merge: true });
    } catch (error) {
        console.error(`Error updating user status for id ${id}:`, error);
    }
};

// Update the role of a user
const setUserRole = async (id: string, role: string) => {
    try {
        const userRef = doc(db, "users", id);

        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error(`User with id ${id} does not exist`);
        }

        await setDoc(userRef, { role }, { merge: true });
    } catch (error) {
        console.error(`Error updating user role for id ${id}:`, error);
    }
};

// Update full user document
const updateUser = async (user: UserModel): Promise<void> => {
    const userDocRef = doc(db, "users", user.id);
    await setDoc(userDocRef, {
        ...user,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

export { createUser, getUser, getUsers, setUserState, setUserRole, updateUser, getUserById};
