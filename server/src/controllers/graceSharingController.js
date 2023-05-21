import { GraceSharing } from "../Models/Models";
import User from "../Models/Users";
import { graceImageUpload } from "../routes/users";

export const postGraceSharing = async (req, res) => {
  const {
    body: { limit, skip },
  } = req;
  try {
    const graceSharing = await GraceSharing.find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .populate("writer");

    if (graceSharing.length < limit) {
      return res.json({ success: true, graceSharing, isScroll: false });
    }
    return res.json({ success: true, graceSharing, isScroll: true });
  } catch (err) {
    return res.json({ success: false });
  }
};

export const imageSave = (req, res) => {
  graceImageUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false });
    }
    const imagePath = res.req.file.path;
    return res.json({ success: true, imagePath });
  });
};

export const writeGraceSharing = async (req, res) => {
  const {
    body: { imagePath, writer, title, contents },
  } = req;

  try {
    let graceSharing = await GraceSharing.create({
      title,
      contents,
      imagePath,
      writer,
    });
    graceSharing = await graceSharing.populate("writer");
    const user = await User.findById(graceSharing.writer._id);
    user.graceSharing.push(graceSharing);
    user.save();

    return res.json({ success: true, isScroll: true, graceSharing });
  } catch (e) {
    return res.json({ success: false });
  }
};

export const deleteGraceSharing = async (req, res) => {
  const {
    body: { id },
  } = req;
  try {
    const removeGraceSharing = await GraceSharing.findByIdAndDelete({
      _id: id,
    });
    const user = await User.findById(removeGraceSharing.writer);
    const userDeleteGraceSharing = await user.deleteGraceSharing(id);
    user.graceSharing = [...userDeleteGraceSharing];
    user.save();
    const graceSharing = await GraceSharing.find()
      .sort({ _id: -1 })
      .populate("writer");
    return res.json({ success: true, graceSharing, isScroll: true });
  } catch (err) {
    return res.json({ success: false });
  }
};
