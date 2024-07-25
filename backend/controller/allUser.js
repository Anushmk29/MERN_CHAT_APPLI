const asyncHandler  = require("express-async-handler")
const User = require("../models/userModel");

// /api/user?search
const allUser = asyncHandler(async(req,res)=>{
   const keyword =  req.query.search ? {
    $or:[
        {name: {$regex: req.query.search, $options:"i"}},
        {email: {$regex: req.query.search, $options:"i"}},
    ]
   }
   :{}; 
// to do nothing ,kind of a else statement
   
    const users =await User.find(keyword)
    .find({_id:{$ne :req.user._id}})
    res.send(users)


});
module.exports = {allUser}