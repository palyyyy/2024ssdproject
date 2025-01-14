import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RequestPage = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileURL = "";
      if (file) {
        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "requests"), {
        description,
        fileURL,
        status: "pending",
        createdAt: new Date(),
      });

      alert("Request submitted successfully!");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting request:", error.message);
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
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
      </Paper>
    </Container>
  );
};

export default RequestPage;
