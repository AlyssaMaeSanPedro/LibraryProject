import React, { useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import bg from "../images/background.webp";

const Login :React.FC = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/Home');
    }
  }, [user]);

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 40, height: 40, mr: 1, bgcolor: "purple" }}>
          <BookTwoToneIcon sx={{ color: "white" }} />
        </Avatar>
        <Typography variant="h6" color="White" sx={{ fontWeight: 'bold', 
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 1)'
        }}>
          LIBRARY
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              mt: 1,
              p: 2,
              border: "1px solid white",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 5,
              width: '100%',
            }}
          >
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
              Login as
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' }, width: '100%' }}
              onClick={handleGoogleSignIn}
            >
              Student Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 0.5, mb: 1, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' }, width: '100%' }}
              onClick={handleGoogleSignIn}
            >
              Librarian Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 0.5, mb: 1, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' }, width: '100%' }}
              onClick={handleGoogleSignIn}
            >
              Admin Login
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
