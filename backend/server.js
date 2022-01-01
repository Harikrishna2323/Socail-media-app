const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

//
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const convRouter = require("./routes/conversation");
const messageRouter = require("./routes/messages");

// app config
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 5);
});

const PORT = process.env.PORT || 4000;
app.use(cors());

//database connection
mongoose
  .connect(
    `mongodb+srv://hari:hari1234@socialmedia.smavb.mongodb.net/socialMedia?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to DB."));

//socket io
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", convRouter);
app.use("/api/messages", messageRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to home page.");
// });

server.listen(PORT, () =>
  console.log(
    "Server started in port: " + PORT + "in " + process.env.NODE_ENV + " mode"
  )
);
