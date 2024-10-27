const { db } = require('../config');

// Get all orders
const getOrders = (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        const orders = results.map(order => ({
            ...order,
            items: order.items ? JSON.parse(order.items) : [] // Parse items back into array
        }));
        res.json(orders);
    });
};

// create a new order
const createOrder = (req, res) => {
    const { customerName, status, orderType, scheduledDate, scheduledTime, items } = req.body;
    const query = 'INSERT INTO orders (customerName, status, orderType, scheduledDate, scheduledTime, items) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [customerName, status, orderType, scheduledDate, scheduledTime, JSON.stringify(items)], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order created successfully', id: result.insertId });
    });
};

// update an order
const updateOrder = (req, res) => {
    const { id } = req.params;
    const { customerName, status, orderType, scheduledDate, scheduledTime, items } = req.body;
    const query = 'UPDATE orders SET customerName = ?, status = ?, orderType = ?, scheduledDate = ?, scheduledTime = ?, items = ? WHERE id = ?';
    db.query(query, [customerName, status, orderType, scheduledDate, scheduledTime, JSON.stringify(items), id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order updated successfully' });
    });
};

// Delete an order
const deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order deleted successfully' });
    });
};

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
