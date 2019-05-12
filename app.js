


const Officer = require("./schemas/paroleOfficer")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parolesDB', 
{useNewUrlParser: true}, (error) => {
    if(!error) {
        console.log("Connected to the MongoDb database!")
    }
});


app.get("/paroleOfficers", (req,res) => {
    
    Officer.find({},(error, paroleOfficers) => {
        res.json(paroleOfficers)
    })
})

app.delete("/paroleOfficers/:badgeId", (req,res) => {

    const badgeId = req.params.badgeId

    Officer.remove({_id: badgeId}, (err,result) => {
        res.json(result)
    })

})

// update an officer
app.put("/paroleOfficers", (req,res) => {

    const badgeId = req.body.badgeId
    const officerFN = req.body.officerFirstName
    const officerLN = req.body.officerLastName
    const password = req.body.password
    const region = req.body.region
    const office = req.body.office
    const profilePic = req.body.profile

    const updatedOfficer = {
        officerFirstName: officerFN,
        officerLastName: officerLN,
        password: password,
        region: region,
        office: office,
        profilePic: profilePic
    }

    // find the officer and update information
    Officer.findOneAndUpdate({_id: badgeId},updatedOfficer, (error,result) => {
        console.log(result)
        res.json(result)
    })

})

app.get('/paroleOfficers/:badgeId', (req,res) => {

    const badgeId = req.params.badgeId

    Officer.findById(badgeId,(error,officer) => {
        
        if(!error) {
            res.json(officer)
        } else {
            res.json({message: "BadgeId was not found"})
        }
    })
})


app.post("/paroleOfficers", (req,res) => {

    const officerFN = req.body.officerFirstName
    const officerLN = req.body.officerLastName
    const password = req.body.password
    const region = req.body.region
    const office = req.body.office
    const profilePic = req.body.profile

    let officer = new Officer({
        officerFirstName: officerFN,
        officerLastName: officerLN,
        password: password,
        region: region,
        office: office,
        profilePic: profilePic
    })
    
    officer.save((error) => {
       if(error) {
           res.json({message: "Unable to save officer"})
       } else {
            res.json({sucess: true, message: "Officer has been added successfully"})
       }
    })

})




app.listen(8080, () => {
    console.log("Server is running....")
})