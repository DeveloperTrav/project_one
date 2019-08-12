const User = require('../models/user');

exports.create = (req, res) => {
    User.create(req.body.user)
        .then(() => res.json({ success: "You have successfully registered a new user." }))
        .catch(err => res.json(err));
};