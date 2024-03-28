const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { fullName, username, email, phoneNumber, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password
        const newUser = new User({ fullName, username, email, phoneNumber, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET, // Secret key for signing the token
             // Token expiration time (optional)
          );

        // If the password matches, the user is successfully logged in
        // Here, you may generate and return a JWT token for authentication

        res.json({token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserDetails = async (req, res) => {
    try {
        // Assuming you want to get user details based on username
        const { customerId } = req.params;
        

        // Find the user by username
        const user = await User.findById(customerId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If user is found, respond with user details
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};