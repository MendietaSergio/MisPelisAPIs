const express = require('express');
const router = express.Router();

const apiMoviesController = require('../controllers/apiController');

//MUESTRO TODAS LAS PELICUAS.
router.get('/',apiMoviesController.all);
//MUESTRO EL DETALLE DE CADA PELICULA.
router.get('/detail/:id', apiMoviesController.detail);

//CREO UNA PELICULA.
router.get('/create',apiMoviesController.create);
router.post('/create',apiMoviesValidator, moviesController.save);

//ACTUALIZO LA PELICULA 
router.get('/edit/:id',apiMoviesController.edit)
router.post('/edit/:id',apiMoviesController.processEdit)

//ELIMINO LA PELICULA.
router.post('/delete/:id',apiMoviesController.delete)