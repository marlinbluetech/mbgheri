const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
    doj:String,
    designation:String,
    salary:Number,
    mobile:Number,
    worklocation:String,
   address:String
})
module.exports =mongoose.model('employee',Productschema,'employee');