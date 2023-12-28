const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({

   date:String,
   customer:String,
   season:String,
   item:String,
   quantity:Number

})
module.exports =mongoose.model('returnlist',Productschema,'returnlist');