const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    res.render('sessions/login', {
        title: 'Login'
    });
};

exports.logout = (req, res) => {
    if (!req.isAuthenticated())
        res.status(401).send({ error: "Could not authenticate request" });

    req.session.userId = null;
    res
        .clearCookie("token")
        .status(200)
        .send({ success: "Your are now logged out" });
};

exports.authenticate = async (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            user.authenticate(req.body.password, (err, isMatch) => {
                if (err) throw new Error(err);

                if (isMatch) {
                    req.session.userId = user.id;

                    const token = jwt.sign({ payload: req.body.email }, "doratheexplora", { expiresIn: '1h'});
                    res.cookie('token', token, { httpOnly: true});
                } else {
                    res.json({ error: 'ERROR: Your credentials do not match.'});
                }
            });
        })
        .catch(err => {
            res.json(err);
        });
};

exports.logout = (req, res) => {
    req.session.userId = null;
    req.flash('success', 'You are now logged out');
    res.redirect('/');
};