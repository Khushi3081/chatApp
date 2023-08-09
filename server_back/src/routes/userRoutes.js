const userData = require("../controller/userController")
const express = require("express")
const app = express.Router()
require("../googleStrategy")
const middleware = require("../middleware/middleware")

app.post("/addData", userData.addData)
app.get("/fetchData", userData.fetchData)
app.post("/checkData", userData.checkUserData)
app.post("/changeStatus", middleware, userData.changeStatus)
app.delete("/deleteUser", middleware, userData.deleteUser)
app.get("/editData", middleware, userData.editUser)
app.post("/updateData", middleware, userData.updateUser)

module.exports = app
