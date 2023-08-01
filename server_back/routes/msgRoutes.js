const msgData = require("../controller/messageController")
const express = require("express")
const app = express.Router()
// const middleware = require("../middleware")
app.post("/addMsg", msgData.addData)
app.get("/chatUserData", msgData.chatUserData)
app.get("/fetchChat", msgData.fetchChat)

module.exports = app
