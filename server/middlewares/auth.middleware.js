const jwt= require("jsonwebtoken");
const User= require("../models/user.model.js");

const auth= async (req,res,next)=>{
    try {
        const authHeader = req.headers?.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: "No token found. Please login first"
            });
        }

        const token= authHeader.split(" ")[1];
        const decoded= jwt.verify(token,process.env.JWT_TOKEN_SECRET);

        const user= await User.findById(decoded._id);
        if(!user){
            return res.status(404).json({
                message: "user not found, invalid token"
            });
        }

        req.user= user;
        next();

    } catch (error) {
        console.log("Error verifying JWT:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token. Please log in again."
        });
    }
};

module.exports={
    auth
};
