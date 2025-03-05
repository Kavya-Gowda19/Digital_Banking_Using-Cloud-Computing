const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    email: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, // Default to current date and time
    },
});

module.exports = mongoose.model("contact", contactSchema);
