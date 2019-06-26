const mongoose = require("mongoose");

const TodoItemSchems = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    priority: {
        type: String,
        enum: ["High priority", "Medium priority", "Low priority"],
        default: "Low priority"
    }
});

module.exports = mongoose.model("TodoItem", TodoItemSchems);