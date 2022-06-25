const { Router } = require('express');
const {
  userRegister,
  userLogin,
  getAllUser,
  logOut,
} = require('../controllers/userController');
const { requiredLogin } = require('../middlewares/requiredLogin');
const { deserializeUser } = require('../middlewares/deserializeUser');

const router = Router();

router.use(deserializeUser);

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/logout', logOut);
router.get('/', requiredLogin, getAllUser);
router.get('/test', requiredLogin, getAllUser);

module.exports = router;
