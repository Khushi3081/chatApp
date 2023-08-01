const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID:
                "1094845245191-kuh5sm7kuqd1756d3daf9pld0la3ukf2.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/google/callback",
            proxy: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(err, profile)
        }
    )
)
passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user);
 });