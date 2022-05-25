import Item, { IItem } from '../models/item';
import Category, { ICategory } from '../models/category';

import { sendValidationError } from './utils';

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
  res.render('categoryForm');
};

/* Handle POST with form data for creating a new category */
const categoryCreatePOST = (() => {
  const mainRequestHandler: ControllerFn = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      sendValidationError(next);
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
    body('name').trim().isLength({ min: 1 }).escape(),
    body('description').trim().escape().isLength({ min: 1 }),
    mainRequestHandler,
  ];
})();

const categoryDeletePOST: ControllerFn = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      next(err);
    }

    res.redirect('/catalog/category/all');
  });
};

const categoryUpdateGET: ControllerFn = (req, res, next) => {
  Category.findById(req.params.id).exec((err, foundCategory) => {
    if (err) {
      return next(err);
    }

    res.render('categoryForm', {
      name: foundCategory?.name,
      description: foundCategory?.description,
    });
  });
};

const categoryUpdatePOST = (() => {
  const mainRequestHandler: ControllerFn = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      sendValidationError(next);
    }

    const updatedCategory = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    Category.findByIdAndUpdate(req.params.id, updatedCategory).exec(
      (err, foundCategory) => {
        if (err) {
          next(err);
        }

        res.redirect(foundCategory?.url || '/catalog/category/all');
      },
    );
  };

  return [
    body('name').trim().isLength({ min: 1 }).escape(),
    body('description').trim().escape().isLength({ min: 1 }),
    mainRequestHandler,
  ];
})();

export {
  allCategories,
  categoryItems,
  categoryCreateGET,
  categoryCreatePOST,
  categoryDeletePOST,
  categoryUpdateGET,
  categoryUpdatePOST,
};
