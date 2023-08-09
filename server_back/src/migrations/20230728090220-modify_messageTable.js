"use strict"

const { INTEGER } = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Messages", "groupId", {
            type: INTEGER,
            allowNull: true,
        })
    },

    async down(queryInterface, Sequelize) {},
}
