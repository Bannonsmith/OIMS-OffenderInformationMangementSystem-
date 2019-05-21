const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const drugTestSchema =   mongoose.Schema({
    date: String,
    alcohol: Boolean,
    amphetamines: Boolean,
    benzodiapheine: Boolean,
    cocaine: Boolean,
    k2: Boolean,
    lsd: Boolean,
    marijuana: Boolean,
    Note: String,
    offenderId: ObjectId

})

const drugTest = mongoose.model("drugTest", drugTestSchema)

module.exports = drugTest