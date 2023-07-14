const express = require('express');
const router = new express.Router();
const Product = require('../src/models/product');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const auth = require('../src/middleware/auth');

router.post('/api/product', async (req, res)=>{
    try{
        const prod_details = req.body;
        const new_product = new Product(prod_details);
        const result = await new_product.save();
        return res.json({"message": "New product listed successfully!"});
    } catch(e) {
        return res.json({"error": e.message});
    }
})

router.get('/api/product', async (req, res)=>{
    try{
        const all_products = await Product.find();
        return res.json({"message": all_products})
    } catch(e) {
        return res.json({"error": e.message});
    }
})

router.patch('/api/product/:PID', async (req, res)=>{
    try{
        const new_prod_data = req.body;
        const PID = req.params.PID;
        const ObjId = await Product.find({PID}, {_id: 1});
        const updated_product = await Product.findByIdAndUpdate(ObjId, new_prod_data, {new: true});
        return res.json({"message": updated_product})
    } catch(e) {
        return res.json({"error": e.message});
    }
})

//delete one
router.delete('/api/product/:PID', async (req, res)=>{
    try{
        const PID = req.params.PID;
        const ObjId = await Product.find({PID}, {_id: 1});
        const updated_product = await Product.findByIdAndDelete(ObjId);
        return res.json({"message": updated_product})
    } catch(e) {
        return res.json({"error": e.message});
    }
})

//delete all
router.delete('/api/product', async (req, res)=>{
    try{
        const deleted_products = await Product.deleteMany({});
        if(!deleted_products.deletedCount) return res.json({"message": "No item to delete!"});
        else return res.json({ "message": "All documents deleted", "deletedCount": deleted_products.deletedCount });
    } catch(e) {
        return res.json({"error": e.message});
    }
})

module.exports = router;