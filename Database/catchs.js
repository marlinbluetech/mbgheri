const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
   date:String,
   customer:String,
   season:String,
   quantity:String,
   count:Number,
   pillingcount:Number,
   dcqty:Number,
   extraqty:Number,
   marketprice:Number,
   partyprice:Number,
   partyname:String,
   partypaid:String

})
module.exports =mongoose.model('catch',Productschema,'catch');