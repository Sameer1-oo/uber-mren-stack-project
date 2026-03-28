const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req); 
    if ( !errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const {fullname, email, Password} = req.body;
    const hashPassword = await userModel.hashPassword('Password');
    const user = await userService.createaUser({
        fristname: fullname.fristname,
        LastName: fullname.LastName,
        email,
        password: hashPassword
    });
    const token = user.genrateAuthToken();
    res.status(201).json({token, user});
}
 module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if ( !errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const{email, Password} = req.body;
    const user = await userService.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});

    }
    const isMatch = await user.comparePassword(Password);
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or Password'});
        
    }
 }
