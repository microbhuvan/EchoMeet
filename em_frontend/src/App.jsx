import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

import Home from "./Pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Auth from "./Pages/Authentication/Auth";
import Activate from "./Pages/Activate/Activate";
import Rooms from "./Pages/Rooms/Rooms";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";

const GuestRoute = ({ children }) => {
  const auth = useSelector((state) => state.authSlice);
  const { isAuth } = auth;
  //if the user is logged in only then the redirect to room
  // else it will render <children /> component
  return isAuth ? <Navigate to="/rooms" replace /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.authSlice);
  const { user, isAuth } = auth;
  //if user is logged in and activated then go to rooms
  //if user is logged in but not activated then render children
  //if user is not logged in and not activated redirect to home page
  return isAuth ? (
    user.activated ? (
      <Navigate to="/rooms" replace />
    ) : (
      children
    )
  ) : (
    <Navigate to="/" replace />
  );
};

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.authSlice);
  const { user, isAuth } = auth;
  //if user logged in and activated then render children
  //if user logged in but not activated route to /activate
  //if user not logged nor activated then route to / (home)
  return isAuth ? (
    user.activated ? (
      children
    ) : (
      <Navigate to="/activate" replace />
    )
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    "Loading..."
  ) : (
    <div>
      <Navigation />
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* GUEST ROUTES */}
        {/* so here the home should go under conditional checks for login*/}
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <Auth />
            </GuestRoute>
          }
        />

        {/* SEMI-PROTECTED ROUTES */}
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
