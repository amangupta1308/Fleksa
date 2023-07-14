const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
    PID:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

productSchema.methods.generateAuthToken = async function(){
    try{
        const curr_token = await jwt.sign({PID: this.PID.toString()}, process.env.S_KEY);
        this.tokens = this.tokens.concat({token: curr_token});
        await this.save();
        return curr_token;
    } catch(e){
        res.send(e);
    }   
}

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;