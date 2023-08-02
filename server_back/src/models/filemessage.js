'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.User, {
            foreignKey: "senderId",
            as: "user",
        })
    }
  }
  fileMessage.init({
    fileName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    size: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fileMessage',
  });
  return fileMessage;
};