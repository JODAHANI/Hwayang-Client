import { Pray } from "../models/Models";
import User from "../Models/Users";

export const getPrayRequest = async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const pray = await Pray.findById(id).populate("writer");
    if (!pray) {
      throw new Error("NOT FOUND");
    }
    return res.json({ success: true, pray });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const postPrayRequest = async (req, res) => {
  const {
    body: { skip, limit },
  } = req;

  try {
    const pray = await Pray.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("writer");
    if (pray.length < limit) {
      return res.json({
        success: true,
        pray,
        isScroll: false,
      });
    } else {
      return res.json({ success: true, pray, isScroll: true });
    }
  } catch (err) {
    return res.json({ success: false });
  }
};

export const writePrayRequest = async (req, res) => {
  const {
    body: { title, text, writer, isSecret },
  } = req;
  try {
    let pray = await Pray.create({
      title,
      text,
      writer,
      isSecret,
    });
    pray = await pray.populate("writer");
    const user = await User.findById(writer);
    user.prays.push(pray);
    user.save();
    console.log(user);
    return res.json({ success: true, pray });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const editPrayRequest = async (req, res) => {
  const {
    body: { id, title, text, writer, isSecret },
  } = req;
  try {
    const pray = await Pray.findOneAndUpdate(
      { _id: id },
      { title, text, isSecret },
      { new: true }
    ).populate("writer");
    const user = await User.findById(writer);
    for (let userPray of user.prays) {
      const prayId = userPray._id.toString();
      if (prayId === id) {
        userPray.title = title;
        userPray.text = text;
        userPray.isSecret = isSecret;
        user.save();
      }
    }
    return res.json({ success: true, pray });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const deletePrayRequest = async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const pray = await Pray.findByIdAndDelete({ _id: id }).populate("writer");
    const user = await User.findById(pray.writer._id);
    const result = user.prays.filter((item) => {
      const prayId = item._id.toString();
      return prayId !== id;
    });
    user.prays = [...result];
    user.save();
    return res.json({ success: true, pray });
  } catch (err) {
    return res.json({ success: false });
  }
};
