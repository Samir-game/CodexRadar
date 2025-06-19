const mongoose = require('mongoose');

const leetcodeProblemSchema = new mongoose.Schema({
    totalSolved:{
        type: Number,
        required: true,
        default: 0,
    },
    easySolved:{
        type: Number,
        required: true,
        default: 0,
    },

    mediumSolved:{
        type: Number,
        required: true,
        default: 0,
    },

    hardSolved:{
        type: Number,
        required: true,
        default: 0,
    },
    avgSolvedPerDay:{
        type: Object,
        required: true,
    },

}, {_id:false});

const leetcodeContestDataSchema = new mongoose.Schema({

    contestId:{
        type: String,
        required: true,
    },

    contestName:{
        type: String,
        required: true,
    },

    rank:{
        type: Number,
        required: true,
    },

    score:{
        type: Number,
        required: true,
    },

    problemsSolved:{
        type: Number,
        required: true,
    },

    timeSpent:{
        type: Number,
        required: true,
    },

    rating:{
        type: Number,
        required: true,
    },

}, { _id:false});

const leetcodeSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    problemSolved:{
        type: leetcodeProblemSchema,
        required: true,
    },

    contestHistory:{
        contestCount:{
            type: Number,
            required: true,
            default: 0,
        },

        contestData:[leetcodeContestDataSchema],
    }

},{timestamps:true});

module.exports=mongoose.model("Leetcode",leetcodeSchema);
