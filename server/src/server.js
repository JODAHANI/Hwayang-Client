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

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://port-0-hwayang-7e6o2clhv5snco.sel4.cloudtype.app",
    ],
  })
);

app.use(
  express.static(
    path.join("/Users/jodahan/Desktop/hwayang/server/client/build")
  )
);
app.use(
  "/uploads",
  express.static(path.join("/Users/jodahan/Desktop/hwayang/server/uploads"))
);

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(
    path.join("/Users/jodahan/Desktop/hwayang/server/client/build/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});