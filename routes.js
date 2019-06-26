const express = require("express");
const app = express();

const todoItemsRoutes = require("./routes/todoItems");

app.get('/', (req, res) => {
    res.render("pages/home");
});

app.use('/todoItems', todoItemsRoutes);

module.exports = app;