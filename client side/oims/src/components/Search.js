import React, {Component} from "react";
import axios from "axios"
import './style.css';
import {  Button, Media } from 'reactstrap';
import './generic.css';



export class Search extends Component {

constructor() {
    super()

    this.state = {
        offenderId: "",
        FName: "",
        LName: "",
        offender: []
    }


    this.handleTextChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
          })
    }
    this.handleSearchFunction = (id) => {

        if(id.length == 24) {

            const url = `http://localhost:8080/offenders/${id}`
            axios.get(url).then((result) => {
                if(result.data){
                    this.setState({
                        offender: this.state.offender.concat(result.data)
                    })
                }
                else {
                    alert("search results empty")
                }
                
            })
        } else {
            alert("Offender Id length is not valid")
        }
       
    }

}
    render() {

        let offenders = this.state.offender
        console.log(offenders)
        let OffendersList = offenders.map((offender, index) => {
          return (
              <div className="name" key = {index}>
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
    </div>
            )
        })
        return(
            <div className="background">
                <h1>Search for an offender</h1>
                <input type="text" placeholder="TDCJ-ID" name="offenderId" onChange={this.handleTextChange}></input>
                {/* <input type="text" placeholder="First Name" name="FName" onChange={this.handleTextChange} > </input>
                <input type="text" placeholder="Last Name" name="LName" onChange={this.handleTextChange} ></input> */}
                <button onClick={() => this.handleSearchFunction(this.state.offenderId)}>Search</button>
               
                <ul>{OffendersList}</ul>
            </div>
        ) 
    }
}