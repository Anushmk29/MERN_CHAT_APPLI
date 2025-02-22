const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    trim: true, //for trailing spaces
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
},{timeStamps:true});

const Message = mongoose.model("Message",messageSchema)

module.exports = Message;