const express = require ('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controllers');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.fristname').islength({min: 3}).withMessage
    ('Frist name must be at least 3 characters long'),   
    body('Password').islength({min: 6}).withMessage('Password must be at least 6 charchter')
],
userController.registerUser )
module.exports = router;