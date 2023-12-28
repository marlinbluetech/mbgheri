const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    itemname:String,
    
   price:String,
      
   company:String
})
module.exports =mongoose.model('stock',Productschema,'stock');