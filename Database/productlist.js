const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
   category:String,
   packsize:Number,
   mrp:Number,
   purprice:Number,
   discount:Number,
   companyname:String,
   dealername:String


})
module.exports =mongoose.model('productlist',Productschema,'productlist');