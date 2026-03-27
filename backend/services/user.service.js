const userModel = require('../models/user.model');


module.exports.createUser = async ({
    fristname, LastName, email, Password
}) => {
    if(!fristname || !LastName || !email || !Password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname:{
            fristname,
            LastName
        },
        email,
        Password
    })
    return user;
}