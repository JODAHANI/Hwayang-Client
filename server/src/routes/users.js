import express from "express";
import User from "../Models/Users";

// 감사편지 컨트롤러
import {
  postThanksLetters,
  postThanksLetter,
  writeThanksLetter,
  editThanksLetter,
  deleteThanksLetter,
} from "../controllers/thanksLetterController";

// 은혜공유 컨트롤러
import {
  postGraceSharing,
  imageSave,
  writeGraceSharing,
  deleteGraceSharing,
} from "../controllers/graceSharingController";

// 기도요청 컨트롤러
import {
  getPrayRequest,
  deletePrayRequest,
  editPrayRequest,
  writePrayRequest,
  postPrayRequest,
} from "../controllers/prayRequestController";

import { GraceSharing, Logos, Notification, Pray } from "../Models/Models";
import { auth } from "../middleware/auth";
import multer from "multer";

const userRouter = express.Router();

const graceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/users/graceImage/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const graceImageUpload = multer({ storage: graceStorage }).single(
  "file"
);

userRouter.get("/auth", auth, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    isAuth: true,
    account: req.user.account,
    name: req.user.name,
  });
});

userRouter.post("/login", async (req, res) => {
  const {
    body: { account, password },
  } = req;
  let user = await User.findOne({ account });
  if (!user) {
    return res.json({
      loginSuccess: false,
      message: "가입 된 아이디가 없습니다.",
    });
  }

  let userPasswordCompare = await user.comparePassword(password);

  if (!userPasswordCompare) {
    return res.json({
      loginSuccess: false,
      message: "비밀번호가 맞지 않습니다.",
    });
  }
  const userGenerateToken = await user.generateToken();
  if (!userGenerateToken.token) {
    return res.json({
      loginSuccess: false,
      message: "로그인 실패.",
    });
  }
  return res.cookie("w_auth", user.token).status(200).json({
    loginSuccess: true,
    userId: user._id,
    userName: user.name,
  });
});

userRouter.post("/sign-up", async (req, res) => {
  const {
    body: { name, account, password, checkPassword, position, phoneNumber },
  } = req;
  let userFind = await User.findOne({ account: account });
  if (userFind) {
    return res.json({ success: false, err: "동일한 아이디가 존재합니다." });
  }
  if (password != checkPassword) {
    return res.json({ success: false, err: "패스워드가 일치하지 않습니다." });
  }
  let user = await User.create({
    account,
    password: password.toLowerCase(),
    name,
    position,
    phoneNumber,
  });
  return res.status(200).json({ success: true });
});

userRouter.get("/logout", auth, async (req, res) => {
  let logoutUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    { new: true }
  );
  if (!logoutUser) return res.json({ success: false, err });
  return res.json({ success: true });
});

userRouter.post("/user-data", async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const user = await User.findById(id).populate({
      path: "graceSharing",
    });

    const letters = user.letters;
    const prays = user.prays;
    const graceSharing = user.graceSharing;
    const userDocuments = {
      letters,
      prays,
      graceSharing,
    };
    return res.json({ success: true, userDocuments });
  } catch (err) {
    return res.json({ success: false });
  }
});

userRouter.post("/user/worship-data", async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const user = await User.findById(id);
    const userWorship = user.worship;
    return res.json({ success: true, userWorship });
  } catch (err) {
    return res.json({ success: false });
  }
});

userRouter.get("/proclamation", async (req, res) => {
  try {
    const logos = await Logos.findOne();
    return res.json({ success: true, logos });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err: "NOT FOUND" });
  }
});

userRouter.get("/notification/get-notifications", async (req, res) => {
  const notification = await Notification.find();
  return res.json({ success: true, notification });
});

// 감사편지
userRouter.post("/thanks-letters", postThanksLetters);
userRouter.post("/thanks-letter", postThanksLetter);
userRouter.post("/thanks-letter/write", writeThanksLetter);
userRouter.post("/thanks-letter/edit", editThanksLetter);
userRouter.post("/thanks-letter/delete", deleteThanksLetter);

// 기도요청
userRouter.post("/pray-request", getPrayRequest);
userRouter.post("/prays-request", postPrayRequest);
userRouter.post("/pray-request/write", writePrayRequest);
userRouter.post("/edit/pray-request", editPrayRequest);
userRouter.post("/delete/pray-request", deletePrayRequest);

// 은헤공유
userRouter.post("/grace-sharing", postGraceSharing);
userRouter.post("/grace-sharing/write/image-save", imageSave);
userRouter.post("/grace-sharing/write", writeGraceSharing);
userRouter.post("/grace-sharing/delete", deleteGraceSharing);

export default userRouter;
