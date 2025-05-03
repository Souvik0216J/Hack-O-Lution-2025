import mongoose from "mongoose";

const selectionSchema = new mongoose.Schema({
    isSelected: {
        type: String,
        default: "Pending"
    },
});

const projectSchema = new mongoose.Schema({
    isSubmit: {
        type: Boolean,
        default: false
    },
    projectLink: {
        type: String,
        default: "null",
    },
    hostedLink:{
        type: String,
        default: "null",
    }
});

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
    teamId: {
        type: String,
        require: true,
        unique: false,
    },

    teamName: {
        type: String,
        required: [true, "Please provide a team name"],
        unique: false,
    },

    teamSize: {
        type: String,
        required: [true, "Please provide a team size"],
        unique: false,
        default: "2",
    },

    leaderName: {
        type: String,
        required: [true, "Please provide a leader name"],
        unique: false,
    },

    leaderEmail: {
        type: String,
        required: [true, "Please provide a email"],
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

    members: {
        type: [memberSchema], // this stores array of member objects
        default: [],
    },

    date: {
        type: String,
        default: ""
    },

    selectionInfo:{
        type:[selectionSchema],
        default: [],
    },

    projectSubmit:{
        type:[projectSchema],
        default: [],
    },
    lastLogin:{
        type: String,
        default: ""
    }
})
// Create the model
const User = mongoose.models.userData || mongoose.model("userData", userSchema);

export default User;
