import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const user = auth.currentUser;
      if (user && user.uid === "BdUOYS3PeMfqDQIcJFqK2Ga2Hqr1") {
        setIsAdmin(true);
      } else {
        alert("Access Denied! Redirecting to the main page.");
        window.location.href = "/request"; // Redirect to request page for non-admin users
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const fetchRequests = async () => {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const requestData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestData);
      };

      fetchRequests();
    }
  }, [isAdmin]);

  const handleApprove = async (id) => {
    try {
      const requestRef = doc(db, "requests", id);
      await updateDoc(requestRef, { status: "approved" });
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "approved" } : request
        )
      );
    } catch (error) {
      console.error("Error approving request:", error.message);
    }
  };

  const handleDeny = async (id) => {
    try {
      const requestRef = doc(db, "requests", id);
      await updateDoc(requestRef, { status: "denied" });
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "denied" } : request
        )
      );
    } catch (error) {
      console.error("Error denying request:", error.message);
    }
  };

  if (!isAdmin) {
    return null; // Prevent rendering the page while redirecting unauthorized users
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.description}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                {request.fileURL ? (
                  <a href={request.fileURL} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  "No file"
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(request.id)}
                  disabled={request.status === "approved"}
                  style={{ marginRight: "10px" }}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeny(request.id)}
                  disabled={request.status === "denied"}
                >
                  Deny
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminDashboard;
