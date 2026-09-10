const db = require("../db/db");

const addPayment = async (req, res) => {
    try {
        const { promo_code, order_id } = req.body;
        const insertSql = "INSERT INTO user.payments (promo_code, order_id) VALUES (?, ?)";
        const [result] = await db.execute(insertSql, [promo_code, order_id]);
        const paymentId = result.insertId;
        const updateSql = `
      UPDATE user.payments AS p
      JOIN user.promotions AS pr ON p.promo_code = pr.promo_code
      JOIN user.orders AS o ON o.order_id = p.order_id
      JOIN user.products AS pd ON o.product_id = pd.product_id
      SET 
        p.payment_total = (o.price * o.order_quantity) * (1 - pr.promo_disscount * 0.01),
        pd.product_quantity = pd.product_quantity - o.order_quantity,
        pr.promo_stock = pr.promo_stock - 1
      WHERE p.payment_id = ?;
    `;
        await db.execute(updateSql, [paymentId]);

        res.status(200).json({
            message: "Payment Created & Processed Successfully",
            payment_id: paymentId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getPayment = async (req, res) => {
    try {
        const sql = "Select *from user.payments";
        const [results] = await db.execute(sql);
        res.status(200).json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addPayment, getPayment };