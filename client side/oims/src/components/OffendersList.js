import React, {Component} from "react";
import axios from "axios"
import { NavLink } from "react-router-dom"



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
        offenders: [],
        updatingOffender: false,
        updateId: null
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
        .then(() => this.populateOffenders())
        
    
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
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        offenders: json
      })
    })
    .catch(error => console.log(error))
  }

  handleOffenderUpdate = (id) => {
    // this.setState({
    //   updatingOffender: true,
    //   updateId: id
    // })
    this.state.offenders.forEach((off) => {
      console.log(off)
      if(off._id == id){
        this.setState({
        badgeId: off.badgeId,
        address: off.address,
        vehicle: off.vehicle,
        employment: off.employment,
        employmentAddress: off.employmentAddress,
        updatingOffender: true,
        updateId: id
        })
      }
    })
  }

  cancelUpdate = () => {
    console.log("cancelling update")
    this.setState({
      updatingOffender: false,
      updateId: null
    })
  }

  handleUpdateSubmit = (id) => {
    console.log("handling form submission")
    let offenderId = id
    let badgeId = this.state.badgeId
    let address = this.state.address
    let vehicle = this.state.vehicle
    let employment = this.state.employment
    let employmentAddress = this.state.employmentAddress


    const url = `http://localhost:8080/updateOffender`
    axios.post(url, {
      offenderId: offenderId,
      badgeId: badgeId,
      address: address,
      vehicle: vehicle,
      employment: employment,
      employmentAddress: employmentAddress
    }).then((result) => {
      console.log(result.data)
  })
}

    render() {
        let offenders = this.state.offenders
        let OffendersList = offenders.map((offender, index) => {
          if(this.state.updatingOffender && offender._id == this.state.updateId){
            return (
              <div key="index">
                <form onSubmit = {() => this.handleUpdateSubmit(offender._id)}>
                  <li>TDCJ-ID:{offender._id}</li>
                  <input type = "hidden" readOnly value = {offender._id} onChange = {this.handleTextChange}/>
                  <label htmlFor = "officer">Officer Badge Number</label>
                  <input id = "officer"type = "text" name = "badgeId" defaultValue = {offender.badgeId} onChange = {this.handleTextChange}/>
                  <li>{offender.firstName}</li>
                  <li>{offender.lastName}</li>
                  <li>{offender.birthdate}</li>
                  <input type = "text" name = "address" defaultValue = {offender.address} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "vehicle" defaultValue = {offender.vehicle} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "employment" defaultValue = {offender.employment} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "employmentAddress" defaultValue = {offender.employmentAddress} onChange = {this.handleTextChange}/>
                  <li>{offender.criminalHistory}</li>
                  <li>{offender.victimFirstName}</li>
                  <li>{offender.victimLastName}</li>
                  <li><img src={offender.victimsImage}></img></li>
                  <li>{offender.lastDrugTest}</li>
                  <button>Submit Changes</button>
                </form>
                <button type = "button" onClick = {this.cancelUpdate}>Cancel Update</button>
              </div>
            )
          }
          else {
            return (
              <div className="name">
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
                <button><NavLink to={`/add-drugTest/${offender._id}`}>DrugTest</NavLink></button>
                <button><NavLink to={`/show-drugtest/${offender._id}`}>Show DrugTestList</NavLink></button>
                <button><NavLink to={`/add-contact/${offender._id}`}>Add Contact</NavLink></button>
                <button><NavLink to={`/show-contact/${offender._id}`}>Show Contact</NavLink></button>



                <br></br>
              </div>
            )
          }
    })
        return(
            <div className="background">
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


