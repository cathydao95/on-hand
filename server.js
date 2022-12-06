import express from "express";
const app = express();
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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URL);
//     app.listen(port, () => {
//       console.log(`server is listening on port ${port}...`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
