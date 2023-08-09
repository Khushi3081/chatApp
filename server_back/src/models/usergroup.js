"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class usergroup extends Model {
        static associate(models) {
            // define association here
        }
    }
    usergroup.init(
        {
            userId: DataTypes.INTEGER,
            groupId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "usergroup",
        }
    )
    return usergroup
}
