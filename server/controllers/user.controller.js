const User= require("../models/user.model.js")
const bcrypt= require("bcryptjs");
const {generateJWT}= require("../middlewares/generateJWT.js");
const {handleRatings,handleContestHistory,handleProblemSolvingData}= require("../utils/codeforcesAPI.js")
const Codeforces= require("../models/codeforces.model.js")


const handleSignUp= async (req,res)=>{
    const {userName,userEmail,codeforcesHandle,userPassword}= req.body;

    if(!userName || !userEmail || !codeforcesHandle || !userPassword){
        return res.status(400).json({
            message:"Fill all credentials",
        });
    }

    try {
        const existingUser= await User.findOne({userEmail:userEmail});
        if(existingUser){
            return res.status(400).json({
                message:"user already exists with this email",
            });
        }

        const saltRounds= 10;
        const hashedPassword= await bcrypt.hash(userPassword,saltRounds);

        const newUser= await User.create({
            userName,
            userEmail,
            codeforcesHandle,
            userPassword:hashedPassword,
        });

        const token= generateJWT(newUser);
        res.cookie("token",token,{
            httpOnly: true, 
            sameSite: "Strict", 
            maxAge: 2*24*60*60*1000
        });

        const {titlePhoto,currentRank,maxRank,currentRating,maxRating}=await handleRatings(codeforcesHandle);
        const contestHistory=await handleContestHistory(codeforcesHandle);
        const problemSolved=await handleProblemSolvingData(codeforcesHandle);
    
        const cfData=await Codeforces.create({
            user: newUser._id,
            codeForcesHandle: codeforcesHandle,
            currentRating,
            maxRating,
            maxRank,
            currentRank,
            titlePhoto,
            contestHistory,
            problemSolved,
            lastSyncedAt: new Date(),
        });

        return res.status(201).json({
            message: "User Registered",
            userId: newUser._id,
            userName,
            userEmail,
            codeforcesHandle,
            codeforcesId: cfData._id,
        });

    } catch (error) {
        console.log("Error registering user", error.message);
        return res.status(500).json({
            message:"Internal server error",
        });
    }
};

const handleLogin= async(req,res)=>{
    const {userEmail,userPassword}= req.body;

    if(!userEmail || !userPassword){
        return res.status(400).json({
            message:"Fill all credentials",
        });
    }

    try {
        const user= await User.findOne({userEmail:userEmail});
        if(!user){
            return res.status(404).json({
                message:"user not found",
            });
        }

        const isValid= await bcrypt.compare(userPassword,user.userPassword);
        if(!isValid){
            return res.status(400).json({
                message:"Incorrect password",
            });
        }

        const token= generateJWT(user);
        res.cookie("token",token,{
            httpOnly: true,              
            sameSite: "Strict", 
            maxAge: 2*24*60*60*1000
        });

        return res.status(200).json({
            msg: "Login successful",
            userId: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            codeforcesHandle: user.codeforcesHandle,
        });

    } catch (error) {
        console.log("Error logging in User",error.message);
        return res.status(500).json({
            message:"Internal server error",
        });
    }
};

const handleLogout= async(req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
    });

    return res.status(200).json({
        message:"User logout Successfully"
    });
};

const handleDeleteUser= async(req,res)=>{
    const userId=req.user._id;
    try {
        await User.findByIdAndDelete(userId);
        await Codeforces.findByIdAndDelete({user:userId});

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
        });

        return res.status(200).json({
            message:"User deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting User",error.message);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}


module.exports={
    handleSignUp,
    handleLogin,
    handleLogout,
    handleDeleteUser
};
