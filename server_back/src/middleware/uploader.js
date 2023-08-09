const path = require("path")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
require("dotenv").config()

// multer storage
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/")
//     },
// })

// Cloudinary cloud storage
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = upload
