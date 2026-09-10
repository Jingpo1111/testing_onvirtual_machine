const db = require('../db/db');

const AddOrder = async (req, res) => {
    try {
        const { user_id, name, price, product_id, order_quantity } = req.body;
        const checkstock = "UPDATE user.products set product_quantity = product_quantity-? where product_id=? and product_quantity>=? ";
        const [updated] = await db.execute(checkstock, [order_quantity, product_id, order_quantity]);
        if (updated.affectedRows === 0) {
            return res.status(400).json({ message: "Insufficient stock for the requested product." });
        }
        const sql = "insert into user.orders(user_id , name, price, product_id, order_quantity) values(?,?,?,?,?)";
        await db.execute(sql, [user_id, name, price, product_id, order_quantity]);
        res.status(200).json({ message: 'Order Added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};
const getOrder = async (req, res) => {
    try {
        const sql = "select *from user.orders";
        const [rows] = await db.execute(sql);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.body;
        const sql = "delete from user.orders where order_id=?";
        await db.execute(sql, [order_id]);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

module.exports = { AddOrder, getOrder, deleteOrder };