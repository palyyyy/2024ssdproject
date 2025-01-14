import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.error("No authenticated user found!");
          alert("Not authenticated! Redirecting...");
          window.location.href = "/request";
          return;
        }

        console.log("Authenticated user UID:", user.uid);

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          console.log("User document data:", userDoc.data());
          if (userDoc.data().isAdmin) {
            setIsAdmin(true);
          } else {
            console.error("User is not an admin.");
            alert("Access Denied! Redirecting...");
            window.location.href = "/request";
          }
        } else {
          console.error("No document found for this user in Firestore.");
          alert("Access Denied! Redirecting...");
          window.location.href = "/request";
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        alert("An error occurred. Redirecting...");
        window.location.href = "/request";
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return null;
  }

  return <div>Welcome to the Admin Dashboard!</div>;
};

export default AdminDashboard;
