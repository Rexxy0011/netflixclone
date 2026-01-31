import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
        toast.success("Welcome back!");
        navigate("/");
      } else {
        console.log("user logged out");
        toast("You are logged out");
        navigate("/login");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
