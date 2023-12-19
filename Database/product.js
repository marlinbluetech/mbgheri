const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
    mobile:Number,
   address:String
})
module.exports =mongoose.model('customer',Productschema,'customer');