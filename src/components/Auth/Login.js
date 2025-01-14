import React from "react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Login;
