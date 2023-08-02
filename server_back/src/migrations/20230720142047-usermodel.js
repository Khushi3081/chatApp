"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            phoneNo: {
                type: Sequelize.STRING,
            },
            dateOfBirth: {
                type: Sequelize.DATE,
            },
            gender: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Roles",
                    field: "id",
                },
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users")
    },
}
