import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import CRoutes from "./routes";

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
import ProductList from "./components/Admin/Products/ProductList";
import ProductUpdate from "./components/Admin/Products/ProductUpdate";
import ProductOverView from "./components/Products/ProductOverView";
import CategoryVise from "./components/Products/CategoryVise";
import Furniture from "./pages/Furniture";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import CartSlide from "./components/Cart/CartSlide";

function App() {
  const [progress, setProgress] = useState(0);
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
      <LoadingBar color="#000000" height={4} progress={progress} />
      <ToastContainer />

      <CartSlide />

      <CRoutes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Register />}></Route>
        <Route exact path="/furniture" element={<Furniture />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/checkout" element={<CheckOut />}></Route>
        <Route
          exact
          path="/forgotPassword"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/signup/complete"
          element={<CompleteSignup />}
        ></Route>
        <Route
          exact
          path="/product/:slug"
          element={<ProductOverView />}
        ></Route>
        <Route exact path="/category/:slug" element={<CategoryVise />}></Route>
        <Route path="/user/*" element={<UserRoute />}>
          <Route path="profile" element={<UserProfile />}></Route>
          <Route path="history" element={<OrderHistory />}></Route>
        </Route>
        <Route exact path="/admin/*" element={<AdminRoute />}>
          <Route exact path="dashboard" element={<AdminDashboard />}></Route>
          <Route exact path="product" element={<ProductCreate />}></Route>
          <Route
            exact
            path="category"
            element={<CategoryCreate setProgress={setProgress} />}
          ></Route>
          <Route exact path="sub" element={<SubCreate />}></Route>
          <Route
            exact
            path="category/:slug"
            element={<CategoryUpdate />}
          ></Route>
          <Route exact path="sub/:slug" element={<SubUpdate />}></Route>
          <Route exact path="products" element={<ProductList />}></Route>
          <Route
            exact
            path="products/:slug"
            element={<ProductUpdate />}
          ></Route>
        </Route>
      </CRoutes>
    </>
  );
}

export default App;
