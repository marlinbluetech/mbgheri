const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
  slno:String,
    date:String,
    
    season:String,
    amount:Number,
    cashflow:String,
    remark:String
   
})
module.exports =mongoose.model('paymenthistory',Productschema,'paymenthistory');