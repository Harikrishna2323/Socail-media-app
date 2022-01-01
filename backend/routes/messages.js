const router = require("express").Router();
const Message = require("../models/Message");
const messageController = require("../controllers/messageController");

//add
router.post("/", messageController.newMessage);
//get

router.get("/:convId", messageController.getMessage);

module.exports = router;
