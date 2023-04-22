const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    author: { 
        type:String,
        required:true
    },
    pname:{
        type:String, 
        required:true
    },
    pdesc:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    img:{
        type:String
    },
    end:{
        type:Boolean,
        default:false
    }
});

ProductSchema.set('timestamps',true);

const ProductCollection = mongoose.model('Product',ProductSchema);
module.exports = ProductCollection;