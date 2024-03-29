import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main Street',
    city: 'Anytown',
    country: 'USA',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save changes to the user data
    setIsEditing(false);
    // You can perform API requests here to update user data on the server
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        {isEditing ? (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
            />
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleChange}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>City:</strong> {userData.city}</p>
            <p><strong>Country:</strong> {userData.country}</p>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;