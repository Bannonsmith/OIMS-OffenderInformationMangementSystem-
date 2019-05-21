const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const drugTestSchema =   mongoose.Schema({
    date: String,
    alcohol: String,
    amphetamines: String,
    benzodiapheine: String,
    cocaine: String,
    k2: String,
    lsd: String,
    marijuana: String,
    note: String,
    offenderId: ObjectId

})

const drugTest = mongoose.model("drugTest", drugTestSchema)

module.exports = drugTest