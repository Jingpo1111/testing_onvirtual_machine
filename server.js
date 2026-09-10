require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
db = require('./db/db');
const userRoutes = require('./Routes/user.routes');
const orderRoutes = require('./Routes/order.routes');
const categoryRoutes = require("./Routes/category.routes");
const productRoutes = require("./Routes/product.routes");
const restockRoutes = require("./Routes/restock.routes");
const promotion = require("./Routes/promotion.routes");
const payment = require("./Routes/payment.routes");
const vieworder = require("./Routes/view.routes");

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', restockRoutes);
app.use('/api', promotion);
app.use('/api', payment);
app.use('/api', vieworder);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});