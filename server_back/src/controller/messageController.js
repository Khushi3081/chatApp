const Sequelize = require("sequelize")
const cloudinary = require("cloudinary").v2
const fileData = require("../models").fileMessage
const msg = require("../models").Message
const user = require("../models").User

const Op = Sequelize.Op
const addData = async (req, res) => {
    try {
        const senderId = req?.body?.senderId
        const receiverId = Number(req?.body?.receiverId)
        const data = await msg.create({
            messageBody: req.body.msg,
            senderId: senderId,
            receiverId: receiverId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const addFile = async (req, res) => {
    try {
        const senderId = Number(req?.body?.senderId)
        const receiverId = Number(req?.body?.receiverId)
        const file = req?.file

        const uploadedResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ resource_type: "auto" }, (error, result) => {
                    if (error) {
                        reject("Error uploading image:", error)
                    } else {
                        resolve(result)
                    }
                })
                .end(file.buffer)
        })
        const data = await fileData.create({
            fileName: uploadedResponse?.asset_id,
            filePath: uploadedResponse?.secure_url,
            size: uploadedResponse?.bytes,
            senderId: senderId,
            receiverId: receiverId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
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
    try {
        const senderId = Number(req?.query?.senderId)
        const receiverId = Number(req?.query?.receiverId)
        const offset = Number(req?.query?.offset)
        const index = -offset
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
        })
        msgData.sort((a, b) => a.createdAt - b.createdAt)
        const fileInfo = await fileData.findAll({
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
        })
        const result = msgData.concat(fileInfo)
        result.sort((a, b) => a.createdAt - b.createdAt)
        res.send(result.slice(index))
    } catch (error) {
        console.log(error.message)
    }
}
const searchData = async (req, res) => {
    try {
        const senderId = Number(req.query.senderId)
        const receiverId = Number(req.query.receiverId)
        const search = req.query.search
        const data = await msg.count({
            where: {
                [Op.and]: {
                    messageBody: {
                        [Op.like]: "%" + search + "%",
                    },
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
            },
        })
        res.send({ data })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { addData, chatUserData, fetchChat, addFile, searchData }
