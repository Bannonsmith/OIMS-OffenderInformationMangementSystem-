


const Officer = require("./schemas/paroleOfficer")
const Offender = require("./schemas/Offender")
const drugTest = require("./schemas/drugTest")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")



app.use(cors())
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/parolesDB', 
{useNewUrlParser: true}, (error) => {
    if(!error) {
        console.log("Connected to the MongoDb database!")
    }
})

app.get('/paroleOfficers/:badgeId',(req,res) => {

    const badgeId = req.params.badgeId

    Officer.findById(badgeId, (error,officer) => {
        if (error) {
            res.status(500).json({message: "Unable to find officer!"})
        } else {
            res.json(officer)
        }
    })
})

app.get('/offenders/:offenderId',(req,res) => {

    const offenderId = req.params.offenderId
    console.log(offenderId)
    Offender.findById(offenderId, (error,offender) => {
        if (error) {
            console.log(error)
            res.status(500).json({message: "Something went wrong with the search!"})
        } else if (offender!= null)  { 
            res.json(offender)
        }
        else {
            res.json(null)
        }
    })
})

app.post("/paroleOfficers/add-offender2", (req,res) => {

    let badgeId = req.body.badgeId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let birthDate = req.body.birthDate
    let address = req.body.address
    let vehicle = req.body.vehicle
    let employment = req.body.employment
    let employmentAddress = req.body.employmentAddress
    let criminalHistory = req.body.criminalHistory
    let victimFirstName = req.body.victimFirstName
    let victimLastName = req.body.victimLastName
    let victimsImage = req.body.victimsImage
    let medical = req.body.medical
    let lastDrugTest = req.body.lastDrugTest

    const offender = new Offender({

        badgeId: badgeId,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        address: address,
        vehicle: vehicle,
        employment: employment,
        employmentAddress: employmentAddress,
        criminalHistory: criminalHistory,
        victimFirstName: victimFirstName,
        victimLastName: victimLastName,
        victimsImage: victimsImage,
        medical: medical,
        lastDrugTest: lastDrugTest
    })

    offender.save((error,newOffender) => {
        if(error) {
            res.status(500).json({message: "Offender has not been saved"})
        } else {
            res.json({message: "Offender has  been saved"})
        }
    })
})

// app.post("/paroleOfficers/add-offender", (req,res) => {

//     let badgeId = req.body.badgeId
//     let firstName = req.body.firstName
//     let lastName = req.body.lastName
//     let birthDate = req.body.birthDate
//     let address = req.body.address
//     let vehicle = req.body.vehicle
//     let employment = req.body.employment
//     let employmentAddress = req.body.employmentAddress
//     let criminalHistory = req.body.criminalHistory
//     let victimFirstName = req.body.victimFirstName
//     let victimLastName = req.body.victimLastName
//     let victimsImage = req.body.victimsImage
//     let medical = req.body.medical
//     let lastDrugTest = req.body.lastDrugTest

//     const offender = new Offender({
//         badgeId: badgeId,
//         firstName: firstName,
//         lastName: lastName,
//         birthDate: birthDate,
//         address: address,
//         vehicle: vehicle,
//         employment: employment,
//         employmentAddress: employmentAddress,
//         criminalHistory: criminalHistory,
//         victimFirstName: victimFirstName,
//         victimLastName: victimLastName,
//         victimsImage: victimsImage,
//         medical: medical,
//         lastDrugTest: lastDrugTest

//     })

//     Officer.findOne({ _id: badgeId}, (error,officer) => {

//         if(error) {
//             res.send(500).json({message: "Offender does not exist"})
//         } else {
//             officer.offenders.push(offender)

//             officer.save().then(savedOfficer => {
//                 if(savedOfficer) {
//                     res.json({message: "officer has been saved"})
//                 } else {
//                     res.json({message: "officer has not been saved"})
//                 }
//             })
//         }
//     })

// })

