"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("fileMessages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fileName: {
                type: Sequelize.STRING,
            },
            filePath: {
                type: Sequelize.STRING,
            },
            size: {
                type: Sequelize.INTEGER,
            },
            senderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    field: "id",
                },
            },
            receiverId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("fileMessages")
    },
}
