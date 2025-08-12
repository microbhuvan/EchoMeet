const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dto.js");

const storagePath = path.resolve(__dirname, "../storage");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath);
}

class ActivateController {
  async activate(req, res) {
    //get the name and avatar
    console.log("inside active function");
    const { name, avatar } = await req.body;

    //check if name and avatar are present
    if (!name || !avatar) {
      return res.status(400).json({ message: "all fields must be entered" });
    }
    console.log("name", name);
    console.log("avatar", avatar);

    //get the user from the middleware

    try {
      const userId = req.user._id;

      //check if the user exist in the db
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      //if yes put activated and name field

      user.activated = true;
      user.name = name;
      //check if the starting of avatar contains base 64 if yes process that

      if (avatar.startsWith("data:image/")) {
        //remvoe the precedene

        const base64Data = avatar.replace(/^data:image\/w+;base64,/, "");
        //convert the base 64 to buffer
        const buffer = Buffer.from(base64Data, "buffer");
        //give new image path
        const imagePath = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}.png`;
        //resolve path
        const outputPath = path.resolve(storagePath, imagePath);

        //use sharp to resize .png() and store image
        await sharp(buffer)
          .resize(110, 110, { fit: "inside" })
          .png()
          .toFile(outputPath);

        user.avatar = `/storage/${imagePath}`;
      } else {
        user.avatar = avatar;
      }

      await user.save();
      const fuser = new UserDto(user);
      return res.status(200).json({ user: fuser, auth: true });
    } catch (err) {
      console.log("activation error ", err);
      return res
        .status(500)
        .json({ message: "couldnt process the image", error: err });
    }
  }
}

module.exports = new ActivateController();
