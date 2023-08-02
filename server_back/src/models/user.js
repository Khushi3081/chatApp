"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, { foreignKey: "roleId" })
            this.belongsToMany(models.Group, {
                through: "usergroup",
                as: "groups",
                foreignKey: "userId",
            })
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNo: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            gender: DataTypes.STRING,
            password: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
            googleProviderId: DataTypes.STRING,
            registerType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    )
    return User
}
