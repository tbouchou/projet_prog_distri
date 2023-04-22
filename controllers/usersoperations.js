const Product = require('../models/Product');
const Bid = require('../models/Bid');

function updateEnd(prod){
  Product.updateOne({_id:prod._id},{end:true},(e,s)=>{
    if (e){
      console.log(e)
    }
    else {
      console.log(s)
    }
  });

}

const userOperations = {
async addProduct (reqObject,res,userid){
      const { item, desc, price} = reqObject;
      var prod = Product.create({
        author: userid,
        pname: item,
        pdesc : desc,
        amount : price
   
      });
      var parProd = (await prod).toObject()
      setTimeout(function () {
        updateEnd(parProd)
      }, 1000 * 60 * 60);

},
async bidOnProduct (productId,userid,bidAmount){
  Bid.create({
    author: userid,
    pid: productId,
    bidamount : bidAmount

  });
}
}




module.exports = userOperations;