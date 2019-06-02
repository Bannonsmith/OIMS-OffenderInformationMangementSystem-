import React, {Component} from "react";
import axios from "axios"
import GetUserInfo from "./GetUserInfo"
import './generic.css';
import './style.css';
import {  Button } from 'reactstrap';
import { NavLink } from "react-router-dom"







export class Contact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offenderId: this.props.match.params.offenderId,
            date: "",
            time: "",
            who: "",
            whatKind: "",
            where: "",
            summary: "",
            mood: "",
            employment: "",
            residence: "",
            fees: "",
            drugFree: ""
            
        }
    }
    handleTextChange = (e) => {

        if(e.target.value === "Other") {
            alert("Make sure you specify who the other is inside of the comment sections")
         } else {

            this.setState({
             [e.target.name]: e.target.value
            })
        }   
    }
 

    handleContactSave = (offenderId) => {
        if (window.confirm("You are about to submit the changes")) {
                const url = `http://localhost:8080/contacts/${offenderId}`

                axios.post(url, {
                    offenderId: this.state.offenderId,
                    date: this.state.date,
                    time: this.state.time,
                    who: this.state.who,
                    whatKind: this.state.whatKind,
                    where: this.state.where,
                    summary: this.state.summary,
                    mood: this.state.mood,
                    employment: this.state.employment,
                    residence: this.state.residence,
                    fees: this.state.fees,
                    drugFree: this.state.drugFree

                }).then(response => {
                console.log(response.data)
                }).then(alert("You have sucessfully addded a contact item"))        
        } else {
        }
    }


    render(){
        return (
            <div className="backgroundDrugTest">

                <GetUserInfo />
                <div className="info">
                <h5>Date</h5><input type="date" name="date" onChange={this.handleTextChange}></input>
                <h5>Time</h5><input type="time" name="time" onChange={this.handleTextChange}></input>
                </div>
                <br></br>
                <div className="info">
                <h5>Contact with</h5> 
                <select name="who" onChange={this.handleTextChange}>  
                                            <option selected="selected"></option>                 
                                            <option  value="Offender">Offender</option>
                                            <option  value="Parole Officer">Parole Officer</option>
                                            <option  value="Other">Other</option>
                </select>
            
                <h5>whatKind</h5> 
                <select name="whatKind" onChange={this.handleTextChange}>     
                                            <option selected="selected"></option>                 
                                            <option value="InPerson" >Face to Face</option>
                                            <option value="Electronic" >Electronic</option>
                                            <option value="Written" >Written</option>
                </select>
                <h5>where</h5> 
                <select name="where" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="Office" >Office</option>
                                            <option value="Home" >Home</option>
                                            <option value="Employment" >Employment</option>
                                            <option value="Other" >Other</option>
            
                </select><br></br></div>
                <h5>Summary</h5> 

                <input className="summary" type="textarea" name="summary" onChange={this.handleTextChange}></input>
                <div className="check">
                <h5>Mood</h5> 
                <select name="mood" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="Calm" >Calm</option>
                                            <option value="Angry" >Angry</option>
                                            <option value="Sad" >Sad</option>
                                            <option value="Upset" >Upset</option>
                                            <option value="Other" >Upset</option>

            
                </select><br></br>
                <h5>Employment</h5> 
                <select name="employment" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="Employed" >EatShit</option>
                                            <option value="Unemployed" >Unemployed</option>
                                          

                            
                </select><br></br>
                <h5>Residence</h5> 
                <select name="residence" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="House" >House</option>
                                            <option value="Apartment" >Apartment</option>
                                            <option value="Shelter" >Shelter</option>
                                            <option value="Treatment Facility" >Treatment Facility</option>
                                            <option value="Hospital" >Hospital</option>
                                            <option value="Other" >Hospital</option>

                            
                </select><br></br>
                <h5>Fees</h5> 
                <select name="fees" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="Paid" >Paid</option>
                                            <option value="Unpaid" >Unpaid</option>

                </select><br></br>
                <h5>Substance Abuse</h5> 
                <select name="drugFree" onChange={this.handleTextChange}>
                                            <option selected="selected"></option>                 
                                            <option value="Appears Drug Free" >Appears Drug Free</option>
                                            <option value="Previously Used" >Previously Used</option>
                                            <option value="Currently High" >Currently High</option>


                </select><br></br>
                </div>


                <NavLink to={`/show-contact/${this.state.offenderId}`}><Button type="submit" onClick={() => this.handleContactSave(this.state.offenderId)}>Submit</Button></NavLink>
            </div>
        )
    }
}
