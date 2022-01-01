const router = require("express").Router();
const postController = require("../controllers/postController");
const verify = require("../middleware/verifyToken");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

//require verify
router.get("/timeline/:userId", postController.getTimelinePosts);

router.get("/profile/:username", postController.getAllUserPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(verify, postController.updatePost)
  .delete(verify, postController.deletePost);

router.patch("/:id/like", postController.likePost);

module.exports = router;
