import React from "react";
import { Button } from "@mui/material";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "/"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleLogout}
      style={{ position: "absolute", top: "10px", right: "10px" }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
