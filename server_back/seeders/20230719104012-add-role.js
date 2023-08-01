"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Roles", [
            {
                name: "SuperAdmin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Member",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Roles", null, {})
    },
}
