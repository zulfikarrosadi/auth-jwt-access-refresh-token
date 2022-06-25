const requiredLogin = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ message: 'You required to login to do this action' });
  }

  return next();
};

module.exports = { requiredLogin };
