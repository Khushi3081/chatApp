const msgData = require("../controller/messageController")
const express = require("express")
const upload = require("../middleware/uploader")
const app = express.Router()
app.post("/addMsg", msgData.addData)
app.get("/chatUserData", msgData.chatUserData)
app.get("/fetchChat", msgData.fetchChat)
app.post("/addFile", upload.single("file"), msgData.addFile)

module.exports = app
