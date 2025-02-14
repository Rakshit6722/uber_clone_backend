const express = require("express");
const router = express.Router();
const { body } = require('express-validator')
const { authUser } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
], userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
], userController.loginUser);

router.get('/profile', authUser, userController.getUserProfile);

router.post('/logout', authUser, userController.logoutUser)

module.exports = router;


