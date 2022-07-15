const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');

exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(401).json({
            errorMessage: "No token. Authentication denied",
        })
    }

    // next();
}