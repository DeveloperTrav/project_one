const item = require("../models/todoItem");
const mongoose = require("mongoose");

exports.new = (req,res) => {
    res.render("todoItems/new", {
        title: "New todo item"
    })
};

exports.index = (req, res) => {
    item.find()
        .then(todoItems => {
            res.render('todoItems/index', {
                todoItems: todoItems,
                title: 'Todo Items'
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/');
        });
};


exports.show = (req, res) => {
    item.findById(req.params.id)
        .then(todoItem => {
            res.render('todoItems/show', {
                title: "Todo Items Show",
                todoItem: todoItem
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/');
        });
};

exports.create = async (req, res) => {
    item.create(req.body.todoItem)
        .then(() => {
            req.flash('success', 'Your new item was added to your todo list!');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);

            req.flash('error', `ERROR: ${err}`);
            res.render('todoItems/new', {
                metaHuman: req.body.todoItem,
                title: 'New Item'
            });
        });
};

exports.edit = (req, res) => {
    item.findById(req.params.id)
        .then(todoItem => {
            res.render('todoItems/edit', {
                title: `Edit ${todoItem.title}`,
                todoItem: todoItem
            });
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.redirect('/');
        });
};

exports.update = (req, res) => {
    item.updateOne({
        _id: req.body.id
    }, req.body.todoItem, {
        runValidators: true
    })
        .then(() => {
            req.flash('success', 'Your item was updated todo list +successfully.');
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error', `ERROR: ${err}`);
            res.render('todoItems/edit', {
                todoItem: req.body.todoItem,
                title: `Edit ${req.body.todoItem.name}`
            });
        });
};

exports.destroy = (req, res) => {
    item.deleteOne({
        _id: req.body.id
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

