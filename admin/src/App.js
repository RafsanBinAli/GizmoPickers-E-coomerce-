import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/bootstrap.css";
import "./assets/font-awesome/css/font-awesome.css";
import "./assets/lineicons/style.css";
import "./assets/css/style.css";
import "./assets/css/style-responsive.css";

import "./assets2/css/bootstrap.css";
import "./assets2/css/font-awesome.css";
import "./assets2/css/basic.css";
import "./assets2/css/custom.css";
import DashMain from "./components/Admin/Dashboard/DashMain";
import Upload from "./components/Admin/Upload/Upload";
import Coupon from "./components/Admin/Coupon/Coupon";
import ShowUp from "./components/Admin/ShowUp/ShowUp";
import EditPro from "./components/Admin/EditPro/EditPro";
import Category from "./components/Admin/Category/Category";
import FeatureProducts from "./components/Admin/FeatureProducts/FeatureProducts";
import Signup from "./components/Admin/Signup/Signup";
import Login from "./components/Admin/Login/Login";
import Blogs from "./components/Admin/Blogs/Blogs";
import PendingOrders from "./components/Admin/Orders/PendingOrders";
import ViewOrderDetails from "./components/Admin/Orders/ViewOrderDetails/ViewOrderDetails";
import { PrivateRouteAuthenticated, PrivateRouteUnauthenticated } from "./components/Admin/PrivateRoute";

function App() {
  const isAuthenticated = localStorage.getItem("authToken") ? true : false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PrivateRouteAuthenticated isAuthenticated={isAuthenticated} />}
          >
            <Route path="/admin/home" element={<DashMain />} />
            <Route path="/admin/upload" element={<Upload />} />
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="/admin/show-products" element={<ShowUp />} />
            <Route
              path="/admin/edit-product/:productId"
              element={<EditPro />}
            />
            <Route path="/admin/category" element={<Category />} />
            <Route
              path="/admin/feature-products"
              element={<FeatureProducts />}
            />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/pending-orders" element={<PendingOrders />} />
            <Route
              path="/admin/order-details/:transactionId"
              element={<ViewOrderDetails />}
            />
          </Route>

          <Route
            path="/"
            element={<PrivateRouteUnauthenticated isAuthenticated={!isAuthenticated} />}
          >
            <Route path="/admin/signup" element={<Signup />} />
            <Route path="/admin/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
