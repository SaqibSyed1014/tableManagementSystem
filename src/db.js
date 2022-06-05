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
const itemsColRef = collection(db, "items")
const categoriesColRef = collection(db, "categories")

export const getItems = () => {
    return getDocs(itemsColRef)
}

export const fetchingCategories = () => {
    const response = []
    return getDocs(categoriesColRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                response.push({ id: doc.id, ...doc.data()  })
            })
            return response
        })
}

export const addingCategory = (payload) => {
    addDoc(categoriesColRef, payload).then(() => fetchingCategories())
}

// export const addContact = (payload) => {
//     return addDoc(colRef, payload)
// }

export const updateContact = (payload) => {
    const docRef = doc(db, "contacts", payload.id)
    return updateDoc(docRef, payload)
}

export const deleteContact = (payload) => {
    const docRef = doc(db, "contacts", payload.id)
    return deleteDoc(docRef)
}
