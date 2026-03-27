const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        fristname:{
            type: String,
            required: true,
            minlength:[3,' frist name must be three character long'],
        },
      LastName:{
            type: String,
            required: true,
            minlength:[3,' frist name must be three character long'],
        },
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5,'Email must be at least 5 charchter']
    },
    Password:{
        type:String,
        required: true,
        select: false ,
    },
    socketId:{
        type: String,
    },
    
})
 userSchema.methods.generateAuthToken = function(){
    const token =jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
 } 
 
 userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.Password);
 }
  userSchema.statics.hashPassword = async function(Password) {
    return await bcrypt.hash(Password,10);
    
  }
  const userModel = mongoose.model('User' , userSchema);
   module.exports = userModel;