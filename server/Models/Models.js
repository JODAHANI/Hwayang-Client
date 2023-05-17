import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const isNumRemove = (data) => {
  return data.replace(/[^0-9]/g, "");
};

const logosSchema = new mongoose.Schema({
  todayLogos: {
    type: String,
    default: undefined,
  },
  paragraph: {
    type: String,
    default: undefined,
  },
  logosList: {
    type: [Object],
    default: undefined,
  },
});

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pw: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
});

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
  },
  imagePath: {
    type: String,
  },
});

const letterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
});

const praySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isSecret: {
    type: Boolean,
    required: true,
  },
});

const graceSharing = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

adminSchema.methods.comparePassword = async function (password) {
  let compare = await bcrypt.compare(password, this.pw);
  return compare;
};

adminSchema.methods.generateToken = async function () {
  const token = jwt.sign(this._id.toString(), process.env.SECRET_CODE);
  this.token = token;
  const user = await this.save();
  return user;
};

adminSchema.statics.findByToken = async function (token) {
  let Admin = this;
  let decrypt = await jwt.verify(token, process.env.SECRET_CODE);
  let admin = await Admin.findOne({ _id: decrypt, token });
  return admin;
};

export const Admin = mongoose.model("Admin", adminSchema);
export const Logos = mongoose.model("Logos", logosSchema);
export const Notification = mongoose.model("Notification", notificationSchema);
export const Letter = mongoose.model("Letter", letterSchema);
export const Pray = mongoose.model("Pray", praySchema);
export const GraceSharing = mongoose.model("GraceSharing", graceSharing);
