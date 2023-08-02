const Sequelize = require("sequelize")
const filemessage = require("../models/filemessage")
const file = require("../models").fileMessage
const msg = require("../models").Message
const user = require("../models").User

const Op = Sequelize.Op
const addData = async (req, res) => {
    const senderId = req.body.senderId
    const receiverId = Number(req.body.receiverId)
    const data = await msg.create({
        messageBody: req.body.msg,
        senderId: senderId,
        receiverId: receiverId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    res.send(data)
}
const addFile = async (req, res) => {
    console.log(req.file);
    const senderId = Number(req.body.senderId)
    const receiverId = Number(req.body.receiverId)
    const data = await file.create({
        fileName: req.file.filename,
        filePath: req.file.path,
        size: req.file.size,
        senderId: senderId,
        receiverId: receiverId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    res.send(data)
}
const chatUserData = async (req, res) => {
    try {
        const data = await user.findAll({
            where: {
                roleId: {
                    [Op.not]: 1,
                },
                isActive: true,
            },
        })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const fetchChat = async (req, res) => {
    const senderId = Number(req.query.senderId)
    const receiverId = Number(req.query.receiverId)
    const offset = Number(req.query.offset)
    try {
        const msgData = await msg.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId,
                    },
                ],
            },
            include: [{ model: user, as: "user", attributes: ["firstName"] }],
            order: Sequelize.literal("id DESC"),
            // offset: 0,
            // limit: offset,
        })
        msgData.sort((a, b) => a.createdAt - b.createdAt)
        const fileData = await file.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId,
                    },
                ],
            },
            include: [{ model: user, as: "user", attributes: ["firstName"] }],
        })
        const result = msgData.concat(fileData)
        result.sort((a, b) => a.createdAt - b.createdAt)
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { addData, chatUserData, fetchChat, addFile }
