const { AuthValidationError } = require('../errors/AuthValidationError');
const { save, findUser, findUserByEmail } = require('../services/userServices');
const {
  generateAccesToken,
  generateRefreshToken,
} = require('../utils/jwtUtil');
const { errorHandler, verifyPassword } = require('../utils/userUtil');
const {
  saveRefreshToken,
  removeRefreshToken,
} = require('../services/redisService');
const { generateSessionId, createSession } = require('../utils/sessionUtil');
require('dotenv').config();

const userRegister = async function (req, res) {
  const { username, password, email, passwordConfirmation } = req.body;
  try {
    if (password !== passwordConfirmation) {
      throw new AuthValidationError(
        'password',
        { password, passwordConfirmation },
        'Password and Password Confirmation is not match',
      );
    }

    const user = await save({ username, email, password });

    await createSession(res, user._id);

    return res.status(201).json({ message: 'registered' });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(401).json({ message: 'registration failed', errors });
  }
};

const userLogin = async function (req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new AuthValidationError(
        'login',
        undefined,
        'Login form cannot be blank',
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      throw new AuthValidationError('email', undefined, 'User not found');
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new AuthValidationError('password', password, 'Password incorrect');
    }

    await createSession(res, user._id);

    return res.status(200).json({ message: 'login success' });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(404).json({ message: 'login failed', errors });
  }
};

const getAllUser = async function (req, res) {
  try {
    const users = await findUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: 'user not found' });
  }
};

const logOut = async function (req, res) {
  const { sessionId } = req.user;

  res.cookie('accessToken', '', { maxAge: 1 });
  res.cookie('refreshToken', '', { maxAge: 1 });
  await removeRefreshToken(sessionId);

  return res.status(200).send('logout');
};

module.exports = { userRegister, userLogin, getAllUser, logOut };
