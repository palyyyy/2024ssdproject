import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RequestSentPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Request Sent
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your request has been successfully submitted. We will get back to you shortly.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RequestSentPage;
