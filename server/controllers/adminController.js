const bcrypt = require('bcrypt');
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middlewares/authenticateToken');

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({
          error: "Admin with the same username or email already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find the admin by username
      const admin = await Admin.findOne({ username });
  
      // If admin not found, return error
      if (!admin) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Verify password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username, email: admin.email },
        process.env.JWT_SECRET, // Secret key for signing the token
         // Token expiration time (optional)
      );
  
      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.getAdminInfo = async (req, res) => {
    try {
      authenticateToken(req,res,async()=>{
        const { id } = req.user;
  
        // Query the database to find the admin by ID
        const admin = await Admin.findById(id);
    
        if (!admin) {
          return res.status(404).json({ error: "Admin not found" });
        }
    
        
        res.status(200).json({ admin });
      })
      // Extract the user ID from the decoded JWT payload
      
    } catch (error) {
      console.error("Error fetching admin information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };