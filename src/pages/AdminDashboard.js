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
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

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