import React, {Component} from "react";
import axios from "axios"
import { connect } from "react-redux"
import { setAuthenticationHeader } from "../utils/authenticate"

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
        }).catch(error => console.log(error))
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
                    <button onClick ={this.handleLogin}>Login</button>
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