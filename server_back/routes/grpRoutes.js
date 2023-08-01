const grpData = require("../controller/groupController")
const express = require("express")
const app = express.Router()
// const middleware = require("../middleware")
app.post("/addGroup", grpData.addData)
app.get("/groupUserData", grpData.groupUserData)
app.post("/addMsg", grpData.addchatData)
app.get("/fetchChat", grpData.fetchChat)

module.exports = app
