module.exports = (sequelize, dataTypes) => {
    
    let alias = "actor_movie"

    let cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        actor_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        movie_id :{
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        }
    }

    let config = {
        tableName : 'actor_movie',
        timestamps : true,
        underscored : true
    }

    const actor_movie = sequelize.define(alias,cols,config);
    
    

    return actor_movie
}