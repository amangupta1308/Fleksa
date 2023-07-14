const express = require('express');
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
require('dotenv').config();
require('./db/conn');
const cors=require("cors");
app.use(cors());
const productRoutes = require('../routes/routes');

app.use(productRoutes);
app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}`));