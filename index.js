const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("express-async-errors");
const multer = require("multer");
const errorHandlerMiddleWare = require("./middleware/errorHandler.js");
const notFound = require("./middleware/not_found.js");
const { connectDB } = require("./db/connect.js");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");
const authorized = require("./middleware/authenticated.js");
const { register } = require("./controllers/auth.js");
const { createPost } = require("./controllers/posts.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/assests");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/auth/register", upload.single("picturePath"), register);
app.post("/posts", authorized, upload.single("picturePath"), createPost);

app.use("/auth", authRouter);
app.use("/users", authorized, userRouter);
app.use("/posts", authorized, postRouter);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use(errorHandlerMiddleWare);
app.use(notFound);

const PORT = process.env.PORT || 6001;

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
