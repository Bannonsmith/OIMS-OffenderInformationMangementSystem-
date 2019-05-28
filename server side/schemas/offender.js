

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const drugTest = require("./drugTest")
const contact = require("./contact")



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
    badgeId: ObjectId,
    drugTest:[drugTest.schema],
    contact:[contact.schema]

    
    
})

const Offender = mongoose.model("Offender", offenderSchema)

module.exports = Offender