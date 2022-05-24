import Item, { IItem } from 'src/models/item';
import Category, { ICategory } from 'src/models/category';

import async from 'async';

import { ControllerFn } from 'src/types';

/* Show all categories */
const allCategories: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryList');
};

/* Show all items belonging to the category */
const categoryItems: ControllerFn = (req, res, next) => {
  res.send('Not implemented: categoryItems');
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
