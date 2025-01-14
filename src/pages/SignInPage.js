import React from "react";
import { Button, Container, Typography, Box, Grid, Paper } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

const SignInPage = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Sign in successful!");
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
