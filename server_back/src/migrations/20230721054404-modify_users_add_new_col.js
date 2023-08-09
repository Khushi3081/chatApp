"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addColumn(
            "Users", // table name
            "isActive", // new field name
            {
                type: Sequelize.BOOLEAN,
                defaultValue:false,
                allowNull: true,
            }
        )
    },

    async down(queryInterface, Sequelize) {
    },
}
