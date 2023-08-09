const grpData = require("../controller/groupController")
const express = require("express")
const app = express.Router()
const valid = require("../middleware/middleware")
app.post("/addGroup", valid, grpData.addData)
app.get("/groupUserData", valid, grpData.groupUserData)
app.post("/addMsg", valid, grpData.addchatData)
app.get("/fetchChat", valid, grpData.fetchChat)
app.get("/searchData", valid, grpData.searchData)

module.exports = app
