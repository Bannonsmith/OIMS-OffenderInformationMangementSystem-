import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import * as Constants from './urls/constants';

class App extends Component {

  constructor() {
    super()

    this.state = {
      officerFN: "",
      officerLN: "",
      password: "",
      region: "",
      office: "",
      image: ""

    }

  }

  handleTextChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOfficerSave = () => {

    const url = Constants.Post_URL

    axios.post(url, {
      officerFirstName: this.state.officerFN,
      officerLastName: this.state.officerLN,
      password: this.state.password,
      region: this.state.region,
      office: this.state.office,
      profile: this.state.image
    }).then(response => {
      console.log(response.data)
    })



  }
  render() {
    return (
      <div>
        <input type= "text" name="officerFN" onChange={this.handleTextChange} placeholder="First Name"></input>
        <input type= "text" name="officerLN" onChange={this.handleTextChange} placeholder = "Last Name"></input>
        <input type= "text" name="password" onChange={this.handleTextChange} placeholder="Password"></input>
        <input type= "text" name="region" onChange={this.handleTextChange} placeholder="Region"></input>
        <input type= "text" name="office" onChange={this.handleTextChange} placeholder="Office"></input>
        <input type= "text" name="image" onChange={this.handleTextChange} placeholder= "Image"></input>
        <button onClick={this.handleOfficerSave}>Submit</button>
      </div>
    );
  }
}


export default App;
