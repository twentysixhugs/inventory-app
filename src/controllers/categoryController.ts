import Item, { IItem } from '../models/item';
import Category, { ICategory } from '../models/category';

import async from 'async';
import { body, validationResult } from 'express-validator';

import { ControllerFn, ResponseError } from 'src/types';

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
  res.render('newCategory');
};

/* Handle POST with form data for creating a new category */
const categoryCreatePOST = (() => {
  const mainRequestHandler: ControllerFn = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      const err: ResponseError = new Error('403: Validation error');
      err.status = 403;
      throw err;
    }

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    category.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(category.url || '/catalog/category/all');
    });
  };

  return [
    body('name', 'Name must not be empty')
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body('description', 'Description must not be empty')
      .trim()
      .escape()
      .isLength({ min: 1 }),
    mainRequestHandler,
  ];
})();

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
  categoryDeletePOST,
  categoryUpdateGET,
  categoryUpdatePOST,
};
