import { Letter } from "../Models/Models";
import User from "../Models/Users";

export const postThanksLetter = async (req, res) => {
  const {
    body: { skip, limit },
  } = req;
  try {
    const letters = await Letter.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("from");
    return res.json({
      success: true,
      letters,
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const postThanksLetters = async (req, res) => {
  const {
    body: { skip, limit },
  } = req;
  try {
    const letters = await Letter.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("from");

    if (letters.length < limit) {
      return res.json({
        success: true,
        letters,
        isScroll: false,
      });
    }
    return res.json({
      success: true,
      letters,
      isScroll: true,
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const writeThanksLetter = async (req, res) => {
  const {
    body: { to, from, title, contents },
  } = req;
  try {
    let letter = await Letter.create({
      to,
      from,
      title,
      contents,
    });
    letter = await letter.populate("from");
    const user = await User.findById(from);
    user.letters.push(letter);
    user.save();
    return res.json({ success: true, letter, isScroll: true });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const deleteThanksLetter = async (req, res) => {
  const {
    body: { id, from },
  } = req;
  try {
    const letters = await Letter.findByIdAndDelete({ _id: id });
    const user = await User.findById(from);
    const result = user.letters.filter((item) => {
      const letterId = item._id.toString();
      return letterId !== id;
    });
    user.letters = [...result];
    user.save();
    return res.json({ success: true, letter: letters });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const editThanksLetter = async (req, res) => {
  const {
    body: { to, from, title, contents, id },
  } = req;

  try {
    let letter = await Letter.findOneAndUpdate(
      { _id: id },
      { to, title, contents },
      { new: true }
    );
    letter = await letter.populate("from");
    const user = await User.findById(from);
    for (let userLetter of user.letters) {
      const letterId = userLetter._id.toString();
      if (letterId === id) {
        userLetter.title = title;
        userLetter.to = to;
        userLetter.contents = contents;
        user.save();
      }
    }
    return res.json({ success: true, letter });
  } catch (err) {
    return res.json({ success: false });
  }
};
