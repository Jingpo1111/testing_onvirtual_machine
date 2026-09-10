const db = require('../db/db');

const addRestock = async (req, res) => {
    try {
        const { category_id, product_id, quantity, numberphone, company } = req.body;
        const sql = "insert into user.restocks(category_id,product_id,quantity,numberphone,company) values(?,?,?,?,?)";
        await db.execute(sql, [category_id, product_id, quantity, numberphone, company]);
        const newsql = "update user.products set product_quantity= product_quantity+?   where product_id=?";
        await db.execute(newsql, [quantity, product_id]);
        res.status(200).json({ message: "Successfully Restock" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRestock = async (req, res) => {
    try {
        const sql = "select *from user.restocks";
        const [results] = await db.execute(sql);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addRestock, getRestock };
