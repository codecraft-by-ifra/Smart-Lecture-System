const express = require('express');
const { registerUser, loginUser, forgetPassword,
  resetPassword } = require('../controllers/userController');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forget', forgetPassword);
router.post('/reset', resetPassword);


module.exports = router;
