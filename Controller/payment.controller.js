const db = require("../db/db");

const addPayment = async (req, res) => {
    try {
        const { promo_code, order_id } = req.body;
        const appliedCode = promo_code && promo_code.trim() !== "" ? promo_code.trim() : null;
        if (appliedCode) {
            const [promo] = await db.execute("select promo_stock, promo_expired from user.promotions where promo_code = ? ",
                [appliedCode]
            );
            if (promo.length === 0) {
                return res.status(400).json({ error: "Invalid promo code" });
            }
            if (promo[0].promo_code <= 0) {
                return res.status(400).json({ error: "Promo Code out of stock" });
            }
            if (new Date(promo[0].promo_expired) < new Date()) {
                return res.status(400).json({ error: "Promo Code has expired" });
            }
        }



        const insertSql = "INSERT INTO user.payments (promo_code, order_id) VALUES (?, ?)";
        const [result] = await db.execute(insertSql, [appliedCode, order_id]);
        const paymentId = result.insertId;
        const updateSql = `
      UPDATE user.payments AS p
      
      JOIN user.orders AS o ON o.order_id = p.order_id
      JOIN user.products AS pd ON o.product_id = pd.product_id
      LEFT JOIN user.promotions AS pr ON p.promo_code = pr.promo_code
      SET 
        p.payment_total = (o.price * o.order_quantity) * (1 - (COALESCE(pr.promo_disscount,0) * 0.01)),
        pd.product_quantity = pd.product_quantity - o.order_quantity,
        pr.promo_stock = CASE
            WHEN pr.promo_code is not null THEN pr.promo_stock -1
            ELSE pr.promo_stock
        END
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