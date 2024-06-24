import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAZH2-S6uSeURlvL1APqWl8KWRY6-68Mrg",
    authDomain: "book-list-with-firebase-6da04.firebaseapp.com",
    projectId: "book-list-with-firebase-6da04",
    storageBucket: "book-list-with-firebase-6da04.appspot.com",
    messagingSenderId: "1095515011860",
    appId: "1:1095515011860:web:588b5f20c32a3264c26001",
    measurementId: "G-TMCVHH18SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);


export const signUp = async (email, password) => {
    let msgError = "";
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error.message.includes("invalid-email")) {
            msgError = ("Email Inválido");
        } else if (error.message.includes("email-already-in-use")) {
            msgError = ("Email já está em uso");
        } else if (error.message.includes("weak-password")) {
            msgError = ("A sua senha deve ter pelo menos 6 caracteres");
        } else {
            msgError = (error.message);
        }

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: msgError
        });
        throw error; 
    }
}

export const signIn = async (email, password) => {



    let msgError = "";
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error.message.includes("invalid-credential")) {
            msgError = ("Email e/ou senha Inválida(s)");
        }  else {
            msgError = (error.message);
        }

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: msgError
        });
        throw error;
    }


}

export const db = getFirestore(app);
