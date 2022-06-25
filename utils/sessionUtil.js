const { randomBytes } = require('crypto');
const { saveRefreshToken } = require('../services/redisService');
const {
  generateAccesToken,
  generateRefreshToken,
} = require('../utils/jwtUtil');

const generateSessionId = () => {
  return randomBytes(32).toString('hex');
};

const createSession = async (res, userId) => {
  const accessSessionId = generateSessionId();
  const refreshSessionId = generateSessionId();

  const accessToken = generateAccesToken(userId, accessSessionId);
  const refreshToken = generateRefreshToken(userId, refreshSessionId);

  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  await saveRefreshToken(refreshSessionId, refreshToken);
};

module.exports = { generateSessionId, createSession };
