const Message = require("../models/Message");

exports.newMessage = async (req, res) => {
  const newMsg = new Message(req.body);
  try {
    const savedMsg = await newMsg.save();
    res.status(200).json(savedMsg);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.convId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
