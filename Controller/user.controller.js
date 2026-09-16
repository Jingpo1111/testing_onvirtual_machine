const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const sql = 'SELECT user_id,username FROM user.users';
        const [results] = await db.execute(sql);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
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



const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(402).json({ message: "Please input Username" });
        }

        const sql = "select * from user.users where username =?"
        const [results] = await db.execute(sql, [username]);
        if (results.length === 0) {
            return res.status(402).json({ message: "wrong username!" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: " Wrong password" });
        }
        const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        delete user.password;
        res.status(201).json({ message: "Login Successfully", user: username, token: token }); s
    } catch (err) {
        res.status(500).json({ error: message.err });
    }
};


const createUser = async (req, res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(402).json({ message: "Require username and password" });
        }
        const hahpassword = await bcrypt.hash(password, 10)
        const sql = "insert into user.users(username,password) values(?,?)"
        await db.execute(sql, [username, hahpassword]);
        res.status(201).json({ message: "Created account sucessfully", username: username })

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "error or douplicate username" });
        }
        res.status(500).json({ error: message.err });
    }
};












module.exports = { getUser, createUser, deleteUser, loginUser };