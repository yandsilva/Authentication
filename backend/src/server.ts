import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandle } from "./middleware/error-handle.js";
import { userRouter } from "./routes/user-route.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);

app.use(errorHandle);

app.listen(process.env.PORT, () => {
  console.log(`HTTP server runnning at ${process.env.PORT}`);
});
