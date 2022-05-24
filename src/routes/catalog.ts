import express from 'express';
import * as categoryController from '../controllers/categoryController';
import * as itemController from '../controllers/itemController';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/all');
});

router.get('/all', itemController.allItems);

router.get('/item/create', itemController.itemCreateGET);
router.post('/item/create', itemController.itemCreatePOST);

router.get('/item/:id/delete', itemController.itemDeleteGET);
router.post('/item/:id/delete', itemController.itemDeletePOST);

router.get('/item/:id/update', itemController.itemUpdateGET);
router.post('/item/:id/update', itemController.itemUpdatePOST);

router.get('/item/:id', itemController.itemDetails);
