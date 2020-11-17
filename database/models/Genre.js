module.exports = (sequelize, dataTypes) => {

    let alias = "Generos"

    let cols = {

        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type : dataTypes.INTEGER(10),
            allowNull : false
        },
        active : {
            type : dataTypes.BOOLEAN,
            defaultValue : 1
        }
    }

    let config = {
        tableName : "genres",
        timestamps : true,
        underscored : true
    }

    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = function(models){
        
        Genre.hasMany(models.Peliculas,{
            as : 'peliculas', // Generos.peliculas
            foreignKey : 'genre_id' // ESTA CLAVE SE ENCUENTRA EN LA TABLA PELICULAS
        })

    }

    return Genre

}