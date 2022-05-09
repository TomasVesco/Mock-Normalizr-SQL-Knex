const mongoose = require('mongoose');

const messagesCollection = 'messages';

const messageSchema = new mongoose.Schema({
    author: {type: String, require: true, max: 100000},
    text: {type: Number, require: true, max: 1000000},
    timestamp: {type: String, require: true, max: 1000000}
});

const messages = mongoose.model(messagesCollection, messageSchema);

module.exports = messages;