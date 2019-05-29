const mongoose = require("mongoose")
const Schema = mongoose.Schema

const contactSchema =   mongoose.Schema({
    date: Date,
    time: String,
    who: String,
    whatKind: String,
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