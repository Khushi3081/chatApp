"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addColumn(
            "Users", // table name
            "googleProviderId", // new field name
            {
                type: Sequelize.STRING,
                allowNull: true,
            }
        ),
            queryInterface.addColumn(
                "Users", // table name
                "registerType", // new field name
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            )
    },

    async down(queryInterface, Sequelize) {
    },
}
