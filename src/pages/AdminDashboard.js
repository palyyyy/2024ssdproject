import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import emailjs from "emailjs-com";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const requestData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestData);
      } catch (error) {
        console.error("Error fetching requests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const sendEmail = (email, name, status) => {
    const templateParams = {
      user_email: email,
      user_name: name,
      request_status: status,
    };

    emailjs
      .send(
        "service_wek7wl1", // Replace with your EmailJS service ID
        "template_vt5s38z", // Replace with your EmailJS template ID
        templateParams,
        "F3AVQvfrTgdWIFOt4oV_F" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      );
  };

  const handleDecision = async (id, email, name, status) => {
    try {
      // Update the request status in Firestore
      const requestRef = doc(db, "requests", id);
      await updateDoc(requestRef, {
        status,
      });

      // Send email notification
      sendEmail(email, name, status);

      // Update the state to reflect the new status
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Request List
      </Typography>
      {loading ? (
        <Typography>Loading requests...</Typography>
      ) : requests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>File</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.message}</TableCell>
                  <TableCell>
                    {request.fileURL && request.fileURL !== "No file uploaded" ? (
                      <a
                        href={request.fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    ) : (
                      "No file"
                    )}
                  </TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleDecision(request.id, request.email, request.name, "accepted")
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDecision(request.id, request.email, request.name, "declined")
                      }
                      style={{ marginLeft: "8px" }}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No requests found.</Typography>
      )}
    </Box>
  );
};

export default AdminDashboard;
