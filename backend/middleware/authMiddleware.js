const asyncHandler  = require("express-async-handler")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Not authorized , no token")
    }
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token  = req.headers.authorization.split(' ')[1];

            //decodes the token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password")

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
    }

})

module.exports = {protect}