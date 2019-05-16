

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const offenderSchema =   mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: String,
    address: String,
    vehicle: String,
    employment: String,
    employmentAddress: String,
    criminalHistory: String,
    victimFirstName: String,
    victimLastName: String,
    victimsImage: String,
    medical: String,
    lastDrugTest: String,
    badgeId: ObjectId

    
    
})

const Offender = mongoose.model("Offender", offenderSchema)

module.exports = Offender