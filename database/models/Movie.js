module.exports = (sequelize, dataTypes) => {
    //alias para poder usar este modelo en el controlador o donde lo necesitemos.
    let alias = "Peliculas"
    //como están constituidas nuestras tablas. La idea es crear un objeto literal donde cada una de las propiedades
    //represente a la columna de la tabla que vamos a describir. Como valor, tendrá el detalle de tipo de valor 
    //y restricciones
    let cols = {
        
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false,
            defaultValue : 0
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue : null
        }
    }

    let config = {
        tableName : "movies",
        timestamps : true,
        underscored : true // aclaro si dichos timestamps están escritos con guiones bajos y no escritos tipo camelCase
    }
    //Lo último que queda es pasar todas estas variables como parámetros del método define para 
    //luego retornar el resultado de este define
    const Movie = sequelize.define(alias,cols,config);

    

    Movie.associate = function(models){

        Movie.belongsTo(models.Generos,{
            as : 'genero',
            foreignKey : 'genre_id'
        })

        Movie.belongsToMany(models.Actores,{
            as : 'actores',
            through : 'actor_movie',//tabla intermedia 
            foreignKey : 'movie_id',//la clave foranea de este modelo en esa tabla intermedia
            otherKey : 'actor_id'//la otra clave foranea del otro modelo en cuestion en esa tabla intermedia
        })
        
    }

    return Movie

}