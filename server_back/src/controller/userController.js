const user = require("../models").User
const role = require("../models").Role
const salt = 10
const bcrypt = require("bcrypt")
const passport = require("passport")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// require("../googleStrategy")
const addData = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, dateOfBirth, gender } =
            req?.body?.userData
        const password = await bcrypt.hash(req.body.userData.password, salt)
        const oldUser = await user.findOne({
            where: {
                email: email,
            },
        })
        if (oldUser) {
            res.send(false)
        } else {
            const data = await user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                dateOfBirth: dateOfBirth,
                gender: gender,
                password: password,
                roleId: 2,
                isActive: false,
            })
            res.send(true)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const fetchData = async (req, res) => {
    try {
        const data = await user.findAll({ include: role })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const checkUserData = async (req, res) => {
    try {
        const data = await user.findOne({
            where: {
                email: req.body.userLoginData.email,
            },
        })
        const pass = req.body.userLoginData?.password
        if (data !== null) {
            const roleId = data.roleId
            const isActive = data.isActive
            if (await bcrypt.compare(pass, data?.password)) {
                const token = jwt.sign(
                    { userId: data.id, userEmail: data.email },
                    process.env.JWT_TOKEN_SECRET,
                    {
                        expiresIn: "30d",
                        algorithm: "HS256",
                    }
                )
                data.token = token
                res.send({ token, roleId, isActive, data })
            } else {
                res.send("Password does not match")
            }
        } else {
            res.send("email is incorrect")
        }
    } catch (error) {
        console.log(error.message)
    }
}
const changeStatus = async (req, res) => {
    try {
        const data = await user.update(
            { isActive: !req.body.isActive },
            {
                where: {
                    id: req.query.id,
                },
            }
        )
        const userData = await user.findOne({
            include: role,
            where: {
                id: req.query.id,
            },
        })
        res.send(userData)
    } catch (error) {
        console.log(error.message)
    }
}
const deleteUser = async (req, res) => {
    try {
        const data = await user.destroy({
            where: {
                id: req.query.id,
            },
        })
        const userData = await user.findAll()
        res.send(userData)
    } catch (error) {
        console.log(error.message)
    }
}
const editUser = async (req, res) => {
    try {
        const data = await user.findOne({
            include: role,
            where: {
                id: req.query.id,
            },
        })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const updateUser = async (req, res) => {
    try {
        const info = await role.findOne({
            where: {
                name: req.body.name,
            },
        })
        const { firstName, lastName, email, phoneNo, dateOfBirth, gender } =
            req?.body
        const data = await user.update(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                dateOfBirth: dateOfBirth,
                gender: gender,
                roleId: info.id,
            },
            {
                where: {
                    id: req.query.id,
                },
            }
        )
        const userData = await user.findOne({
            include: role,
            where: {
                id: req.query.id,
            },
        })
        res.send(userData)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addData,
    fetchData,
    checkUserData,
    changeStatus,
    deleteUser,
    editUser,
    updateUser,
}
