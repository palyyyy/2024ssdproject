import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import SignInPage from "./pages/SignInPage";
import RequestPage from "./pages/RequestPage";
import AdminDashboard from "./pages/AdminDashboard";
import RequestSentPage from "./pages/RequestSentPage";
import AppBarLayout from "./components/AppBarLayout";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const adminUID = "BdUOYS3PeMfqDQIcJFqK2Ga2Hqr1"; // Hardcoded Admin UID

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Authenticated user:", currentUser.uid);
        setUser(currentUser);

        // Hardcoded admin check
        if (currentUser.uid === adminUID) {
          console.log("Admin detected via hardcoded UID.");
          setIsAdmin(true);
          return; // Skip Firestore check for admin
        }

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            console.log("User role data:", userDoc.data());
            setIsAdmin(userDoc.data().isAdmin || false);
          } else {
            console.warn("No user document found in Firestore.");
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      } else {
        console.log("No authenticated user.");
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      {user ? (
        <AppBarLayout>
          <Routes>
            {/* Redirect admin to Admin Dashboard */}
            {isAdmin ? (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </>
            ) : (
              <>
                {/* User Routes */}
                <Route path="/request" element={<RequestPage />} />
                <Route path="/request-sent" element={<RequestSentPage />} />
                <Route path="*" element={<Navigate to="/request" />} />
              </>
            )}
          </Routes>
        </AppBarLayout>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignInPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
