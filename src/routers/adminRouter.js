const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const productsRouter = require('./productsRouter');

const adminRouter = express.Router();

adminRouter.route('/').post((req, res) => {
  const { name, descreption , image} = req.body;
  const url =
  'mongodb+srv://admin:admin@cluster0.skns22l.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'myshop';

  (async function addproduct() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const product = { name, descreption , image};
      const results = await db.collection('products').insertOne(product);
      await res.render('products');
      
       
     

 
    } catch (error) {
      debug(error);
    }
    client.close();
    
  })(res.render('products'));
});


  
  adminRouter.route('/').get((req, res) => {
    res.render('admin');
  });

module.exports = adminRouter;
