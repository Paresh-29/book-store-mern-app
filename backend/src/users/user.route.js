const express = require('express');
const User = require('./users.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const router = express.Router();

router.post("/admin", async (req, res) => {
    const {username, password} = req.body;

    try {
        const admin = await User.findOne({username});
        console.log(admin)
        if (!admin) {
            res.status(400).send({message: "admin not found"})

        }
        if (admin.password !== password) {
            res.status(400).send({message: "password incorrect"});
        }

        const token = jwt.sign({id: admin._id, username: admin.username, role: admin.role}, 
            JWT_SECRET,
            {expiresIn: "1h"}
        );
        return res.status(200).send({message: "admin logged in successfully",token: token, user: {
            username: admin.username,
            role: admin.role
        }})
    } catch (error) {
        console.error("failed to login as admin ", error);
        res.status(500).send({message: "failed to login as admin", error})
    }

})

module.exports = router