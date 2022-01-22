const router = require("express").Router();
const userController = require("../controllers/userControllers");
const verify = require("../middleware/verifyToken");

// router.get("/", userController.getUserPage);

router.get("/", userController.getOneUser);

router.get("/friends/:userId", userController.getFriends);

// router.get("/name/:username", userController.getByName);

router
  .route("/:id")
  .patch(verify, userController.updateUser)
  .delete(verify, userController.deleteUser);

router.patch("/:id/follow", verify, userController.followUser);

router.patch("/:id/unfollow", userController.unfollowUser);

module.exports = router;
