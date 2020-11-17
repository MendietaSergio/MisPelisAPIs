const express = require('express');
const router = express.Router();

const apiActorsController = require('../controllers/apiController');

//MUESTRO TODOS LOS ACTORES.
router.get('/all',apiActorsController.all);
//MUESTRO EL DETALLE DE CADA PELICULA.
router.get('/detail/:id', apiActorsController.detail);

//INGRESO UN ACTOR A LA BASE DE DATOS.
router.get('/create',apiActorsController.create);
router.post('/create',apiActorsController.save);

//ACTUALIZO AL ACTOR
router.get('/edit/:id',apiActorsController.edit)
router.post('/edit/:id',apiActorsController.processEdit)

//ELIMINO AL ACTOR.
router.post('/delete/:id',apiActorsController.delete)