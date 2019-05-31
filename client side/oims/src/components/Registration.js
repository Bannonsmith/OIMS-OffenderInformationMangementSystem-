import React, { Component } from 'react';
import axios from "axios"
import { NavLink } from "react-router-dom"
import {  Button } from 'reactstrap';




export class Registration extends Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: "",
            email: "",
            type: ""
        }
    }


    handleRegistration = () => {

        axios.post("http://localhost:8080/registration", {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type,
            email: this.state.email
        }).then(response => {
            console.log(response.data)
            }).then(alert("You have sucessfully addded a new user")) 
    }


    handleTextBoxChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
 
    render() {
        return (
            <div className="center">
                <div className="dropdown">
                    <h6>Select Type</h6>
                    <select name="type" onChange={this.handleTextChange}>  
                                        <option value="selected"></option>                 
                                        <option  value="Offender">Offender</option>
                                        <option  value="Parole Officer">Officer</option>
                                        <option  value="Admin">Admin</option>
            </select>
                    <h6>Username</h6>
                    <input name = "username" onChange={this.handleTextBoxChange} placeholder="login"></input>
                    <h6>Password</h6>
                    <input type = "password" name= "password" onChange={this.handleTextBoxChange} placeholder="password"></input>
                    <h6>Email</h6>
                    <input type = "email" name= "email" onChange={this.handleTextBoxChange} placeholder="email"></input>
            </div>

                <div className="buttons">
                    <Button onClick ={this.handleRegistration}>Submit</Button>
                    <Button><NavLink to={"/"}>Cancel</NavLink></Button>
                </div>
            </div>
            )
    }


}