const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    date:String,
    itemname:String,
   company:String,
   quantity:Number,
   price:Number,
   category:String,
   paid:Number

})
module.exports =mongoose.model('purchase',Productschema,'purchase');