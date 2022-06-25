const User = require('../model/User');

const save = async ({ username, email, password }) => {
  const user = new User({ username, password, email });
  await user.save();

  return user;
};

const findUser = async () => {
  const users = await User.find();

  return users;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

module.exports = { save, findUser, findUserByEmail };
