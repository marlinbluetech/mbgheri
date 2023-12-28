const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
    mobile:Number,
   email:String,
   password:String
})
module.exports =mongoose.model('signuser',Productschema,'signuser');