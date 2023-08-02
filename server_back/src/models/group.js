"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            this.belongsToMany(models.User, {
                through: "usergroup",
                as: "users",
                foreignKey: "groupId",
            })
        }
    }
    Group.init(
        {
            groupName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Group",
        }
    )
    return Group
}
