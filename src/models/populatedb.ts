/// Run: ts-node *path_to_file* *mongodburl*

import Category, { ICategory } from './category';
import Item, { IItem } from './item';

import { AsyncFunctionCallback } from 'src/types';

import async from 'async';
import mongoose from 'mongoose';

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories: mongoose.Document<unknown, any, ICategory>[] = [];
const items: mongoose.Document<unknown, any, IItem>[] = [];

function categoryCreate(
  categoryData: ICategory,
  cb: AsyncFunctionCallback,
) {
  const category = new Category(categoryData);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(itemData: IItem, cb: AsyncFunctionCallback) {
  const item = new Item(itemData);

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New item: ${item}`);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(
  outerAsyncOperationCallback: AsyncFunctionCallback,
) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          {
            name: 'Not denounced food',
            description: "It won't harm you!",
          },
          callback,
        );
      },
      function (callback) {
        categoryCreate(
          {
            name: 'Hardware',
            description: 'Various things related to computer parts',
          },
          callback,
        );
      },
      function (callback) {
        categoryCreate(
          {
            name: 'Clothes',
            description: 'Definitely nice ones',
          },
          callback,
        );
      },
    ],
    outerAsyncOperationCallback,
  );
}

function createItems(outerAsyncOperationCallback: AsyncFunctionCallback) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          {
            name: 'Dark chocolate',
            description: 'Made up of pure cocoa',
            price: 26,
            category: categories[0],
            numberInStock: 226,
          },
          callback,
        );
      },
      function (callback) {
        itemCreate(
          {
            name: 'Nuts',
            description: 'DHA+EPA',
            price: 23,
            category: categories[0],
            numberInStock: 23123,
          },
          callback,
        );
      },
      function (callback) {
        itemCreate(
          {
            name: 'Apples',
            description: 'Your brain runs on glucose!',
            price: 46,
            category: categories[0],
            numberInStock: 133,
          },
          callback,
        );
      },
      function (callback) {
        itemCreate(
          {
            name: 'Cucumber',
            description: "Cool name, isn't it?",
            price: 64,
            category: categories[0],
            numberInStock: 624,
          },
          callback,
        );
      },
    ],
    outerAsyncOperationCallback,
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
