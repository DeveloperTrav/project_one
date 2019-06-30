const mongoose = require("mongoose");

const TodoItemSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },

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
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("TodoItem", TodoItemSchema);