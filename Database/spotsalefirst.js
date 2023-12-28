const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    date:String,
    customer:String,
    mobile:String,

  
 
})
module.exports =mongoose.model('spotsalefirst',Productschema,'spotsalefirst');