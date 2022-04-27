import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CompleteSignup from "./components/Auth/CompleteSignup";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/Login" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/Signup" element={<Register />}></Route>
          </Routes>
          <Routes>
            <Route
              exact
              path="/ForgotPassword"
              element={<ForgotPassword />}
            ></Route>
          </Routes>
          <Routes>
            <Route
              exact
              path="/register/complete"
              element={<CompleteSignup />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
