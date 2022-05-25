import Item, { IItem } from '../models/item';
import Category, { ICategory } from '../models/category';

import async from 'async';

import {
  AsyncFunctionCallback,
  ControllerFn,
  ResponseError,
} from 'src/types';
import { body, validationResult } from 'express-validator';
import { sendValidationError } from './utils';

const validateCategory: ControllerFn = (req, res, next) => {
  Category.findOne({ _id: req.body.category }).exec((err, result) => {
    if (err) {
      next(err);
    }

    if (!result) {
      sendValidationError(next);
    }

    next();
  });
};

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

/* GET form for creating a new item */
const itemCreateGET: ControllerFn = (req, res, next) => {
  Category.find({}, ['name']).exec((err, foundCategories) => {
    if (err) {
      next(err);
    }

    if (foundCategories.length === 0) {
      res.render('categoryForm', {
        redirectFromItemForm: true,
      });
    }

    res.render('itemForm', {
      preselectedCategory: req.query.category,
      categories: foundCategories,
    });
  });
};

/* Handle POST with form data for creating a new item */
const itemCreatePOST = (() => {
  const mainRequestHandler: ControllerFn = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      sendValidationError(next);
    }

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      category: req.body.category,
    });

    item.save((err, savedItem) => {
      if (err) {
        next(err);
      }

      if (!res.headersSent) {
        res.redirect(savedItem?.url || '/catalog/item/all');
      }
    });
  };

  return [
    validateCategory,
    body('name').trim().isLength({ min: 1 }).escape(),
    body('description').trim().isLength({ min: 1 }).escape(),
    body('price').trim().isNumeric().escape(),
    body('numberInStock').trim().isNumeric().escape(),
    mainRequestHandler,
  ];
})();

const itemDeletePOST: ControllerFn = (req, res, next) => {
  Item.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      next(err);
    }

    if (!res.headersSent) {
      res.redirect('/catalog/all');
    }
  });
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
