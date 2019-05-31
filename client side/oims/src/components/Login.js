import React, {Component} from "react";
import axios from "axios"
import '../App.css';
import { connect } from "react-redux"
import { setAuthenticationHeader } from "../utils/authenticate"
import { NavLink } from "react-router-dom"
import {  Button } from 'reactstrap';

class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: "",
            password: "",
            type: "",
        }
    }


    handleLogin = () => {

        axios.post("http://localhost:8080/login", {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type
        }).then(response => {

            let token = response.data.token

            console.log(token)
            console.log(response.data)

            localStorage.setItem("jwt",token)

            this.props.onAuthenticated(token)
            setAuthenticationHeader(token)
            this.props.history.push("/show-officer")
        }).catch(error => console.log(error))
    }


    handleTextBoxChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
 
    render() {
        return (
            <div className="image">
                <div className="center">
                    <div className="dropdown" >
                        <h1>OIMS</h1>
                        <h6>Offender Information Mangement System</h6>

                                            <h6>Select Type</h6>

                        <select name="type" onChange={this.handleTextChange}>  
                                            <option value="value"></option>                 
                                            <option  value="Offender">Offender</option>
                                            <option  value="Parole Officer">Officer</option>
                                            <option  value="Admin">Admin</option>
                        </select>
                        <h6>Username</h6>
                        <input name = "username" onChange={this.handleTextBoxChange} placeholder="login"></input>
                        <h6>Password</h6>
                        <input type = "password" name= "password" onChange={this.handleTextBoxChange} placeholder="password"></input>
                    </div>
                    <div className="buttons">
                        <Button color ="secondary" onClick ={this.handleLogin} ><NavLink to={"/show-officer"}>Login</NavLink></Button>{' '}
                        <Button color="secondary"><NavLink to={"/registration"}>Registration</NavLink></Button>{' '}
                    </div>
                </div>
                </div>

                
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onAuthenticated: (token) => dispatch({type: "ON_AUTHENTICATED", token: token})
    }
}
export default connect(null, mapDispatchToProps)(Login)