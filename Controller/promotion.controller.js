const db = require('../db/db');

const addPromotion = async (req, res) => {
    try {
        const { promo_code, promo_expired, promo_stock, promo_disscount } = req.body;
        const sql = "insert into user.promotions (promo_code, promo_expired, promo_stock, promo_disscount) values(?,?,?,?)";
        await db.execute(sql, [promo_code, promo_expired, promo_stock, promo_disscount]);
        res.status(200).json({ message: "Added Promotion successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getpromotions = async (req, res) => {
    try {
        const sql = "select *from user.promotions";
        const [results] = await db.execute(sql);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

const deletepromotions = async (req, res) => {
    try {
        const { promo_id } = req.body;
        const sql = "delete from user.promotions where promo_id=?";
        await db.execute(sql, [promo_id]);
        res.status(200).json({ message: "Deleted promotion successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { addPromotion, getpromotions, deletepromotions };