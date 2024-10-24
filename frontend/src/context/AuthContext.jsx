import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// auth provider

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //login a user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // sign-up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    //logout user
    const logoutUser = async () => {
        return await signOut(auth);
    }

    //manage user state
    useEffect(() => {
       const unsuscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false)

        if(user) {
            const {email, displayName, photoURL } = user;
            const userData = {
                email,username: displayName,photo: photoURL
            }
        }
       })
       return () => unsuscribe();
    },[])

    const value = {
        loading,
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser
    }

    return (
       <AuthContext.Provider value={value}>
           {children}
       </AuthContext.Provider>
    )
}