const jwt = require('jsonwebtoken');
const Product = require('../models/product');

const auth = async (req, res, next) => {
    try{
        const curr_token = req.cookies.jwt;
        const verifyToken = await jwt.verify(curr_token, process.env.S_KEY);
        const prodDetails = await Product.findOne({PID: verifyToken.PID});
        req.token = curr_token;
        req.product = prodDetails;
        next();
    } catch(e) {
        res.status(401).send(e);
    }
}

module.exports = auth;