import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../configs/firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const provider = {
        google: new GoogleAuthProvider(),
    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider.google);
    };

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo);
    };

    const logOut = () => signOut(auth);

    const authInfo = {
        user,
        setUser,
        loading,
        signInWithGoogle,
        registerUser,
        updateUserProfile,
        logOut,
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;