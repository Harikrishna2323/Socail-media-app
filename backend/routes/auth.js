const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/", authController.getUserPage);

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

module.exports = router;
