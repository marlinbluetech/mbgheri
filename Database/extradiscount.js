const mongoose=require('mongoose');
const Productschema=new mongoose.Schema({
    category:String,
    company:String,
    season:String,
    discount:String
})
module.exports =mongoose.model('extradiscount',Productschema,'extradiscount');