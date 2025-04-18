import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide member name"],
    },
    email: {
      type: String,
      required: [true, "Please provide member email"],
    },
    tshirtSize: {
      type: String,
      required: [true, "Please provide t-shirt size"],
    },
  });

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
        unique: false,
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

    password: {
        type: String,
        default: "",
    },

    isLeader: {
        type: Boolean,
        default : false,
    },

    members: {
        type: [memberSchema], // this stores array of member objects
        default: [],
      },
})

const User = mongoose.models.userData || mongoose.model("userData", userSchema)

export default User