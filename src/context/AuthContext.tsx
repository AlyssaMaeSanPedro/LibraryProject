import React, { ReactNode, useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
    googleSignIn: () => void;
    logout: () => void;
    user: User | null;
    errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const ALLOWED_DOMAIN = "@neu.edu.ph";

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user.email && user.email.endsWith(ALLOWED_DOMAIN)) {
                console.log("User signed in:", user);
                setErrorMessage(null);
            } else {
                console.error("Unauthorized sign-up attempt:", user.email);
                await signOut(auth);
                alert("Please use institutional email or use guest mode");
                throw new Error("You are not part of our organization");
            }

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User:", currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user, errorMessage }}>
            {children}
            {errorMessage && (
                <div style={{ color: 'red', position: 'absolute', top: '20px', left: '20px' }}>
                    {errorMessage}
                </div>
            )}
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
