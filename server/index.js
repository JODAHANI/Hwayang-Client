import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./js/db";
import path from "path";

import userRouter from "./routes/users";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ hello: "test Hi~" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
