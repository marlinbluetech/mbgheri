const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
  billno:String,
    date:String,
    customer:String,
    season:String,

    selectedOption: {
        type: String,
      
      },
     
    quantity: {
        type: Number,
      
      },
      paiditem: {
        type: Number,
    
      },
})
module.exports =mongoose.model('sales',Productschema,'sales');