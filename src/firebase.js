import {
    initializeApp
} from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

const colRefProducts = collection(db, "products")
export const products = getDocs(colRefProducts)

const colRefOrders = collection(db, "orders")
export const orders = getDocs(colRefOrders)