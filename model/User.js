const { default: mongoose } = require('mongoose');
const { isEmail, isAlphanumeric } = require('validator');
const { hash, genSalt } = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    minlength: [6, 'Username should have min lenght 6 characters'],
    maxlength: [25, 'Username should have max length 25 characters'],
    validate: [
      isAlphanumeric,
      'Username should only contain number and alphabet only',
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [isEmail, 'You must input a valid email format'],
  },
  password: {
    type: String,
    min: [6, 'Password should have min lenght 6 characters'],
    required: [true, 'Password is required'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
