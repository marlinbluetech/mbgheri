const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
  slno:String,
    category:String,
    company:String,
    season:String,
    discount:String
})
module.exports =mongoose.model('extradiscount',Productschema,'extradiscount');