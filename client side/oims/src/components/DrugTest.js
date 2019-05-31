import React, {Component} from "react";
import axios from "axios"
import {NavLink} from "react-router-dom"
import GetUserInfo from "./GetUserInfo"
import './style.css';
import './generic.css';

import {  Button, Media } from 'reactstrap';






export class DrugTest extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.match.params.offenderId)
        this.state = {
            offenderId: this.props.match.params.offenderId,
            date: "",
            time: "",
            alcohol: "",
            amphetamines: "",
            benzodiapheine: "",
            cocaine: "",
            k2: "",
            lsd: "",
            marijuana: "",
            note: ""

            
        }
        console.log(this.state)
    }

        
        handleTextChange = (e) => {

            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleDrugTestSave = (offenderId) => {
            if (window.confirm("You are about to submit the changes")) {

                    const url = `http://localhost:8080/offenders/drugtests/${offenderId}`
                    console.log(this.state.alcohol)

                    axios.post(url, {
                        offenderId: this.state.offenderId,
                        date: this.state.date,
                        time: this.state.time,
                        alcohol: this.state.alcohol,
                        amphetamines: this.state.amphetamines,
                        benzodiapheine: this.state.benzodiapheine,
                        cocaine: this.state.cocaine,
                        k2: this.state.k2,
                        lsd: this.state.lsd,
                        marijuana: this.state.marijuana,
                        note: this.state.note
                    }).then(response => {
                    console.log(response.data)
                    }).then(alert("You have sucessfully addded a drug test"))        
                } else {
                }            
        }
    

    render(){
        return (
        <div className="backgroundDrugTest">
            <GetUserInfo />
            <h2>Drug Test</h2>
            <div className="dateandtime">
            <div className="Date">
            <h5>Date</h5>
            <input type="date" name="date" onChange={this.handleTextChange}></input>
            </div>
            <div>
            <h5 className="Time">Time</h5>
            <input type="time" name="time" onChange={this.handleTextChange}></input>
            </div>
            </div>
            <br></br><br></br>
            <div className="select">
            <h5>Alcohol</h5> 
            <select name="alcohol" onChange={this.handleTextChange}>  
                                        <option selected="selected"></option>                 
                                        <option  value="Admitted">Admitted</option>
                                        <option  value="Positive">Positive</option>
                                        <option  value="Negative">Negative</option>
            </select>
            <h5>Amphetamines</h5> 
            <select name="amphetamines" onChange={this.handleTextChange}>     
                                        <option selected="selected"></option>                 
                                        <option value="Admitted" >Admitted</option>
                                        <option value="Positive" >Positive</option>
                                        <option value="Negative" >Negative</option>
            </select>
            <h5>Benzodiapheine</h5> 
            <select name="benzodiapheine" onChange={this.handleTextChange}>
                                        <option selected="selected"></option>                 
                                        <option value="Admitted" >Admitted</option>
                                        <option value="Positive" >Positive</option>
                                        <option value="Negative" >Negative</option>
            </select>
            <h5>Cocaine</h5> 
            <select name="cocaine" onChange={this.handleTextChange}> 
                                        <option selected="selected"></option>                
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            <h5>K2</h5> 
            <select name="k2" onChange={this.handleTextChange}>                                                        
                                        <option selected="selected"></option>                 
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>            
            <h5>LSD</h5> 
            <select name="lsd" onChange={this.handleTextChange}>   
                                        <option selected="selected"></option>                 
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>            
            <h5>Marijuana</h5> 
            <select name="marijuana" onChange={this.handleTextChange}>                                         
                                        <option selected="selected"></option>                 
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            </div>
                <div className="note">
                <h3>Notes</h3>
            <textarea type="input" name="note" placeholder="Notes" onChange={this.handleTextChange}></textarea>
            <br></br>
            <NavLink to={`/show-drugtest/${this.state.offenderId}`}><Button type="button" onClick={() => this.handleDrugTestSave(this.state.offenderId)}>Submit</Button></NavLink>
            </div>

        </div>
        )
    
    }
}