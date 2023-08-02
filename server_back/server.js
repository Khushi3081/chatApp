const express = require("express")
const cors = require("cors")
const session = require("express-session")
const bodyParser = require("body-parser")
const passport = require("passport")
const userRoutes = require("./src/routes/userRoutes")
const msgRoutes = require("./src/routes/msgRoutes")
const grpRoutes = require("./src/routes/grpRoutes")
const user = require("./src/models").User
require("dotenv").config()
const app = express()
const port = 5000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(session({ secret: "SECRET", resave: false, saveUninitialized: true }))
app.use(passport.session())
const path = require("path")
app.use(express.static(path.join(__dirname, "public/uploads")))

app.get("/success", async (req, res) => {
    console.log(req)
    let fname = req.user.name.familyName
    let lname = req.user.name.givenName
    let name = fname + lname
    let data = await user.create({
        name: name,
        email: req.user.emails[0].value,
        password: "",
        googleProviderId: req.user.id,
        registerType: req.user.provider,
        roleId: 2,
        phoneNo: "",
        dateOfBirth: new Date(),
        gender: "",
    })
    if (data) {
        res.writeHead(302, {
            Location: "http://localhost:3000/waitingPage",
        })
    }
    res.end()
})
app.get("/error", (req, res) => res.send("error logging in"))
passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
})
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "1094845245191-kuh5sm7kuqd1756d3daf9pld0la3ukf2.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/google/callback",
            proxy: true,
        },
        function (request, accessToken, refreshToken, profile, cb) {
            // console.log(profile);
            return cb(null, profile)
        }
    )
)
passport.serializeUser(function (user, cb) {
    cb(null, user)
})
app.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
)
app.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/success",
        failureRedirect: "/error",
    })
)
app.use("/", userRoutes)
app.use("/msg", msgRoutes)
app.use("/grp", grpRoutes)

app.listen(port, () => {
    console.log("server started on port:5000")
})
