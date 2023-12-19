const express = require('express');
require('./config');
const product = require('./product');
const productlist = require('./productlist');
const company = require('./company');
const payment = require('./payment');
const transaction = require('./transaction');
const creditpending = require('./creditpending');
const returnlist = require('./returnlist');
const purchase = require('./purchase');
const gheriexpenditure = require('./gheriexpenditure');

const app = express();
const cors = require('cors');
const employee = require('./employee');
app.use(express.json());

app.use(cors());
app.post("/adduser",  async (req, resp) => {
    let data = new product(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addcompany",  async (req, resp) => {
    let data = new company(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addemployee",  async (req, resp) => {
    let data = new employee(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addproduct",  async (req, resp) => {
    let data = new productlist(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

});
app.post("/addpayment",  async (req, resp) => {
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
        const data = await gheriexpenditure.updateOne(
            { _id: req.params._id },
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


app.listen(5000);