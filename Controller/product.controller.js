const db = require("../db/db");

const addProduct = async (req, res) => {
    try {
        const { category_id, product_name, product_quantity, product_price, product_detail } = req.body;
        const sql = 'insert into user.products(category_id, product_name, product_quantity, product_price, product_detail) values(?,?,?,?,?)';
        await db.execute(sql, [category_id, product_name, product_quantity, product_price, product_detail]);
        res.status(200).json({ message: "Add Products Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProduct = async (req, res) => {
<<<<<<< HEAD

    res.status(200).json({ message: "Get Product Successfully" });
    // res.status(2
    // try {
    //     const sql = "select *from user.products";
    //     const results = await db.execute(sql);
    //     res.status(200).json(results);

    // } catch (err) {
    //     res.status(500).json({ error: err.message });

=======
    res.status(200).json({ message: "Get Product Successfully" });
    // try {
    //     const sql = "select *from user.products";
    //     const results = await db.execute(sql);
    //     res.status(200).json(results);

    // } catch (err) {
    //     res.status(500).json({ error: err.message });

>>>>>>> 68681b4b7926216c96f9f6429a39b0dfc17ff4a1
    // }
};

const deleteProduct = async (req, res) => {
    try {
        const { product_id } = req.body;
        const sql = "delete from user.products where product_id=?";
        await db.execute(sql, [product_id]);
        res.status(200).json({ message: "Deleted Product Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addProduct, getProduct, deleteProduct };

