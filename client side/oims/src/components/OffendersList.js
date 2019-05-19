import React, {Component} from "react";
import axios from "axios"



export class OffendersList extends Component {
    constructor() {
       super()


       this.state = {
        badgeId: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        address: "",
        vehicle: "",
        employment: "",
        employmentAddress: "",
        criminalHistory: "",
        victimFirstName: "",
        victimLastName: "",
        victimsImage: "",
        lastDrugTest: "",
        offenders: []
       }
    }

    handleTextChange = (e) => {

        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleOffenderDelete = (offenderId) => {

        console.log(offenderId)
        const url = `http://localhost:8080/offenders/${offenderId}`
    
        fetch(url,{
          method: 'DELETE'
        })
        .then()
        
    
      }


  handleOffenderSave = () => {

    const url = "http://localhost:8080/paroleOfficers/add-offender2"

    axios.post(url, {
         badgeId: this.state.badgeId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthDate: this.state.birthDate,
        address: this.state.address,
        vehicle: this.state.vehicle,
        employment: this.state.employment,
        employmentAddress: this.state.employmentAddress,
        criminalHistory: this.state.criminalHistory,
        victimFirstName: this.state.victimFirstName,
        victimLastName: this.state.victimLastName,
        victimsImage: this.state.victimsImage,
        lastDrugTest: this.state.lastDrugTest
    }).then(response => {
      console.log(response.data)
    }).then(alert("You have sucessfully addded a offender")).then(() => this.populateOffenders())

  }

  componentDidMount() {
    this.populateOffenders()
  }

  populateOffenders = () => {
    fetch("http://localhost:8080/offenders")
    .then(response => response.json())
    .then(json => {
      this.setState({
        offenders: json
      })
    }) 
  }

    render() {

        let offenders = this.state.offenders
        console.log(offenders)
        let OffendersList = offenders.map((offender) => {
          return (
            <div class="name">
              <li>TDCJ-ID:{offender._id}</li>
              <li>Officer Badge Number:{offender.badgeId}</li>
              <li>{offender.firstName}</li>
              <li>{offender.lastName}</li>
              <li>{offender.birthdate}</li>
              <li>{offender.address}</li>
              <li>{offender.vehicle}</li>
              <li>{offender.employment}</li>
              <li>{offender.employmentAddress}</li>
              <li>{offender.criminalHistory}</li>
              <li>{offender.victimFirstName}</li>
              <li>{offender.victimLastName}</li>
              <li><img src={offender.victimsImage}></img></li>
              <li>{offender.lastDrugTest}</li>
              <button onClick={() => this.handleOffenderDelete(`${offender._id}`)}>Terminate</button>
              <button onClick={() => this.handleOffenderUpdate(`${offender._id}`)}>Update</button>
              <br></br>
            </div>
      )
    })
        return(
            <div class="background">
                <h1>Add Offender</h1>
                <input type= "text" name="badgeId" onChange={this.handleTextChange} placeholder= "Parole Officer Badge Number"></input>
                <input type= "text" name="firstName" onChange={this.handleTextChange} placeholder="First Name"></input>
                <input type= "text" name="lastName" onChange={this.handleTextChange} placeholder = "Last Name"></input>
                <input type= "text" name="birthDate" onChange={this.handleTextChange} placeholder="Birthdate"></input>
                <input type= "text" name="address" onChange={this.handleTextChange} placeholder="Address"></input>
                <input type= "text" name="vehicle" onChange={this.handleTextChange} placeholder="Vehicle"></input>
                <input type= "text" name="employment" onChange={this.handleTextChange} placeholder= "Employment"></input>
                <input type= "text" name="employmentAddress" onChange={this.handleTextChange} placeholder= "Employment Address"></input>
                <input type= "text" name="criminalHistory" onChange={this.handleTextChange} placeholder= "Criminal History"></input>
                <input type= "text" name="victimFirstName" onChange={this.handleTextChange} placeholder= "Victims First Name"></input>
                <input type= "text" name="victimLastName" onChange={this.handleTextChange} placeholder= "Victims Last Name"></input>
                <input type= "text" name="victimsImage" onChange={this.handleTextChange} placeholder= "Victims Image"></input>
                <input type= "text" name="lastDrugTest" onChange={this.handleTextChange} placeholder= "Last Drug Test"></input>
                <button onClick={this.handleOffenderSave}>Submit</button>

                <ul>{OffendersList}</ul>
            </div>
        )
    }

}


