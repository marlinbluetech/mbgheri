const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    name:String,
    type:String,
    amount:Number,
 
})
module.exports =mongoose.model('creditpending',Productschema,'creditpending');