const msgData = require("../controller/messageController")
const express = require("express")
const upload = require("../middleware/uploader")
const valid = require("../middleware/middleware")
const app = express.Router()
app.post("/addMsg", valid, msgData.addData)
app.get("/chatUserData", valid, msgData.chatUserData)
app.get("/fetchChat", valid, msgData.fetchChat)
app.post("/addFile", valid, upload.single("file"), msgData.addFile)
app.get("/searchData", valid, msgData.searchData)

module.exports = app
