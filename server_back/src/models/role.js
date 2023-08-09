"use strict"
const { Model } = require("sequelize")
const user = require("./user")
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasOne(models.User, {
                foreignKey: {
                    name: "roleId",
                },
            })
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Role",
        }
    )

    return Role
}
