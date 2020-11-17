module.exports = (sequelize, dataTypes) => {

    let alias = "Actores"

    let cols = {

        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            defaultValue : null
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue : null
        },
        
    }

    let config = {
        tableName : "actors",
        timestamps : true,
        underscored : true
    }

    const Actor = sequelize.define(alias,cols,config);

    Actor.associate = function(models){
        
        Actor.belongsToMany(models.Peliculas,{
            as : 'peliculas', 
            through : 'actor_movie',
            foreignKey : 'actor_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'movie_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        });

        //  Actor.hasOne(models.Peliculas,{
        //      as : 'favorita',
        //      foreignKey : 'favorite_movie_id'
        //})

    }

    return Actor

}