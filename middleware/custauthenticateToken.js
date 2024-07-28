// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const {User} = require("../db/models");
require('dotenv').config();
// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRATE_KEY;

const custauthenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded)
        const userId = decoded.id;

        // Fetch user info from the database
        const userRecord = await User.findOne({where : {id : userId}})
        console.log(userRecord.userType)
        // const user = result.rows[0];

        if (!userRecord) return res.status(404).json({ message: "User not found" });
        if(userRecord.userType != '1') return res.status(401).json({ message: "not authorized" });
        
        req.user = userRecord;
        next();
    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Invalid token" });
        } else {
            res.status(403).json({ message: "Failed to authenticate token" });
        }
    }
};

module.exports = custauthenticateToken;
