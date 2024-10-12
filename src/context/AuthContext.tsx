import React, { ReactNode, useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
    googleSignIn: () => void;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User", currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};
