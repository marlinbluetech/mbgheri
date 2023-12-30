const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    billno:String,
    date:String,
    customer:String,
   balance:Number,

  
 
})
module.exports =mongoose.model('spotsale',Productschema,'spotsale');