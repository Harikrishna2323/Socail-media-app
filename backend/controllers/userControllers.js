const User = require("../models/User");
const bcrypt = require("bcrypt");

// exports.getUserPage = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

//GET ONE
exports.getOneUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

//GET FRIENDs
exports.getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePic } = friend;
      friendsList.push({ _id, username, profilePic });
    });
    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

//GET ALL
exports.getAllUsers = async (req, res, next) => {};

//UPDATE
exports.updateUser = async (req, res, next) => {
  console.log("req.user:", req.user);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      await user.save();

      res.status(200).json({
        message: "Account has been updated",
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(403).json("You can update only YOUR account.");
  }
};

//DELETE
exports.deleteUser = async (req, res, next) => {
  console.log("req.user:", req.user);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.deleteOne({ _id: req.user.id });
      res.status(200).json({
        message: "Account has been deleted successfully.",
      });
    } catch (err) {
      console.log("error;", err);
      return res.status(400).json(err);
    }
  } else {
    console.log(err);
    return res.status(403).json("You can delete  YOUR account only.");
  }
};

//FOLLOW_USER
exports.followUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    console.log("params:", req.params.id);
    console.log("user.id:", req.user.id);
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      console.log(user);
      console.log(currentUser);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        console.log(user._id);
        await currentUser.updateOne({ $push: { following: user._id } });
      } else {
        return res.status(403).json("You already follow this user.");
      }

      res.status(204).send("You are now following the user.");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cant follow yourself !");
  }
};

//UNFOLLOW_USER
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

//GET BY NAME
exports.getByName = async (req, res) => {
  const { username } = req.params;
};
