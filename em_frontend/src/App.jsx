import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
