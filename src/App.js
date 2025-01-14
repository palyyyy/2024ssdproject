import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RequestPage from "./pages/RequestPage";
import AdminDashboard from "./pages/AdminDashboard";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="/" element={<SignInPage />} />
        ) : (
          <>
            <Route path="/request" element={<RequestPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </>
        )}
        <Route path="*" element={<Navigate to={user ? "/request" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
