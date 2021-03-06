import React, {Component} from "react";
import axios from "axios"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import './style.css';
import {  Button, Media } from 'reactstrap';
import './generic.css';








class OffendersList extends Component {
  constructor() {
       super()


       this.state = {
        badgeId: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        image: "",
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
        image: this.state.image,
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
        image: off.image,
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
    let image = this.state.image
    let vehicle = this.state.vehicle
    let employment = this.state.employment
    let employmentAddress = this.state.employmentAddress


    const url = `http://localhost:8080/updateOffender`
    axios.post(url, {
      offenderId: offenderId,
      badgeId: badgeId,
      address: address,
      image: image,
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
                  <input type = "text" name = "image" defaultValue = {offender.image} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "address" defaultValue = {offender.address} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "vehicle" defaultValue = {offender.vehicle} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "employment" defaultValue = {offender.employment} onChange = {this.handleTextChange}/>
                  <input type = "text" name = "employmentAddress" defaultValue = {offender.employmentAddress} onChange = {this.handleTextChange}/>
                  <li>{offender.criminalHistory}</li>
                  <li>{offender.victimFirstName}</li>
                  <li>{offender.victimLastName}</li>
                  <li><img src={offender.victimsImage}></img></li>
                  <li>{offender.lastDrugTest}</li>
                  <Button>Submit Changes</Button>
                </form>
                <Button type = "button" onClick = {this.cancelUpdate}>Cancel Update</Button>
              </div>
            )
          }
          else {
            return (
              <div className="name">
                <Media>
                <Media left href="#">
                    <Media object src={offender.image} alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading>
                    <div className="mediaHeader">
                        <li>First Name: {offender.firstName} </li> <li>Last Name: {offender.lastName}</li>
                    </div>
                    </Media>
                    <div className="mediaBody">
                        <li>TDCJ-ID: {offender._id}</li>
                        <li>Criminal History: {offender.criminalHistory}</li>
                        <li>DOB: {offender.birthdate}</li>
                        <li>Officer Badge Number: {offender.badgeId}</li>
                        <li>Address: {offender.address}</li>
                        <li>Vehicle: {offender.vehicle}</li>
                        <li>Employment: {offender.employment}</li>
                        <li>Employment Address: {offender.employmentAddress}</li>
                        <li>DrugTest: {offender.lastDrugTest}</li>
                        <br></br>
                        <hr></hr>
                        <div className="victimsInfo">
                        <h5> Victims Info</h5>
                          <li><img src={offender.victimsImage} alt="Generic placeholder image" ></img></li>
                          <li>Victims First Name: {offender.victimFirstName}</li>
                          <li>Victims Last Name: {offender.victimLastName}</li>
                          <hr></hr>
                          <br></br>
                        </div>
                    </div>

                </Media>
    </Media>
                <div className="Buttons">
                  <Button onClick={() => this.handleOffenderDelete(`${offender._id}`)}><NavLink>Terminate</NavLink></Button>
                  <Button onClick={() => this.handleOffenderUpdate(`${offender._id}`)}><NavLink>Update</NavLink></Button>
                  <Button onClick={() => this.props.getUserInfo(offender)}><NavLink to={`/add-drugTest/${offender._id}`}>DrugTest</NavLink></Button>
                  <Button onClick={() => this.props.getUserInfo(offender)}><NavLink to={`/show-drugtest/${offender._id}`}>Show DrugTestList</NavLink></Button>
                  <Button onClick={() => this.props.getUserInfo(offender)}><NavLink to={`/add-contact/${offender._id}`}>Add Contact</NavLink></Button>
                  <Button onClick={() => this.props.getUserInfo(offender)}><NavLink to={`/show-contact/${offender._id}`}>Show Contact</NavLink></Button>
                </div>
                <br></br>
              </div>
            )
          }
    })
        return(
            <div className="background">
              <div className="offenderInput" >
                
                <h1>Add Offender</h1>
                <input type= "text" name="badgeId" onChange={this.handleTextChange} placeholder= "Parole Officer Badge Number"></input>
                <input type= "text" name="firstName" onChange={this.handleTextChange} placeholder="First Name"></input>
                <input type= "text" name="lastName" onChange={this.handleTextChange} placeholder = "Last Name"></input>
                <input type= "text" name="birthDate" onChange={this.handleTextChange} placeholder="Birthdate"></input>
                <input type= "text" name="image" onChange={this.handleTextChange} placeholder="Image"></input>
                <input type= "text" name="address" onChange={this.handleTextChange} placeholder="Address"></input>
                <input type= "text" name="vehicle" onChange={this.handleTextChange} placeholder="Vehicle"></input>
                <input type= "text" name="employment" onChange={this.handleTextChange} placeholder= "Employment"></input>
                <input type= "text" name="employmentAddress" onChange={this.handleTextChange} placeholder= "Employment Address"></input>
                <input type= "text" name="criminalHistory" onChange={this.handleTextChange} placeholder= "Criminal History"></input>
                <input type= "text" name="victimFirstName" onChange={this.handleTextChange} placeholder= "Victims First Name"></input>
                <input type= "text" name="victimLastName" onChange={this.handleTextChange} placeholder= "Victims Last Name"></input>
                <input type= "text" name="victimsImage" onChange={this.handleTextChange} placeholder= "Victims Image"></input>
                <input type= "text" name="lastDrugTest" onChange={this.handleTextChange} placeholder= "Last Drug Test"></input>
                <Button onClick={this.handleOffenderSave}>Submit</Button>
              </div>
              <br></br>
                <h4>Offenders</h4>  
                <hr></hr> 
                <br></br>
                <ul>{OffendersList}</ul>
            </div>
        )
    }



}

const mapDispatchToProps = (dispatch) => {
  return {
      getUserInfo: (offender) => dispatch({type: "GET_USER_INFO", value: offender})
  }
}

export default connect(null,mapDispatchToProps)(OffendersList)
