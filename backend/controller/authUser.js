const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")

const authUser = expressAsyncHandler( async( req,res)=>{
  
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        
     res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
   }else
   {
    res.status(401);
    throw new Error("Invalid ID or Password")
   }

})

module.exports = {authUser}