app.get("/drugtest/:offenderId", (req,res) => {

    let offenderId = req.params.badgeId

        drugTest.find({_id: offenderId}, (test) => {
            res.json(test)

        })
    
})

app.get("/paroleOfficers", (req,res) => {
    
    Officer.find({},(error, paroleOfficers) => {
        res.json(paroleOfficers)
    })
})

app.get("/offenders", (req,res) => {

    Offender.find({}, (error, listOfOffenders) => {
        res.json(listOfOffenders)
    })
})

app.delete("/paroleOfficers/:badgeId", (req,res) => {

    const badgeId = req.params.badgeId

    Officer.remove({_id: badgeId}, (err,result) => {
        res.json(result)
    })

})

app.delete("/offenders/:offenderId", (req,res) => {

    const offenderId = req.params.offenderId
    Offender.remove({_id: offenderId}, (err,result) => {
        res.json(result)
    })

})

// update an officer
app.put("/paroleOfficers", (req,res) => {

    let badgeId = req.body.badgeId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let birthDate = req.body.birthDate
    let address = req.body.address
    let vehicle = req.body.vehicle
    let employment = req.body.employment
    let employmentAddress = req.body.employmentAddress
    let criminalHistory = req.body.criminalHistory
    let victimFirstName = req.body.victimFirstName
    let victimLastName = req.body.victimLastName
    let victimsImage = req.body.victimsImage
    let medical = req.body.medical
    let lastDrugTest = req.body.lastDrugTest

    const updatedOffender = {
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

app.get("/paroleOfficers/:badgeId", (req, res) => {

    const badgeId = req.params.badgeId

    Officer.findById(badgeId, (error,officer) => {

        Offender.find({badgeId: officer.id}, (err,comments) => {
            officer.offenders = offenders
            res.json(offenders)
        })
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


app.post("/updateOffender", (req,res) => {
    console.log(req.body)
    let offenderId = req.body.offenderId
    let badgeId = req.body.badgeId
    let address = req.body.address
    let vehicle = req.body.vehicle
    let employment = req.body.employment
    let employmentAddress = req.body.employmentAddress

    const updatedOffender = {
        badgeId: badgeId,
        address: address,
        vehicle: vehicle,
        employment: employment,
        employmentAddress: employmentAddress
    }

    // find the officer and update information
    Offender.findOneAndUpdate({_id: offenderId},updatedOffender, (error,result) => {
        console.log("which one is up",result)
        res.json(result)
    })

})

app.post("/add-drugTest/:offenderId", (req,res) => {
    
    let offenderId = req.params.offenderId
    let date= req.body.date
    let alcohol = req.body.alcohol
    let amphetamines = req.body.amphetamines
    let benzodiapheine = req.body.benzodiapheine
    let cocaine = req.body.cocaine
    let k2 = req.body.k2
    let lsd = req.body.lsd
    let marijuana = req.body.marijuana
    let note = req.body.note
    
    console.log(offenderId)

    let test = new drugTest({

            date: date,
            alcohol: alcohol,
            amphetamines: amphetamines,
            benzodiapheine: benzodiapheine,
            cocaine: cocaine,
            k2: k2,
            lsd: lsd,
            marijuana: marijuana,
            note: note
    })

    Offender.find({_id: offenderId}, (offender) => {
        console.log(offenderId)
        console.log("tough")
        console.log(offender)
      test.save((error) => {
        console.log(offender)

            if(error) {
                res.json({message: "Unable to save drug test"})
            } else {
                
                res.json({sucess: true, message: "drug test has been added successfully"})
            }
        })
    })
})




app.listen(8080, () => {
    console.log("Server is running....")
})


// const badgeId = req.params.badgeId

// Officer.findById(badgeId, (error,officer) => {

//     Offender.find({badgeId: officer.id}, (err,comments) => {
//         officer.offenders = offenders
//         res.json(offenders)
//     })
// })