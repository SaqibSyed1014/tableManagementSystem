import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Firebase configuration
const config = {
    apiKey: "AIzaSyCjk4_eRQT4loNIs_s-OW9YNIHaYfuhjh8",
    authDomain: "table-management-system.firebaseapp.com",
    projectId: "table-management-system",
    storageBucket: "table-management-system.appspot.com",
    messagingSenderId: "438991775645",
    appId: "1:438991775645:web:ed17026924ce6073453174",
    measurementId: "G-8Z6R6KBE8Y"
};

const app = initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const categoriesColRef = collection(db, "categories")
const itemsColRef = collection(db, "items")
const tableColRef = collection(db, "tables")
const orderColRef = collection(db, "orders")

// Categories CRUD
export const fetchingCategories = () => {
    const response = []
    return getDocs(categoriesColRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                response.push({ id: doc.id, ...doc.data() })
            })
            return response
        })
}

export const addingCategory = (payload) => {
    return addDoc(categoriesColRef, payload).then((docRef) => {
        return updateDoc(doc(db, "categories", docRef.id), { id: docRef.id, ...payload }).then(() => fetchingCategories())
     })
}

export const updatingCategory = (payload) => {
    const docRef = doc(db, "categories", payload.id)
    return updateDoc(docRef, payload).then(() => fetchingCategories())
}

export const deletingCategory = (payload) => {
    const docRef = doc(db, "categories", payload.id)
    return deleteDoc(docRef).then(() => fetchingCategories())
}

// Items CRUD
export const fetchingItems = () => {
    const response = []
    return getDocs(itemsColRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                response.push({ id: doc.id, ...doc.data() })
            })
            return response
        })
}

export const addingItems = (payload) => {
    return addDoc(itemsColRef, payload).then((docRef) => {
        return updateDoc(doc(db, "items", docRef.id), { id: docRef.id, ...payload }).then(() => fetchingItems())
    })
}

export const updatingItem = (payload) => {
    const docRef = doc(db, "items", payload.id)
    return updateDoc(docRef, payload).then(() => fetchingItems())
}

export const deletingItem = (payload) => {
    const docRef = doc(db, "items", payload.id)
    return deleteDoc(docRef).then(() => fetchingItems())
}

// Table CRUD
export const fetchingTables = () => {
    const response = []
    return getDocs(tableColRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                response.push({ id: doc.id, ...doc.data() })
            })
            return response
        })}

export const addingTable = (payload) => {
    return addDoc(tableColRef, payload).then((docRef) => {
        return updateDoc(doc(db, "tables", docRef.id), { id: docRef.id, ...payload }).then(() => fetchingTables())
    })
}

export const updatingTable = (payload) => {
    const docRef = doc(db, "tables", payload.id)
    return updateDoc(docRef, payload).then(() => fetchingTables())
}

export const deletingTable = (payload) => {
    const docRef = doc(db, "tables", payload.id)
    return deleteDoc(docRef).then(() => fetchingTables())
}

// Orders CRUD
export const fetchingOrders = () => {
    const response = []
    return getDocs(orderColRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                response.push({ id: doc.id, statusLoader: false, ...doc.data() })
            })
            return response
        })}

export const addingOrder = (payload) => {
    return addDoc(orderColRef, payload).then((docRef) => {
        return updateDoc(doc(db, "orders", docRef.id), { id: docRef.id, ...payload }).then(() => fetchingOrders())
    })
}

export const updatingOrder = (object) => {
    const payload = JSON.parse(JSON.stringify(object))
    delete payload.statusLoader
    const docRef = doc(db, "orders", payload.id)
    return updateDoc(docRef, payload).then(() => fetchingOrders())
}

export const deletingOrder = (payload) => {
    const docRef = doc(db, "orders", payload.id)
    return deleteDoc(docRef).then(() => fetchingOrders())
}
