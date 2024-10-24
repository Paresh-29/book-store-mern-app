
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = async (req, res, next) => {
    const token =  req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(403).send({message: "ACCESS DENIED. No token provided"});
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({message: "Invalid token"});
        }
        req.user = user;
        next();
    })
}

module.exports = verifyAdminToken