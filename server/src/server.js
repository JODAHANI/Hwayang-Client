import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./js/db";
import userRouter from "./routes/users";
import path from "path";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:9000",
      "https://web-hwayang-client-7e6o2clhv5snco.sel4.cloudtype.app",
      "http://web-hwayang-client-7e6o2clhv5snco.sel4.cloudtype.app",
    ],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "..", "/uploads")));
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ test: "HI~" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
