import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import * as expressError from "express-async-errors";
import multer from "multer";
import errorHandlerMiddleWare from "./middleware/errorHandler.js";
import notFound from "./middleware/not_found.js";
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import authorized from "./middleware/authenticated.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

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
