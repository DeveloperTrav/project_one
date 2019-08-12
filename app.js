require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    useNewUrlParser: true
}).catch(err => console.error(`ERROR: ${err}`));

const express = require('express');

const app = express();

const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser());
app.use(session({
    secret: (process.env.secret || 'boorakacha'),
    cookie: {
        maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
    // debugger
    res.locals.flash = res.locals.flash || {};
    res.locals.flash.success = req.flash('success') || null;
    res.locals.flash.error = req.flash('error') || null;

    next();
});

// Body parser which will make reading request bodies MUCH easier
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/css', express.static('assets/stylesheets'));
app.use('/js', express.static('assets/javascripts'));
app.use('/images', express.static('assets/images'));

//Authentication helper
const jwt = require("jsonwebtoken");
const isAuthenticated = req => {
    const token =
        (req.cookies && req.cookies.token) || (req.body && req.body.token) || (req.query && req.query.token) || (req.headers && req.headers["x-access-token"]);

    if (req.session.userId) return true;
    if (!token) return false;

    jwt.verify(token, "doratheexplora", function(err, decoded) {
        if (err) return false;
        return true;
    });
};

app.use((req, res, next) => {
    req.isAuthenticated = () => {
        return isAuthenticated(req);
    };

    res.locals.isAuthenticated = isAuthenticated(req);
    next();
});

const routes = require('./routes.js');
app.use('/api', routes);

//Handles request not defined in node js server
const root = path.join(__dirname, '/client/build');
app.use(express.static(root));
app.use((req, res, next) => {
    if (req.method === "GET" && req.accepts('html') && req.is('json') && !req.path.includes('.')) {
        res.sendfile('index.html', { root });
    } else next();
});

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));