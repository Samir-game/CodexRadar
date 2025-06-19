const mongoose= require('mongoose');

const ratingGraphSchema=new mongoose.Schema({
    timestamp:{
        type: Date,
        required: true,
    },

    rating:{
        type: Number,
        required: true,
    },

}, {_id:false});

const contestDataSchema=new mongoose.Schema({
    contestId:{
        type: Number,
        required: true,
    },

    contestName:{
        type: String,
        required: true,
    },

    newRating:{
        type: Number,
        required: true,
    },

    oldRating:{
        type: Number,
        required: true,
    },

    rank:{
        type: Number,
        required: true,
    },

    ratingChange:{
        type: Number,
        required: true,
    },

    unsolved:{
        type: Number,
        required: true,
    }
}, {_id:false});

const problemSchema=new mongoose.Schema({
    totalSolved:{
        type: Number,
        default: 0,
    },

    higestRatingSolved:{
        type: Number,
        default: 0,
    },

    averageRating:{
        type: String,
        default: '0',
    },

    ratingBucket:{
        type:Object
    },

    solvedPerday:{
        type:Object
    },

}, {_id:false});

const codeforcesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    currentRating:{
        type: Number,
        default: 0,
    },

    maxRating:{
        type: Number,
        default: 0,
    },

    problemSolved: problemSchema,

    contestHistory:{
        contestCount: { 
            type: Number, 
            default: 0 
        },
        contestData: [contestDataSchema],
        ratingGraph: [ratingGraphSchema],
  }

},{timestamps:true});

module.exports = mongoose.model("Codeforces", codeforcesSchema);
