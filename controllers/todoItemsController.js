const Item = require("../models/todoItem");
const mongoose = require("mongoose");

exports.new = (req,res) => {
    req.isAuthenticated();

    res.render("todoItems/new", {
        title: "New todo item"
    });
};

exports.index = (req, res) => {
    req.isAuthenticated();

    Item.find({
        user: req.session.userId
    })
        .populate('user')
        .then(todoItems => {
            res.render('todoItems/index', {
                todoItems: todoItems,
                title: 'Archive'
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/');
        });
};


exports.show = (req, res) => {
    req.isAuthenticated();

    Item.findOne({
        _id: req.params.id,
        user: req.session.userId
    })
        .then(item => {
            res.render('todoItems/show', {
                title: item.title,
                Item: item
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/todoItems');
        });
};

exports.create = (req, res) => {
    req.isAuthenticated();

    req.body.todoItem.user = req.session.userId;
    req.body.todoItem.title = "Todo Item";
    Item.create(req.body.todoItem)
        .then(() => {
            req.flash('success', `Your new item was added to your todo list! ${req.body.todoItem.title}`);
            res.redirect('/todoItems');
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.render('todoItems/new', {
                todoItem: req.body.todoItem,
                title: 'New Item'
            });
        });
};

exports.edit = (req, res) => {
    req.isAuthenticated();

    Item.findOne({
        _id: req.params.id,
        user: req.session.userId
    })
        .then(item => {
            res.render('todoItems/edit', {
                title: `Edit ${item.title}`,
                todoItem: item
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/todoItems');
        });
};

exports.update = (req, res) => {
    req.isAuthenticated();

    Item.updateOne({
        _id: req.body.id,
        user: req.session.userId
    }, req.body.todoItem, {
        runValidators: true
    })
        .then(() => {
            req.flash('success', 'Your item was updated todo list successfully.');
            res.redirect('/todoItems');
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.render('todoItems/edit', {
                todoItem: req.body.todoItem,
                title: `Edit ${req.body.todoItem.title}`
            });
        });
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

