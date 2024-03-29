import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";


import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Header from "./components/Home/Header/Header";

import About from "./components/About/About";
import Cart from "./components/Cart/Cart";

import ProductDetails from "./components/ProducDet/ProductDetails";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Checkout from "./components/Checkout/Checkout";
import {
  PrivateRouteAuthenticated,
  PrivateRouteUnauthenticated,
} from "../src/components/PrivateRoute";
import OrderStatus from "./components/MyAccount/OrderStatus/OrderStatus";
import MyAccount from "./components/MyAccount/MyAccount";
import OrderCard from "./components/MyAccount/OrderCards/OrderCard";
import Profile from "./components/MyAccount/Profile/Profile";

function App() {
  const isAuthenticated = localStorage.getItem("isUserLoggedIn") ? true : false;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop />} />

                  <Route
                    path="/shop/:categoryName/:subcategory?"
                    element={<Shop />}
                  />

                  <Route
                    path="/product-details/:productId"
                    element={<ProductDetails />}
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRouteAuthenticated
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  >
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                      path="/order-status/:trans_id"
                      element={<OrderStatus />}
                    />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/my-orders" element={<OrderCard />} />
                    <Route path="/my-profile" element={<Profile />} />
                  </Route>
                </Routes>
                <Footer />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRouteUnauthenticated isAuthenticated={!isAuthenticated} />
            }
          >
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/registration" element={<Registration />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
