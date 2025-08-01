import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
