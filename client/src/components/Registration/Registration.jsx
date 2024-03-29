import React, { useState } from 'react';
import "./Registration.css";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    // State variables to store form data
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate =useNavigate()

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Send form data to backend for registration
        try {
            const response = await fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    email,
                    phoneNumber,
                    password
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Registration successful
                alert("Registration successful");
                // Redirect user to login page or any other page as needed
                navigate('/login')
            } else {
                // Registration failed
                alert(data.error);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user. Please try again later.");
        }
    };

    return (
        <div className="container-reg">
            <div className="title"> Gizmo Registration</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name</span>
                            <input type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input type="text" placeholder="Enter your number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
