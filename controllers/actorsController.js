const db = require('../database/models')


module.exports = {
    list : function(req,res){
        db.Actores.findAll({
            include : [
                {
                    association : 'peliculas'
                },
                {
                    association : 'favorita'
                }
            ]
        })
        .then(actores => {
            res.send(actores)
        })
    }
}