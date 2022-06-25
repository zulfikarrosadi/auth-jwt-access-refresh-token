const { createClient } = require('redis');

let redisClient;
(async () => {
  try {
    redisClient = createClient('6379');

    redisClient.on('error', (err) => console.log(`client error ${err}`));
    redisClient.on('ready', () => console.log('im ready'));
    redisClient.on('connect', () => console.log('redis connected'));

    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
})();

const saveRefreshToken = async (key, token) => {
  const result = await redisClient.set(key, JSON.stringify(token));
  return result;
};

const removeRefreshToken = async (key) => {
  await redisClient.del(key);
};

const checkRefreshTokenInRedis = async (key) => {
  const token = await redisClient.get(key);

  return token;
};

module.exports = {
  saveRefreshToken,
  removeRefreshToken,
  checkRefreshTokenInRedis,
};
