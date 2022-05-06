import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CompleteSignup from "./components/Auth/CompleteSignup";
import Login from "./components/Auth/Login";
import LoadingBar from "react-top-loading-bar";
import { currentUser } from "./functions/auth";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  const [bar, setBar] = useState(0);
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar color="#000000" height={3} bar={bar} progress={bar} />
        <ToastContainer />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact
            path="/login"
            progress={setBar}
            element={<Login />}
          ></Route>

          <Route
            exact
            path="/signup"
            setBar={setBar}
            element={<Register />}
          ></Route>

          <Route
            setBar={setBar}
            exact
            path="/forgotPassword"
            element={<ForgotPassword />}
          ></Route>

          <Route
            setBar={setBar}
            exact
            path="/signup/complete"
            element={<CompleteSignup />}
          ></Route>

          <Route
            setBar={setBar}
            exact
            path="/user/profile"
            element={
              <UserRoute>
                <UserProfile />
              </UserRoute>
            }
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="/user/profile"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
