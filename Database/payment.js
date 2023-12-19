const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
  date:String,
  category:String,
  employeename:String,
  amount:Number,
  description:String


})
module.exports =mongoose.model('payment',Productschema,'payment');