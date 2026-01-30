import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyCFjtF-60AH79MLprzDMZqGWuKXTudreBE",
  authDomain: "netflix-clone-8792b.firebaseapp.com",
  projectId: "netflix-clone-8792b",
  storageBucket: "netflix-clone-8792b.firebasestorage.app",
  messagingSenderId: "973907950763",
  appId: "1:973907950763:web:dff003fdf2bb0fc3ba8bee",
  measurementId: "G-YMYRHM2C05",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out");
  } catch (error) {
    console.log(error);
    toast.error("Logout failed");
  }
};

export { app, auth, db, signup, login, logout };
