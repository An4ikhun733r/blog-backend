import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";

import {
  getMe,
  login,
  register,
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
} from "./controllers/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import multer from "multer";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.hsnhtxa.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB err: ", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"),
  (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

app.get("/tags", getLastTags);
app.get("/posts", getAll);
app.get("/posts/tags", getLastTags);
app.get("/posts/:id", getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.delete("/posts/:id", checkAuth, remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("The server is ready. Here is the link: http://localhost:4444/");
});
