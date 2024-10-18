import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Typography } from '@mui/material';

const NavBar: React.FC = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
            <Typography>
                    Home Page
                </Typography>
            </div>
            <div style={styles.right}>
                {user?.displayName ? (
                    <button onClick={handleSignOut} style={styles.logoutButton}>Logout</button>
                ) : null} {/* No login link */}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ccc',
    },
    left: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    right: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    logo: {
        textDecoration: 'none',
        color: '#333',
    },
    logout: {
        textDecoration: 'none',
        color: '#d9534f',
    },
    logoutButton: {
        background: 'none',
        border: 'none',
        color: '#d9534f',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default NavBar;