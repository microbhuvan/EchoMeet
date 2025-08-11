const { User } = require("../models/user");

class UserService {
  async findUser(filter) {
    //filter = phone:phone
    const user = await User.findOne(filter);
    return user;
  }

  async createUser(data) {
    //data = phone:phone
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log("failed to create user");
    }
  }
}

module.exports = new UserService();
