const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

//
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const convRouter = require("./routes/conversation");
const messageRouter = require("./routes/messages");

// app config
const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("COnnected to DB."));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", convRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to home page.");
// });

app.listen(PORT, () => console.log("Server started in port: " + PORT));
