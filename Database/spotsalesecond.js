const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    billno:String,
    date:String,

    customer:String,
    mobile:String,

    selectedOption: {
        type: String,
      
      },
      mrp: {
        type: Number,
       
      },
    quantity: {
        type: Number,
      
      },
      discount: {
        type: Number,
    
      },
      balance:Number

 
})
module.exports =mongoose.model('spotsalesecond',Productschema,'spotsalesecond');