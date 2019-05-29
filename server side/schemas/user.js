const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String

})



const Users = mongoose.model("Users", usersSchema)

module.exports = Users