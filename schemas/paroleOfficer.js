const mongoose = require('mongoose');

const paroleOfficerSchema = new mongoose.Schema({
    officer: String,
    password: String
})



const Officer = mongoose.model("Officer", paroleOfficerSchema)

module.exports = Officer