const express = require("express");
const router = express.Router();
const { createAOrder, getOrdersByEmail } = require("./order.controller");

// Add debugging middleware
router.use((req, res, next) => {
    console.log('Orders API Request:', {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body
    });
    next();
});

router.post("/", createAOrder);
router.get("/email/:email", getOrdersByEmail);

module.exports = router;