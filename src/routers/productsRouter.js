const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');



const productsRouter = express.Router();
productsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/signIn');
  }
});
productsRouter.route('/').get((req, res) => {
  const url =
  'mongodb+srv://admin:admin@cluster0.skns22l.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'myshop';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);

      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
  'mongodb+srv://admin:admin@cluster0.skns22l.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'myshop';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectID(id) });

      
    await  res.render('product', {
        product
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
