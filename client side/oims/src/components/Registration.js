import React, { Component } from 'react';
import axios from "axios"
import { NavLink } from "react-router-dom"




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
                <div>
                    <select name="type" onChange={this.handleTextChange}>  
                                        <option selected="selected"></option>                 
                                        <option  value="Offender">Offender</option>
                                        <option  value="Parole Officer">Officer</option>
                                        <option  value="Admin">Admin</option>
            </select>
                    <input name = "username" onChange={this.handleTextBoxChange} placeholder="login"></input>
                    <input type = "password" name= "password" onChange={this.handleTextBoxChange} placeholder="password"></input>
                    <input type = "email" name= "email" onChange={this.handleTextBoxChange} placeholder="email"></input>

                    <button onClick ={this.handleRegistration}>Submit</button>
                    <button><NavLink to={"/"}>Cancel</NavLink></button>

                </div>
            )
    }


}