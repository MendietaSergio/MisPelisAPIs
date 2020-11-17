
let {check,body} = require('express-validator');
var moment = require('moment'); // require

module.exports = [
    check('title')
    .isLength({
        min:1
    })
    .withMessage('Debes ingresar el título de la película'),

    check('rating')
    .isDecimal({
        min:0
    })
    .withMessage('Debes indicar el ranting logrado'),

    check('length')
    .isLength({
        min:1
    })
    .withMessage('Debes indicar la duación en minutos'),

    check('awards')
    .isInt({
        min:0
    })
    .withMessage('Debes ingresar los premios que recibió'),

    check('release_date')
    .isLength({
        min:1
    })
    .withMessage('Debes ingresar la fecha de estreno'),

    body('release_date')
    .custom(value => {
        let fechaActual = moment()
        if(moment(value) > fechaActual){
            console.log('fecha invalida')
            return false
        }else{
            console.log('todo bien!')
            return true
        }
    })
    .withMessage('La fecha es inválida')
]


