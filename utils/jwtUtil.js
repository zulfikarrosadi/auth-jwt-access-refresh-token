const jwt = require('jsonwebtoken');
const { accessTokenExpires } = require('../const/config');
require('dotenv').config();

const generateAccesToken = (id, sessionId) => {
  return jwt.sign({ userId: id, sessionId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpires,
  });
};

const generateRefreshToken = (id, sessionId) => {
  return jwt.sign({ userId: id, sessionId }, process.env.REFRESH_TOKEN_SECRET);
};

const verifyJwt = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { payload: decoded };
  } catch (error) {
    return { payload: null };
  }
};

module.exports = { generateAccesToken, generateRefreshToken, verifyJwt };
