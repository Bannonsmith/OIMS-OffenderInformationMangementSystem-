const mongoose = require('mongoose');

const paroleOfficerSchema = new mongoose.Schema({
    officerFirstName: String,
    officerLastName: String,
    password: String,
    region: String,
    office: String,
    profilePic: String
    // badgeId: Number
})



const Officer = mongoose.model("Officer", paroleOfficerSchema)

module.exports = Officer