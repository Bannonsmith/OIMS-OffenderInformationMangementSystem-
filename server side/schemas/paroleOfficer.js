const mongoose = require('mongoose');
const Offender = require("./Offender")


const paroleOfficerSchema = new mongoose.Schema({
    officerFirstName: String,
    officerLastName: String,
    password: String,
    region: String,
    office: String,
    profilePic: String,
    offenders: [Offender.schema]
    // badgeId: Number
})



const Officer = mongoose.model("Officer", paroleOfficerSchema)

module.exports = Officer