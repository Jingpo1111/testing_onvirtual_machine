const db = require('../db/db');

const getUser = async (req, res) => {
    try {
        const sql = 'SELECT * FROM user.users';
        const [results] = await db.execute(sql);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const sql = 'insert into user.users(username, password) values(?, ?)';
        await db.execute(sql, [username, password]);
        res.status(201).json({ message: 'Created User' });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const sql = "delete from user.users where user_id =?";
        await db.execute(sql, [id]);
        res.status(200).json({ message: "User delete sucessfully" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

module.exports = { getUser, createUser, deleteUser };