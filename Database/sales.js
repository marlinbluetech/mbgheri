const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    date:String,
    customer:String,
    season:String,

    selectedOption: {
        type: String,
      
      },
     
    quantity: {
        type: Number,
      
      },
      paid: {
        type: Number,
    
      },
})
module.exports =mongoose.model('sales',Productschema,'sales');