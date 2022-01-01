const Post = require("../models/Post");
const User = require("../models/User");

//GET ALL POST  --testing
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

//CREATE POST => /api/posts
exports.createPost = async (req, res) => {
  const { userId, desc, img } = req.body;

  const newPost = new Post({
    userId,
    desc,
    img,
  });
  try {
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//UPDATE POSt => /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated.");
    } else {
      console.log(err);
      return res.status(403).json("You cant update YOUR post only.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted.");
    } else {
      console.log(err);
      return res.status(403).json("You cant delete YOUR post only.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//LIKE A POST
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.params.id)) {
      await post.updateOne({ $push: { likes: req.params.id } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.params.id } });
      res.status(200).json("Unliked the post.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//GET A POST
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(404).json("No post found.");
  }
};

//GET ALL POST OF USER TIMELINE
exports.getTimelinePosts = async (req, res) => {
  let postArr = [];
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: req.params.userId });

    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    postArr = userPosts.concat(...friendPosts);

    res.status(200).json(postArr);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get users all posts
exports.getAllUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
