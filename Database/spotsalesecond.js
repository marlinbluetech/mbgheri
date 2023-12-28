const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
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

 
})
module.exports =mongoose.model('spotsalesecond',Productschema,'spotsalesecond');