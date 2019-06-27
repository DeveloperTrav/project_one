const express = require("express");
const app = express();

const todoItemsRoutes = require("./routes/todoItems");
const userRoutes = require('./routes/users');
const sessionsRoutes = require('./routes/sessions');

app.get('/', (req, res) => {
    res.render("pages/home");
});

app.use('/todoItems', todoItemsRoutes);
app.use('/users', userRoutes);
app.use('/', sessionsRoutes);

module.exports = app;