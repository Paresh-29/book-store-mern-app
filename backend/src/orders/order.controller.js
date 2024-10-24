const Order = require("./order.model");

const createAOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

const getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email: email }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        // Add this line to send the response
        return res.status(200).json({ orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: "Failed to get orders", error: error.message });
    }
};

// Correct export using CommonJS
module.exports = {
    createAOrder,
    getOrdersByEmail
};
