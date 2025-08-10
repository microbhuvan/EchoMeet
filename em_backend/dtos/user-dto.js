const { User } = require("../models/user");

class UserDto {
  id;
  phone;
  avatar;
  name;
  activated;
  createdAt;

  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.phone = user.phone;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
