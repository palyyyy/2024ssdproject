import React from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Fetch admin status from Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists() && userDoc.data().isAdmin) {
        alert("Welcome, Admin!");
        navigate("/admin"); // Redirect to admin page
      } else {
        alert("Welcome, User!");
        navigate("/request"); // Redirect to request page
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to QuoteRequest
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please sign in to continue.
        </Typography>
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;
