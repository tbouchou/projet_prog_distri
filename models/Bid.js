const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BidSchema = new Schema({
    'author':{type:String,required:true},
    'pid':{type:String,required:true},
    'bidamount':{type:Number,required:true}
});
var BidCollection = mongoose.model('bids',BidSchema);
module.exports = BidCollection;