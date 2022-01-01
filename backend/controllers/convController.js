const Conversation = require("../models/Conversation");

exports.newConv = async (req, res) => {
  const newConv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConv = await newConv.save();
    res.status(200).json(savedConv);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.getConv = async (req, res) => {
  try {
    const conv = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conv);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
