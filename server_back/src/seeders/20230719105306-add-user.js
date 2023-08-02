"use strict"
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt")

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Users", [
            {
                firstName: "SuperAdmin",
                lastName: "SuperAdmin",
                email: "superAdmin@gmail.com",
                phoneNo: "9034201230",
                dateOfBirth: "2000/01/01",
                gender: "Male",
                password: await bcrypt.hash(
                    "sAdmin@123",
                    bcrypt.genSaltSync(8)
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
                roleId: 1,
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {})
    },
}
