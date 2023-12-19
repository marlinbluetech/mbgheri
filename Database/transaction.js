const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    date:String,
    cashflow:String,
   amount:Number,
   purpose:String,
   type:String,
   description:String
})
module.exports =mongoose.model('transaction',Productschema,'transaction');