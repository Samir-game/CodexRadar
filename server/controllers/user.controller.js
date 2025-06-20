const User= require("../models/user.model.js")
const bcrypt= require("bcryptjs");
const {generateJWT}= require("../middlewares/generateJWT.js");
const {handleRatings,handleContestHistory,handleProblemSolvingData}= require("../utils/codeforces/codeforcesAPI.js")
const Codeforces= require("../models/codeforces.model.js")


const handleSignUp= async (req,res)=>{
    const {userName,userEmail,codeforcesHandle,leetcodeHandle,userPassword}= req.body;

    if(!userName || !userEmail || !codeforcesHandle || !leetcodeHandle || !userPassword){
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
            leetcodeHandle,
            userPassword:hashedPassword,
        });

        const token= generateJWT(newUser);

        const {currentRating,maxRating}=await handleRatings(codeforcesHandle);
        const contestHistory=await handleContestHistory(codeforcesHandle);
        const problemSolved=await handleProblemSolvingData(codeforcesHandle);
    
        const cfData=await Codeforces.create({
            user: newUser._id,
            codeForcesHandle: codeforcesHandle,
            currentRating,
            maxRating,
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
            leetcodeHandle,
            token,
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

        return res.status(200).json({
            msg: "Login successful",
            userId: user._id,
            userEmail: user.userEmail,
            codeforcesHandle: user.codeforcesHandle,
            leetcodeHandle: user.leetcodeHandle,
            token,
        });

    } catch (error) {
        console.log("Error logging in User",error.message);
        return res.status(500).json({
            message:"Internal server error",
        });
    }
};

module.exports={
    handleSignUp,
    handleLogin,
};
