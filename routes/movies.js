const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const moviesValidator = require('../validators/moviesValidator');

//lectura r 
router.get('/',moviesController.all)
router.get('/list',moviesController.list)
router.get('/detail/:id',moviesController.detail);
router.get('/new',moviesController.new);
router.get('/recommended',moviesController.recommended);
router.post('/search',moviesController.search);

//crear c
router.get('/create',moviesController.create);
router.post('/create',moviesValidator, moviesController.save);

//update 
router.get('/edit/:id',moviesController.edit)
router.post('/edit/:id',moviesController.processEdit)

//delete
router.post('/delete/:id',moviesController.delete)

module.exports = router