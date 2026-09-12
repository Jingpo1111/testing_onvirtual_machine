const db = require('../db/db');

const getReview = async (req, res) => {
    try {
        const { product_id } = req.body;
        const sql = 'select*from user.reviews where product_id=?';
        const [results] = await db.execute(sql, [product_id]);
        res.status(200).json({ results });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};
// for user who completed payment_status=completed and order_status=completed
const addReview = async (req, res) => {
    try {
        const { payment_id, product_id, user_id, review_note } = req.body;
        if (!payment_id || !user_id || !review_note) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const sql = `select p.payment_status
                    from user.payments p 
                    join user.orders o on p.order_id =o.order_id
                    join user.users u on u.user_id=o.user_id
                    where o.user_id=? and p.payment_id=? and payment_status='completed'
                    LIMIT 1
        `;
        const [results] = await db.execute(sql, [payment_id, user_id]);
        if (results.length === 0) {
            return res.status(403).json({ error: "User has not completed the payment for this order" });
        }
        const checkReviewSql = await db.execute('select * from user.reviews where payment_id=? and product_id=?', [payment_id, product_id]);
        if (checkReviewSql[0].length > 0) {
            return res.status(400).json({ error: "Review already exists for this payment and product" });
        }

        const insertSql = 'insert into user.reviews(payment_id,product_id, review_note) values(?,?,?)';
        await db.execute(insertSql, [payment_id, product_id, review_note]);
        res.status(200).json({ message: "Review added successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};





module.exports = { getReview, addReview };