const { User } = require("../models/user");

class UserService {
  async findUser(filter) {
    const user = await User.findOne(filter);
    return user;
  }

  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log("failed to create user");
    }
  }
}

module.exports = new UserService();
