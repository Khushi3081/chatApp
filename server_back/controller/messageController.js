const Sequelize = require("sequelize")
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
        const sendReceive = await msg.findAndCountAll({
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
            offset: 0,
            limit: offset,
        })
        const rows = sendReceive.rows.sort((a, b) => a.createdAt - b.createdAt);
        const count = sendReceive.count
        res.send({rows,count})
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { addData, chatUserData, fetchChat }
