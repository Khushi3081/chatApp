const user = require("../models").User
const role = require("../models").Role
const salt = 10
const bcrypt = require("bcrypt")
const db = require("../models")
const passport = require("passport")
const jwt = require("jsonwebtoken")
require("dotenv").config()
require("../googleStrategy")
const addData = async (req, res) => {
    const { firstName, lastName, email, phoneNo, dateOfBirth, gender } =
        req.body.userData
    const password = await bcrypt.hash(req.body.userData.password, salt)
    try {
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
    const a = req.body.isActive
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
    const data = await user.destroy({
        where: {
            id: req.query.id,
        },
    })
    const userData = await user.findAll()
    res.send(userData)
}
const editUser = async (req, res) => {
    const data = await user.findOne({
        include: role,
        where: {
            id: req.query.id,
        },
    })
    res.send(data)
}
const updateUser = async (req, res) => {
    try {
        const info = await role.findOne({
            where: {
                name: req.body.name,
            },
        })
        const data = await user.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
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
