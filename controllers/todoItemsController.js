const Item = require("../models/todoItem");

exports.index = (req, res) => {
    if (!req.isAuthenticated()) return res.status(404).send({ error: "Not authenticated" });

    Item.find()
        .populate("author")
        .then(todoItems => res.json(todoItems))
        .catch(err => res.status(404).json(err));
};


exports.show = (req, res) => {
    if (!req.isAuthenticated()) return res.status(404).send({ error: "Not authenticated" });

    Item.findOne({
        _id: req.params.id,
        user: req.session.userId
    })
        .then(item => res.json(item))
        .catch(err => res.json(err));
};

exports.create = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(404).send({ error: "Not authenticated" });

    req.body.todoItem.user = req.session.userId;

    console.log(req.body);

    Item.create(req.body.todoItem)
        .then(() => res.json({ success: "New item added to list." }))
        .catch(err => res.json(err));
};

exports.edit = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Item.findOne({
        _id: req.params.id,
        user: req.session.userId
    })
        .then(todoItem => res.send(todoItem))
        .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
    if (!req.isAuthenticated()) return res.status(404).send({ error: "Not authenticated" });

    Item.updateOne({
        _id: req.body.id,
        author: req.session.userId
    }, req.body.todoItem, {
        runValidators: true
    })
        .then(() => res.json({ success: "Item has been updated" }))
        .catch(err => res.json(err));
};

exports.destroy = (req, res) => {
    req.isAuthenticated();

    Item.deleteOne({
        _id: req.body.id,
        user: req.session.userId
    })
        .then(() => {
            req.flash('success', 'Your item was removed from your todo list successfully.');
            res.redirect("/todoItems");
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/todoItems');
        });
};

exports.destroy = (req, res) => {
    if (!req.isAuthenticated()) return res.status(404).send({ error: "Not authenticated" });

    Item.deleteOne({
        _id: req.body.id,
        user: req.session.userId
    })
        .then(() => res.json({ success: "Item deleted" }))
        .catch(err => res.json(err));
};

