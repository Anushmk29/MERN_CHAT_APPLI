const asyncHandler  = require("express-async-handler")
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")


const registerUser = asyncHandler(async(req,res)=>{
const {name,email,password} = req.body;

 if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields")
 }
    
   const userExists = await User.findOne({email})

   if (userExists) {
    res.status(400);
    throw new Error('user already exists')
   }

   const user = User.create({
    name,
    email,
    password
   });

   if (user) {
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
   }else
   {
    res.status(400);
    throw new Error("Failed to create the user")
   }

})

module.exports = {registerUser};