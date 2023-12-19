const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
   date:String,
   name:String,
   season:String,
   amount:Number,
   purpose:String
})
module.exports =mongoose.model('gheriexpenditure',Productschema,'gheriexpenditure');