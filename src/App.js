import React from "react";
import Auth from "./components/Auth"; // Correct path to Auth component

function App() {
  return (
    <div>
      <h1>QuoteRequest</h1>
      <Auth /> {/* Sign-in component */}
    </div>
  );
}

export default App;
