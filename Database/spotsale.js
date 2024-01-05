const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    billno:String,
    date:String,
    customer:String,
   balance:Number,
   paiditem:Number

  
 
})
module.exports =mongoose.model('spotsale',Productschema,'spotsale');