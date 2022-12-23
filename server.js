import express from "express";
import "express-async-errors";
import morgan from "morgan";

const app = express();

import fileUpload from "express-fileupload";
// const fileUpload = require('express-fileupload');
// // USE V2
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

import dotenv from "dotenv";
dotenv.config();
// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import recipesRouter from "./routes/recipesRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticate from "./middleware/authenticate.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(fileUpload());

app.use(express.static("./client/public"));

// app.use(fileUpload({ useTempFiles: true }));

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.use("/api/auth", authRouter);
app.use("/api/recipes", authenticate, recipesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
