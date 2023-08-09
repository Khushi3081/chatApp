"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class fileMessage extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "senderId",
                as: "user",
            })
        }
    }
    fileMessage.init(
        {
            fileName: DataTypes.STRING,
            filePath: DataTypes.STRING,
            size: DataTypes.INTEGER,
            senderId: DataTypes.INTEGER,
            receiverId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "fileMessage",
        }
    )
    return fileMessage
}
