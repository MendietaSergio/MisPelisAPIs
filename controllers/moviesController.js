
const db = require('../database/models');
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');
let Op = Sequelize.Op;
const moment = require('moment')


module.exports = {
    list : function(req,res){
        db.Peliculas.findAll({
            include : [
                {
                    association : 'genero'
                },
                {
                    association : 'actores'
                }
            ]
        })
        .then( peliculas => {
            res.send(peliculas)
        })
    },
    all : function(req,res){
        db.Peliculas.findAll()
        .then( peliculas => {
            res.render('movies',{
                peliculas : peliculas
            })
        })
    },
    detail : function(req,res){
        db.Peliculas.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'genero'
                },
                {
                    association : 'actores'
                }
            ]
        })
        .then( pelicula => {
            res.render('moviesDetail',{
                pelicula : pelicula,
                genero : pelicula.genero,
                actores : pelicula.actores
            })
        })
    },
    new : function(req,res){
        db.Peliculas.findAll({
            limit : 5,
            order : [
                ['release_date','DESC']
            ]
        })
        .then( peliculas => {
            res.render('moviesNew',{
                peliculas : peliculas
            })
        })
    },
    recommended : function(req,res){
        db.Peliculas.findAll({
            where : {
                awards : {
                    [Op.gte] : 8
                }
            }
        })
        .then( peliculas => {
            res.render('moviesRecommended',{
                peliculas : peliculas
            })
        })
    },
    search : function(req,res){
        db.Peliculas.findAll({
            where : {
                title : {
                    [Op.substring] : req.body.search
                }
            }
        })
        .then( peliculas => {
            res.render('movies',{
                peliculas : peliculas
            })
        })
    },

    create : function(req,res){
        let generos = db.Generos.findAll({
            order : [
                ['name','ASC']
            ]
        });
        let actores = db.Actores.findAll({
            order : [
                ['first_name','ASC']
            ]
        });
        Promise.all([generos,actores])
        .then(([generos,actores]) => {
            res.render('moviesAdd',{
                generos : generos,
                actores : actores
            })
        })
    },
    save : function(req,res){
        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            db.Peliculas.create({
                title : req.body.title,
                rating : req.body.rating,
                awards : req.body.awards,
                release_date : req.body.release_date,
                length : req.body.length,
                genre_id : req.body.genre
            })
            .then ( newPeli => {
                if( typeof req.body.actores == 'string'){// un solo actor
                    db.actor_movie.create({
                        movie_id : newPeli.id,
                        actor_id : req.body.actores.id
                    })
                    .then(()=>{
                        return res.redirect('/movies')
                    })
                }else{
                    req.body.actores.forEach( id =>{
                        db.actor_movie.create({
                            movie_id : newPeli.id,
                            actor_id : id
                        })
                        .then(()=>{
                            return res.redirect('/movies')
                        })
                    })
                }
            })
            .catch(error => {
                res.send(error)
            })

            
        }else{
            let generos = db.Generos.findAll({
                order : [
                    ['name','ASC']
                ]
            });
            let actores = db.Actores.findAll({
                order : [
                    ['first_name','ASC']
                ]
            });
            Promise.all([generos,actores])
            .then(([generos,actores]) => {
                res.render('moviesAdd',{
                    generos : generos,
                    actores : actores,
                    old : req.body,
                    errors : errors.mapped()
                })
            })
        }
    },
    edit : function(req,res){
        let pelicula = db.Peliculas.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'genero'
                },
                {
                    association : 'actores'
                }
            ]
        });
        let generos = db.Generos.findAll({
            order : [
                ['name','ASC']
            ]
        });
        let actores = db.Actores.findAll({
            order : [
                ['first_name','ASC']
            ]
        });
        Promise.all([pelicula,generos,actores])
        .then(([pelicula,generos,actores]) => {
            res.render('moviesEdit',{
                actores : actores,
                generos : generos,
                pelicula : pelicula,
                estreno : moment(pelicula.release_date).format('YYYY-MM-DD')
            })
        })
    },
    processEdit:function(req, res, next){
        db.Peliculas.update({
                title : req.body.title,
                rating : req.body.rating,
                awards : req.body.awards,
                release_date : req.body.release_date,
                length : req.body.length,
                genre_id : req.body.genre
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(function(result) {
            
            db.actor_movie.destroy({
                where: {
                    movie_id: req.params.id
                }
            })
            .then(result=>{
                if( typeof req.body.actores == 'string'){// un solo actor
                    db.actor_movie.create({
                        movie_id : req.params.id,
                        actor_id : req.body.actors.id
                    })
                    .then(()=>{
                        return res.redirect('/movies')
                    })
                }else{
                    req.body.actors.forEach( id =>{
                        db.actor_movie.create({
                            movie_id : req.params.id,
                            actor_id : id
                        })
                        .then(()=>{
                            return res.redirect('/movies')
                        })
                    })
                }
            })
           
        })
    },
    
    delete:function(req, res){

        let actor_movie = db.actor_movie.destroy({
            where: {
                movie_id: req.params.id
            }
        })
        let favorite_movie = db.Actores.update({
                favorite_movie_id : null
            },
            {
            where:{
                favorite_movie_id : req.params.id
            }        
        })
        Promise.all([actor_movie,favorite_movie])
        .then(result=>{
            db.Peliculas.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result=>{
                res.redirect('/movies')
            })
            
        })
        .catch(err=>{
            res.send(err)
        })
            

    },
}