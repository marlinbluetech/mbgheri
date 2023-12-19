const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
    mobile:Number,
   address:String,
   comment:String
})
module.exports =mongoose.model('company',Productschema,'company');