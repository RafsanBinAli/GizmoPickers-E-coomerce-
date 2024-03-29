import React, { useState } from "react";
import "./login.css";
import man from "../../../assets/img/man.png"


const Login = () => {
   
    const [username, setUsername] = useState(""); // Changed state variable name to 'username'
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:4000/admin/signin-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username, // Changed 'email' to 'username'
                password: password,
            }),
        });

        const data = await response.json();
       
        

        if (response.ok) {
            localStorage.setItem('authToken',data.token)
            
            alert("Login Successful");
            window.location.reload();
            
        } else {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={man} alt="IMG" />
                    </div>

                    <form
                        className="login100-form validate-form"
                        onSubmit={handleSubmit}
                        method="POST"
                    >
                        <span className="login100-form-title">Admin Login</span>

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="text" // Changed 'email' to 'text'
                                name="username" // Changed 'email' to 'username'
                                value={username}
                                placeholder="Username" // Changed 'Email' to 'Username'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input">
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
                            <a className="txt2" href="/registration">
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
