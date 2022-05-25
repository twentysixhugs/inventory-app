import Item, { IItem } from '../models/item';
import Category, { ICategory } from '../models/category';

import async from 'async';

import { ControllerFn, ResponseError } from 'src/types';

/* Show all items */

const allItems: ControllerFn = (req, res, next) => {
  Item.find({}).exec((err, foundItems) => {
    if (err) {
      return next(err);
    }

    res.render('allItems', { title: 'All items', allItems: foundItems });
  });
};

/* Show item details */

const itemDetails: ControllerFn = (req, res, next) => {
  Item.findOne({ _id: req.params.id }).exec((err, foundItem) => {
    if (err) {
      return next(err);
    }

    if (!foundItem) {
      let error: ResponseError = new Error('Item not found');

      error.status = 404;

      return next(error);
    }

    console.log(foundItem);

    res.render('itemDetails', {
      title: (foundItem as unknown as IItem).name,
      item: foundItem,
    });
  });
};

/* Forms GET and POST */

/* Get form for creating a new item */
const itemCreateGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemCreateGET');
  // Check for req.query. It may contain a category to pre-populate
};

/* Handle POST with form data for creating a new item */
const itemCreatePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemCreatePOST');
};

const itemDeletePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemDeletePOST');
};

const itemUpdateGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemUpdateGET');
};

const itemUpdatePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemUpdatePOST');
};

export {
  allItems,
  itemDetails,
  itemCreateGET,
  itemCreatePOST,
  itemDeletePOST,
  itemUpdateGET,
  itemUpdatePOST,
};
