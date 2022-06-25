const jwt = require('jsonwebtoken');
const { accessTokenExpires } = require('../const/config');
const { checkRefreshTokenInRedis } = require('../services/redisService');
const { generateAccesToken, verifyJwt } = require('../utils/jwtUtil');
require('dotenv').config();

const deserializeUser = async function (req, res, next) {
  let { accessToken, refreshToken } = req.cookies;

  // check integrity of access token

  if (!accessToken) return next();
  const { payload: accessPayload } = verifyJwt(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
  );

  if (accessPayload) {
    req.user = accessPayload;
    return next();
  }

  // if access token is invalid, then check the integrity of refresh token

  if (!refreshToken) return next();
  const { payload: refreshPayload } = verifyJwt(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  if (!refreshPayload) return next();

  const isRefreshTokenValid = await checkRefreshTokenInRedis(
    refreshPayload.sessionId,
  );
  if (!isRefreshTokenValid) return next();

  const newAccessToken = generateAccesToken(refreshPayload._id);

  res.cookie('accessToken', newAccessToken, { httpOnly: true });

  req.user = newAccessToken;

  return next();
};

module.exports = { deserializeUser };
