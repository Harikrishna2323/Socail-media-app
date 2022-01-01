const router = require("express").Router();
const { json } = require("express");
const Conversation = require("../models/Conversation");
const convController = require("../controllers/convController");

//new Conversation
router.post("/", convController.newConv);

router.get("/:userId", convController.getConv);

router.get("/find/:firstUserId/:secondUserId", async (req, res, next) => {
  try {
    const conv = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conv);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get conversation of a user

module.exports = router;
