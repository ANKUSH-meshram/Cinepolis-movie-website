// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtrkGvVLmKTGAdO5MLCzUOp_jXbXaIucc",
  authDomain: "cinepolis-movieapp.firebaseapp.com",
  projectId: "cinepolis-movieapp",
  storageBucket: "cinepolis-movieapp.appspot.com",
  messagingSenderId: "982921947465",
  appId: "1:982921947465:web:264c3a2f16ca7fab11d298"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

// Create a new user
export const createUser = async (name, surname, email, password, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: `${name} ${surname}`,
    });
    //
    if (auth.currentUser) {
      const { email, displayName, photoURL } = auth.currentUser;
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email, displayName, photoURL })
      );
    }

    navigate("/");
    toast.success("Registered successfully", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    toast.error(error.message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }
};

// Login Function
export const loginWithEmail = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toast.success("Logged in successfully!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    toast.error(error.message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }
};

// Login With Google
export const loginWithGoogle = async (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => {
      navigate("/");
      toast.success("Logged in successfully!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    });
};

// Logout Function
export const logOut = (navigate) => {
  signOut(auth);
  navigate("/login");
  toast.success("Logged out successfully!", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
};

// Login Control Function
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email, displayName, photoURL })
      );
    } else {
      localStorage.removeItem("currentUser");
      setCurrentUser(false);
    }
  });
};

// Reset Function
export const passwordReset = (navigate, email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      navigate("/login");
      toast.error("Please check your mail box!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    });
};