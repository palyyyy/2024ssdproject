import React, { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextField, Button, Box, Container, Typography, Paper, Alert } from "@mui/material";

const RequestPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMessage("Please fill in all mandatory fields: Name, Email, and Message.");
      return;
    }

    try {
      let fileURL = "";

      // Upload file if provided
      if (file) {
        const fileRef = ref(storage, `requests/${file.name}`);
        const uploadResult = await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(uploadResult.ref);
      }

      // Add request to Firestore
      await addDoc(collection(db, "requests"), {
        name,
        email,
        message,
        fileURL: fileURL || "No file uploaded", // Default if no file is uploaded
        status: "pending",
        createdAt: new Date(),
      });

      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
      setErrorMessage("");
      setSuccessMessage("Your request has been successfully submitted!");
    } catch (error) {
      console.error("Error submitting request:", error.message);
      setErrorMessage("An error occurred while submitting your request. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Submit a Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <TextField
            type="file"
            fullWidth
            margin="normal"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Request
            </Button>
          </Box>
        </form>
        {successMessage && (
          <Box mt={3}>
            <Alert severity="success">{successMessage}</Alert>
          </Box>
        )}
        {errorMessage && (
          <Box mt={3}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RequestPage;
