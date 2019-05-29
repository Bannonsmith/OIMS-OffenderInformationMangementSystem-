import React, { Component } from 'react';
import '../App.css';
import axios from "axios"
import * as Constants from '../urls/constants';


class OfficersList extends Component {
    constructor() {
        super()
    
        this.state = {
          officerFN: "",
          officerLN: "",
          password: "",
          region: "",
          office: "",
          image: "",
          officers:[]
    
        }
    
      }

      componentDidMount() {
        this.populateParoleOfficers()
      }

      populateParoleOfficers = () => {
        fetch("http://localhost:8080/paroleOfficers")
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            officers: json
          })
        }) 
      }


    handleOfficerDelete = (officerId) => {

        console.log(officerId)
        const url = `http://localhost:8080/paroleOfficers/${officerId}`
    
        fetch(url,{
          method: 'DELETE'
        })
        .then(() => this.populateParoleOfficers())
        
    
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
        .then(() => this.props.history.push('/show-officer'))
        
    
      }

    render() {

        let officers = this.state.officers
        console.log(officers)
        let paroleOfficers = officers.map((officer, index) => {
          return (
            <div className="name" index="key">
              <li>BadgeId:{officer._id}</li>
              <li>{officer.officerFirstName}</li>
              <li>{officer.officerLastName}</li>
              <li>{officer.region}</li>
              <li>{officer.office}</li>
              <li><img src={officer.profilePic}></img></li>
              <button onClick={() => this.handleOfficerDelete(`${officer._id}`)}>Terminate</button>
              <button onClick={() => this.handleOfficerUpdate(`${officer._id}`)}>Update</button>
            </div>
      )
    })
        return (
              <div class="background">
            <h1>Add Parole Officer</h1>
            <input type= "text" name="officerFN" onChange={this.handleTextChange} placeholder="First Name"></input>
            <input type= "text" name="officerLN" onChange={this.handleTextChange} placeholder = "Last Name"></input>
            <input type= "text" name="password" onChange={this.handleTextChange} placeholder="Password"></input>
            <input type= "text" name="region" onChange={this.handleTextChange} placeholder="Region"></input>
            <input type= "text" name="office" onChange={this.handleTextChange} placeholder="Office"></input>
            <input type= "text" name="image" onChange={this.handleTextChange} placeholder= "Image"></input>
            <button onClick={this.handleOfficerSave}>Submit</button>

            <br></br><br></br>
      
                <h1>Parole Officers</h1>   
                <ul>{paroleOfficers}</ul>
            </div>
        )
    }
}

// const OfficersListWithRouter = withRouter(OfficersList);


export default OfficersList
