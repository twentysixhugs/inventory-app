import Item, { IItem } from 'src/models/item';
import Category, { ICategory } from 'src/models/category';

import async from 'async';

import { ControllerFn } from 'src/types';

/* Show all items */

const allItems: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemList');
};

/* Show item details */

const itemDetails: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemDetails');
};

/* Forms GET and POST */

/* Get form for creating a new item */
const itemCreateGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemCreateGET');
};

/* Handle POST with form data for creating a new item */
const itemCreatePOST: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemCreatePOST');
};

const itemDeleteGET: ControllerFn = (req, res, next) => {
  res.send('Not implemented: itemDeleteGET');
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
  itemDeleteGET,
  itemDeletePOST,
  itemUpdateGET,
  itemUpdatePOST,
};
