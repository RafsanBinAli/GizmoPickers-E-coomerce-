import React, { useState } from "react";

import "./login.css";
import man  from "../../assets/images/man.png"
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  
  
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const location =useLocation();
const navigate =useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // console.log(response);
    const data = await response.json();

    if (response.ok) {
      const queryParams = new URLSearchParams(location.search);
      const redirectPath = queryParams.get('location');
      if(redirectPath)
      {
        navigate('/checkout')
      }
      console.log(redirectPath)
      
      alert("Login Successful");
      localStorage.setItem('isUserLoggedIn','true')
      localStorage.setItem('userAuthToken',data.token)
     
      window.location.reload();


    }
    else {
      alert("Invalid Username or Password")
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={man} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit} method="POST">
            <span className="login100-form-title">Member Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid username is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="username"
                value={username}
                placeholder="username"
                onChange={(e) => setusername(e.target.value)} // Ensure this line is correctly updating the state
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center p-t-136">
              <a className="txt2" href="/user/registration">
                Create your Account
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;