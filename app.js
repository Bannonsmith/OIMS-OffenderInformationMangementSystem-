const Officer = require("./schemas/paroleOfficer")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parolesDB', 
{useNewUrlParser: true}, (error) => {
    if(!error) {
        console.log("Connected to the MongoDb database!")
    }
});



let officer = new Officer({
    officer: 'Smith, Bannon',
    password: "password"
})

officer.save((result) => {
    console.log(result)
})