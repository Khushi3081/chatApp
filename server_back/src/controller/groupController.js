const Sequelize = require("sequelize")
const grp = require("../models").Group
const user = require("../models").User
const msg = require("../models").Message
const usergroup = require("../models").usergroup
const Op = Sequelize.Op
const addData = async (req, res) => {
    try {
        const data = await grp.create({
            groupName: req?.body?.groupName,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        const userIds = req?.body?.userIds.map(async (e) => {
            const usergroupData = await usergroup.create({
                groupId: data.id,
                userId: e,
            })
            return usergroupData
        })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const groupUserData = async (req, res) => {
    try {
        const data = await grp.findAll({
            include: [
                {
                    model: user,
                    as: "users",
                    attributes: ["id", "firstName"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        })
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
}
const addchatData = async (req, res) => {
    const data = await msg.create({
        messageBody: req?.body?.msg,
        senderId: req?.body?.senderId,
        groupId: Number(req?.body?.groupId),
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    res.send(data)
}
const fetchChat = async (req, res) => {
    const senderId = req?.query?.senderId
    const receiverId = Number(req?.query?.receiverId)
    const offset = Number(req?.query?.offset)
    const index = -offset
    try {
        const sendReceive = await msg.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: {
                            [Op.in]: senderId,
                        },
                    },
                    { groupId: receiverId },
                ],
            },
            include: [{ model: user, as: "user", attributes: ["firstName"] }],
            order: Sequelize.literal("id DESC"),
        })

        sendReceive.sort((a, b) => a.createdAt - b.createdAt)
        res.send(sendReceive.slice(index))
    } catch (error) {
        console.log(error.message)
    }
}
const searchData = async (req, res) => {
    try {
        const senderId = req.query.senderId
        const groupId = Number(req.query.groupId)
        const search = req.query.search
        const data = await msg.count({
            where: {
                [Op.and]: {
                    messageBody: {
                        [Op.like]: "%" + search + "%",
                    },

                    groupId: groupId,
                },
            },
        })
        res.send({ data })
    } catch (error) {
        console.log(error.message, "lllllll")
    }
}
module.exports = { addData, groupUserData, addchatData, fetchChat, searchData }
