"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "senderId",
                as: "user",
            })
        }
    }
    Message.init(
        {
            messageBody: DataTypes.STRING,
            senderId: DataTypes.INTEGER,
            receiverId: DataTypes.INTEGER,
            groupId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Message",
        }
    )
    return Message
}
