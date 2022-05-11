import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CompleteSignup from "./components/Auth/CompleteSignup";
import Login from "./components/Auth/Login";
import LoadingBar from "react-top-loading-bar";
import { currentUser } from "./functions/auth";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import OrderHistory from "./components/Users/OrderHistory";
import ProductCreate from "./components/Admin/Products/ProductCreate";
import CategoryCreate from "./components/Admin/Category/CategoryCreate";
import CategoryUpdate from "./components/Admin/Category/CategoryUpdate";
import SubCreate from "./components/Admin/Category/Sub/SubCreate";
import SubUpdate from "./components/Admin/Category/Sub/SubUpdate";

function App() {
  const [bar, setBar] = useState(0);
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user.displayName);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: user.displayName,
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
      <Navbar />
      <LoadingBar color="#000000" height={3} bar={bar} setBar={setBar} />{" "}
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />}>
          {" "}
        </Route>
        <Route exact path="/login" setBar={setBar} element={<Login />}></Route>
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
        <Route setBar={setBar} path="/user/*" element={<UserRoute />}>
          <Route
            setBar={setBar}
            path="profile"
            element={<UserProfile />}
          ></Route>
        </Route>
        <Route setBar={setBar} exact path="/admin/*" element={<AdminRoute />}>
          <Route
            setBar={setBar}
            exact
            path="dashboard"
            element={<AdminDashboard />}
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="product"
            element={<ProductCreate />}
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="category"
            element={<CategoryCreate />}
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="sub"
            element={<SubCreate />}
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="category/:slug"
            element={<CategoryUpdate />}
          ></Route>
          <Route
            setBar={setBar}
            exact
            path="sub/:slug"
            element={<SubUpdate />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
