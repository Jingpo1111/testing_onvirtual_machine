const db = require('../db/db');

const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const sql = "insert into user.categories(category_name) values(?)";
        await db.execute(sql, [category_name]);
        res.status(200).json({ message: "Added to category successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};

const getCategory = async (req, res) => {
    try {
        const sql = "select *from user.categories";
        const [results] = await db.execute(sql);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { category_id } = req.body;
        const sql = "delete from user.categories where category_id=?";
        await db.execute(sql, [category_id]);
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = { addCategory, getCategory, deleteCategory };
