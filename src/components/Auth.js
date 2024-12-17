import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/config"; // Import the 'auth' service

const Auth = () => {
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <button onClick={signIn}>Sign In with Google</button>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default Auth;
