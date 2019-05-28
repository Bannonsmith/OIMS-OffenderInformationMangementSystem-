const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const contactSchema =   mongoose.Schema({
    date: String,
    time: String,
    who: String,
    whatkind: String,
    where: String,
    marijuana: String,
    summary: String,
    mood: String,
    employment: String,
    residence: String,
    fees: String,
    drugFree: String,

})

const contact = mongoose.model("contact", contactSchema)

module.exports = contact