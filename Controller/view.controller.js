const db = require('../db/db');

const viewOrder = async (req, res) => {
    try {
        const sql =
            `select   
                o.name,
                o.order_date,
                o.order_quantity,
                p.payment_total,
                p.payment_status
            from user.orders o
            join user.payments p on p.order_id=o.order_id
        `;
        const [results] = await db.execute(sql);
        res.status(200).json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//update Status by admin reques
const updateStatus = async (req, res) => {
    try {
        const { payment_status, payment_id } = req.body;
        const sql = `
            update user.payments
            set payment_status = ?
            where payment_id=?

        `;
        await db.execute(sql, [payment_status, payment_id]);
        res.status(200).json({ message: "Payment Status Updated" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

};


module.exports = { viewOrder, updateStatus };