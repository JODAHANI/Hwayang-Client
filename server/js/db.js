import mongoose from "mongoose";
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", async () => {
  console.log("DB connected!");
});
