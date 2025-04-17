import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    teamName:{
        type : String,
        required: [true, "Please provide a team name"],
        unique: false,
    },

    teamSize:{
        type : Number,
        required: [true, "Please provide a team size"],
        unique: false,
        default: 2,
    },

    leaderName: {
        type : String,
        required: [true, "Please provide a leader name"],
        unique: false,
    },

    leaderEmail: {
        type: String,
        required : [true, "Please provide a email"],
        unique: true,
    },

    leaderNo: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: true,
    },

    leaderCity: {
        type: String,
        required: [true, "Please provide a city name"],
        unique: false,
    },

    leaderClgName: {
        type: String,
        required: [true, "Please provide a college name"],
        unique: false,
    },

    leaderTshirtSize: {
        type: String,
        required: [true, "Please provide a t-shirt size"],
        unique: false,
    },

    projectIDea: {
        type: String,
        required: [true, "Please provide a project idea"],
        unique: false,
    },

    isLeader: {
        type: Boolean,
        default : false,
    },
})

const User = mongoose.models.users || mongoose.model("userData", userSchema)

export default User