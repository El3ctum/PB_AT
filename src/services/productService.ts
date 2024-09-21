import { collection, doc, getDocs, setDoc, query, getDoc, Timestamp, limit, startAfter, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ProductModel from "../models/Product";

// Create a product document in FirestoreDB
const createProduct = async (product: ProductModel & { id: string }): Promise<ProductModel & { id: string }> => {
    const productDocRef = doc(db, "products", product.id);

    const existingProduct = await getDoc(productDocRef);
    if (existingProduct.exists()) {
        throw new Error(`Product with id ${product.id} already exists`);
    }

    await setDoc(productDocRef, {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        createdAt: Timestamp.now(),
    });

    return { ...product, id: product.id };
};

// Get a product by document ID
const getProductById = async (id: string): Promise<ProductModel | null> => {
    try {
        const productDocRef = doc(db, "products", id);
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
            return productDoc.data() as ProductModel;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};

// Get all products with optional pagination
const getProducts = async (startAfterDoc?: unknown, pageSize: number = 10): Promise<ProductModel[]> => {
    try {
        const productsRef = collection(db, "products");
        const productsQuery = startAfterDoc
            ? query(productsRef, limit(pageSize), startAfter(startAfterDoc))
            : query(productsRef, limit(pageSize));

        const querySnapshot = await getDocs(productsQuery);
        const products: ProductModel[] = querySnapshot.docs.map((doc) => doc.data() as ProductModel);

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Update a product document
const updateProduct = async (product: ProductModel & { id: string }): Promise<void> => {
    const productDocRef = doc(db, "products", product.id);
    await setDoc(productDocRef, {
        ...product,
        updatedAt: Timestamp.now()
    }, { merge: true });
};

// Delete a product document
const deleteProduct = async (id: string): Promise<void> => {
    try {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
        console.log(`Product with id ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
    }
};

export { createProduct, getProductById, getProducts, updateProduct, deleteProduct };
