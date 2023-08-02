require("dotenv").config()
const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]
    console.log(process.env.JWT_TOKEN_SECRET)
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        // console.log(decoded)
        req.user = decoded
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken
