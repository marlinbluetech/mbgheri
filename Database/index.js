const express = require('express');
const mongoose = require('mongoose');
require('./config');
const bcrypt = require('bcrypt');
const product = require('./product');
const productlist = require('./productlist');
const company = require('./company');
const payment = require('./payment');
const transaction = require('./transaction');
const creditpending = require('./creditpending');
const returnlist = require('./returnlist');
const purchase = require('./purchase');
const gheriexpenditure = require('./gheriexpenditure');
const catchs = require('./catchs');
const spotsale=require('./spotsale');
const stock=require('./stock');
const signuser=require('./signuser');
const { ObjectId } = require('mongodb');
const paymenthistory=require('./paymenthistory');
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtkey = 'marlintech';
const app = express();
const cors = require('cors');
const employee = require('./employee');
const sales = require('./sales');
const spotsalesecond = require('./spotsalesecond');
const extradiscount=require('./extradiscount');

app.use(express.json());
app.use(cors());

app.post("/adduser",  verifytoken, async (req, resp) => {
    let data = new product(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addcatch", verifytoken,  async (req, resp) => {
    let data = new catchs(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addstock", verifytoken,  async (req, resp) => {
    let data = new stock(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addcompany", verifytoken,  async (req, resp) => {
    let data = new company(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addemployee",verifytoken,   async (req, resp) => {
    let data = new employee(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});

app.post("/addproduct",verifytoken,  async (req, resp) => {
    let data = new productlist(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addpayment",verifytoken,  async (req, resp) => {
    let data = new payment(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addtransaction",  async (req, resp) => {
    let data = new transaction(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addcreditpending",  async (req, resp) => {
    let data = new creditpending(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addreturnlist",  async (req, resp) => {
    let data = new returnlist(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addpurchase",  async (req, resp) => {
    let data = new purchase(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addgheriexpenditure",  async (req, resp) => {
    let data = new gheriexpenditure(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.get("/userget",  async (req, resp) => {

    let result = await product.find();
    console.log(result);
    resp.send(result);

});
app.get("/stockget",  async (req, resp) => {

    let result = await stock.find();
    console.log(result);
    resp.send(result);

});
app.get("/catchget",  async (req, resp) => {

    let result = await catchs.find();
    console.log(result);
    resp.send(result);

});
app.delete("/catchdelete/:_id",  async (req, resp) => {

    let data = await catchs.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.delete("/userdelete/:_id",  async (req, resp) => {

    let data = await product.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/companyget",  async (req, resp) => {

    let result = await company.find();
    console.log(result);
    resp.send(result);

});
app.delete("/companydelete/:_id",  async (req, resp) => {

    let data = await company.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/employeeget",  async (req, resp) => {

    let result = await employee.find();
    console.log(result);
    resp.send(result);

});
app.delete("/employeedelete/:_id",  async (req, resp) => {

    let data = await employee.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/productlistget",  async (req, resp) => {

    let result = await productlist.find();
    console.log(result);
    resp.send(result);

});
app.delete("/productlistdelete/:_id",  async (req, resp) => {

    let data = await productlist.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/paymentget",  async (req, resp) => {

    let result = await payment.find();
    console.log(result);
    resp.send(result);

});
app.delete("/paymentdelete/:_id",  async (req, resp) => {

    let data = await payment.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/transactionget",  async (req, resp) => {

    let result = await transaction.find();
    console.log(result);
    resp.send(result);

});
app.delete("/transactiondelete/:_id",  async (req, resp) => {

    let data = await transaction.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/creditpendingget",  async (req, resp) => {

    let result = await creditpending.find();
    console.log(result);
    resp.send(result);

});
app.delete("/creditpendingdelete/:_id",  async (req, resp) => {

    let data = await creditpending.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/returnlistget",  async (req, resp) => {

    let result = await returnlist.find();
    console.log(result);
    resp.send(result);

});
app.delete("/returnlistdelete/:_id",  async (req, resp) => {

    let data = await returnlist.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/purchaseget",  async (req, resp) => {

    let result = await purchase.find();
    console.log(result);
    resp.send(result);

});
app.delete("/purchasedelete/:_id",  async (req, resp) => {

    let data = await purchase.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/gheriexpenditureget",  async (req, resp) => {

    let result = await gheriexpenditure.find();
    console.log(result);
    resp.send(result);

});
app.delete("/gheriexpendituredelete/:_id",  async (req, resp) => {

    let data = await gheriexpenditure.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});
app.get("/gheriexpenditureupdateget/:_id",  async (req, resp) => {
    try {
        const data = await gheriexpenditure.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});

app.put("/gheriexpenditureupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await gheriexpenditure.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/productlistupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await productlist.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/productlistupdateget/:_id",  async (req, resp) => {
    try {
        const data = await productlist.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});

app.put("/purchaseupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await purchase.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/purchaseupdateget/:_id",  async (req, resp) => {
    try {
        const data = await purchase.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/companyupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await company.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/companyupdateget/:_id",  async (req, resp) => {
    try {
        const data = await company.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/customer/:name",  async (req, resp) => {
    try {
        const data = await product.findOne({ name: req.params.name });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/returnlistupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await returnlist.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/returnlistupdateget/:_id",  async (req, resp) => {
    try {
        const data = await returnlist.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/employeeupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await employee.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/employeeupdateget/:_id",  async (req, resp) => {
    try {
        const data = await  employee.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/creditpendingupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await creditpending.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/creditpendingupdateget/:_id",  async (req, resp) => {
    try {
        const data = await creditpending.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/paymentupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await payment.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/paymentupdateget/:_id",  async (req, resp) => {
    try {
        const data = await payment.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/transactionupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await transaction.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/transactionupdateget/:_id",  async (req, resp) => {
    try {
        const data = await transaction.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/customerupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await product.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/customerupdateget/:_id",  async (req, resp) => {
    try {
        const data = await product.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get("/customer/:name",  async (req, resp) => {
    try {
        const data = await product.findOne({ name: req.params.name });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});


app.post('/spotsale', async (req, res) => {
    try {
      const {billno,date,customer,balance,paiditem} = req.body;
  
      const result = new spotsale({
        billno,
        date,
        customer,
      balance,
      paiditem
      });
  
      await result.save();
  
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.post('/spotsalesecond', async (req, res) => {
    try {
      const {billno,date,customer,mobile, selectedOption,mrp, quantity, discount,balance} = req.body;
  
      const result = new spotsalesecond({
        billno,
       date,
       customer,
       mobile,
        selectedOption,
        mrp,
        quantity,
        discount,
     balance
      });
  
      await result.save();
  
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
//   app.get("/spotsaleget",  async (req, resp) => {

//     let result = await spotsalefirst.find();
//     console.log(result);
//     resp.send(result);

// });
app.get("/spotsalesecondget",  async (req, resp) => {

    let result = await spotsalesecond.find();
    console.log(result);
    resp.send(result);

});
app.get("/spotsalefind/:name",  async (req, resp) => {
    try {
        const data = await spotsale.findOne({ customer: req.params.name });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.post('/saleadd', async (req, res) => {
    try {
      const { billno,date,customer,season, selectedOption, quantity,paiditem} = req.body;
  
      const result = new sales({
        billno,
        date,
        customer,
       season,
        selectedOption,
      
        quantity,
      paiditem
      });
  
      await result.save();
  
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get("/saleget",  async (req, resp) => {

    let result = await sales.find();
    console.log(result);
    resp.send(result);

});
app.delete("/saledelete/:_id",  async (req, resp) => {

    let data = await sales.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});


app.get("/searchspotsale/:key", async (req, resp) => {
    let result = await spotsalesecond.find({
        "$or": [
            { date: { $regex: req.params.key } },
            {customer: { $regex: req.params.key } },
            {selectedOption: { $regex: req.params.key } },
            {mobile: { $regex: req.params.key } },
            {customer: { $regex: req.params.key } },
            
        ]
    });
    resp.send(result);
});
app.get("/catchupdateget/:_id",  async (req, resp) => {
    try {
        const data = await catchs.findOne({ _id: req.params._id });

        if (data) {
            resp.send(data);
        } else {
            resp.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.put("/catchupdate/:_id", async (req, resp) => {
    try {
        const idString = req.params._id;

        
        if (!ObjectId.isValid(idString)) {
            return resp.status(400).send({ message: 'Invalid ObjectId' });
        }

        const objectId = new ObjectId(idString);

        const data = await catchs.updateOne(
            { _id: objectId },
            {
                $set: req.body
            }
        );

        resp.send(data);
    } catch (error) {
        console.error('Error updating product:', error);
        resp.status(500).send({ message: 'Internal server error' });
    }
});
app.get('/customer/:customerId', async (req, res) => {
    try {
      const customerId = mongoose.Types.ObjectId(req.params.customerId);
  
      
      const customer = await product.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      
      const products = await returnlist.find({ customerId });
  
      res.json({ customer, products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/return/:userId', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
  
      const customer = await product.findById(userId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
     
      const returnDetails = await returnlist.find({ customer: customer.name });
  
      res.json({ customer, returnDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get('/catch/:userId', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
  
      const customer = await product.findById(userId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
     
      const catchDetails = await catchs.find({ customer: customer.name });
  
      res.json({ customer, catchDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get('/gheriexpenditure/:userId', async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
  
      const customer = await product.findById(userId);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
     
      const gheridetails = await gheriexpenditure.find({ name: customer.name });
  
      res.json({ customer, gheridetails});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.get("/saleget",  async (req, resp) => {

    let result = await salefirst.find();
    console.log(result);
    resp.send(result);

});


app.post("/create", async (req, resp) => {
    let {name,mobile,email,password} = new signuser(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const users = new signuser({
        name:name,
        email:email,
        mobile: mobile,
        password: hashedPassword,
      });
      let user = await users.save();
    console.log(user);
    jwt.sign({ user }, jwtkey, { expiresIn: "8h" }, (err,token) => {
        if(err){
            resp.send("not found");
        }else{
            resp.send({user,auth:token});
        }

    })

});
app.post('/login', async (req, res) => {
    try {
      const { mobile, password } = req.body;
 
      const user = await signuser.findOne({ mobile });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
      }
  
    
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
      }
  
     
      const token = jwt.sign({ user }, jwtkey, { expiresIn: '8h' });
  
      res.send({user,auth:token});
    } catch (error) {
     
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  app.post("/forgot-password", async (req, res) => {
    try {
      const { mobile, newPassword, confirmPassword } = req.body;
  
      if (!mobile || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Invalid input. Please provide mobile, newPassword, and confirmPassword." });
      }
  
      const mobileNumber = parseInt(mobile, 10);
  
      if (isNaN(mobileNumber) || !Number.isInteger(mobileNumber)) {
        console.error('Invalid mobile number:', mobile);
        return res.status(400).json({ success: false, message: 'Invalid mobile number.' });
      }
  
      const user = await signuser.findOne({ mobile: mobileNumber });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
    
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      jwt.sign({ user }, jwtkey, { expiresIn: "8h" }, (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err);
          return res.status(500).json({ success: false, message: "Internal server error." });
        }
        res.status(200).json({ success: true, auth: token });
      });
    } catch (error) {
      console.error('Error processing forgot password:', error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });
function verifytoken(req,resp,next){
   
    let token=req.headers['authorization'];
    if(token){
      token=token.split(' ')[1];  
      jwt.verify(token,jwtkey,(err,valid)=>{
        if(err){
            resp.send("error");
        }else{
            next();
        }
      })
    }else{
        resp.send("add token");
    }
    console.warn("middleware called",token);
    
}
app.post("/adddiscount",  async (req, resp) => {
    let data = new extradiscount(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.get("/extradiscountget",  async (req, resp) => {

    let result = await extradiscount.find();
    console.log(result);
    resp.send(result);

});
app.post("/adddpaymenthistory",  async (req, resp) => {
    let data = new paymenthistory(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.get("/paymenthistoryget",  async (req, resp) => {

    let result = await paymenthistory.find();
    console.log(result);
    resp.send(result);

});
app.delete("/stock/:_id",  async (req, resp) => {

    let data = await stock.deleteOne({ _id: req.params._id });

    if (data.deletedCount === 1) {
        resp.send({ message: 'Product deleted successfully' });
    } else {
        resp.status(404).send({ message: 'Product not found' });
    }

});

app.get("/stocksearch/:key", async (req, resp) => {
    let result = await stock.find({
        "$or": [
            
            {itemname: { $regex: req.params.key } }
           
        ]
    });
    resp.send(result);
});
app.get("/billget",  async (req, resp) => {

    let result = await spotsale.find();
    console.log(result);
    resp.send(result);

});
app.get("/billsearch/:key", async (req, resp) => {
    let result = await spotsale.find({
        "$or": [
            
            {customer: { $regex: req.params.key } }
           
        ]
    });
    resp.send(result);
});
app.listen(5500);