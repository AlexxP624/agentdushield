const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const settings = require('./settings.json')

module.exports.load = async (client) => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.engine("html", ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, "/views"));
    app.use(express.static(path.join(__dirname, "/public")));
    app.use(session({
        secret: "BotDashboardExample101",
        resave: false,
        saveUninitialized: false
    }));

    app.use(async function(req, res, next) {
        req.client = client;
        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    passport.use(new Strategy({
        clientID: "877177600307511386",
        clientSecret: "vNqJpn9Gag78C4mZCpYIAwRXcBUTNPNK",
        callbackURL: "https://agentdushield.tk/login",
        scope: [ "identify", "guilds" ],
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }))

    app.use("/", require("./routes/index"));
    app.use("/dashboard", require("./routes/dashboard"));
    app.get("/docs", (req, res) => {
          if (!req.user) return res.redirect("/login")
      res.render("docs", {        tag: (req.user ? req.user.tag : "Login"),
        bot: req.client,
        user: req.user || null,})
    })
    app.get("/invite", (req, res) => {
        res.redirect("https://discord.com/oauth2/authorize?client_id=877177600307511386&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fagentdushield.tk%2Flogin&response_type=code&scope=bot")
    })
    app.get("/support", (req, res) => {
        res.redirect("https://discord.gg/BSBGj5Fa9v")
    })
    app.get("/commandes", (req, res) => {
        if (!req.user) return res.redirect("/login")
        res.render("commandes", {        tag: (req.user ? req.user.tag : "Login"),
        bot: req.client,
        user: req.user || null,
        commands: settings.commands})
    })
    app.get("/autres", (req, res) => {
    if (!req.user) return res.redirect("/login")
    res.render("autres", {        tag: (req.user ? req.user.tag : "Login"),
        bot: req.client,
        user: req.user || null,
        commands: settings.commands})
});

    app.listen(process.env.PORT, (err) => {
        console.log(`Webserver now online on port ${process.env.PORT}`);
    });
}