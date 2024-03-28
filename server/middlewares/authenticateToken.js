const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;



exports.authenticateToken = (req, res, next) => {
    console.log(process.env.JWT_SECRET);
    try {
        // Check if the 'Authorization' header exists
        const authHeader = req.headers['authorization'];
       
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
        }
        
        // Split the header value to extract the token
        const tokenParts = authHeader.split(' ');
        
        const token = tokenParts[1];
        console.log("token= ",token)
       

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }

            // If the token is valid, attach the user information to the request object
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error authenticating token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
