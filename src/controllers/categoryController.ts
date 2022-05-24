import Item, { IItem } from '../models/item';
import Category, { ICategory } from '../models/category';

import async from 'async';

import { ControllerFn } from 'src/types';

/* Show all categories */
const allCategories: ControllerFn = (req, res, next) => {
  Category.find({}).exec((err, foundCategories) => {
    if (err) {
      return next(err);
    }

    res.render('allCategories', {
      title: 'All categories',
      allCategories: foundCategories,
    });
  });
};

/* Show all items belonging to the category */
const categoryItems: ControllerFn = (req, res, next) => {
  async.parallel(
    {
      categoryItems: (callback) => {
        Item.find({ category: req.params.id }).exec(callback);
      },
      category: (callback) => {
        Category.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      if ('category' in results)
        res.render('categoryItemsList', {
          title: 'Category: ',
          categoryItems: results.categoryItems,
          category: results.category,
        });
    },
  );
};

/* Forms GET and POST*/

/* Get form for creating a new category */
const categoryCreateGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryCreateGET');
};

/* Handle POST with form data for creating a new category */
const categoryCreatePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryCreatePOST');
};

const categoryDeleteGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryDeleteGET');
};

const categoryDeletePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryDeletePOST');
};

const categoryUpdateGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryUpdateGET');
};

const categoryUpdatePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryUpdatePOST');
};

export {
  allCategories,
  categoryItems,
  categoryCreateGET,
  categoryCreatePOST,
  categoryDeleteGET,
  categoryDeletePOST,
  categoryUpdateGET,
  categoryUpdatePOST,
};
