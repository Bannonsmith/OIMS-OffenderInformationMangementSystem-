import React, { Component } from 'react';
// import './generic.css';
import axios from "axios"
import * as Constants from '../urls/constants';
import {  Button, Media } from 'reactstrap';
import './style.css';
import './generic.css';
import { NavLink } from "react-router-dom"







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
            <div className="GetUserInfoOfficers">
               

               <Media>
               <Media left href="#">
                   <Media object src={officer.profilePic} alt="Generic placeholder image" />
               </Media>
               <Media body>
                   <Media heading>
                   <div className="mediaHeader">
                       <li><h5>First Name:<b>{officer.officerFirstName}</b></h5></li> <li><h5>Last Name: <b> {officer.officerLastName}</b></h5></li>
                   </div>
                   </Media>
                   <div className="mediaBody">
                       <li>TDCJ-ID:{officer._id}</li>
                       <li>Region:{officer.region}</li>
                       <li>Office:{officer.office}</li>
                    <Button onClick={() => this.handleOfficerDelete(`${officer._id}`)}>Terminate</Button>
                   </div>

              {/* <Button onClick={() => this.handleOfficerUpdate(`${officer._id}`)}>Update</Button> */}
               </Media>
              </Media>
           </div>
      


          )})
        return (
              <div className="backgroundOfficers">
            <div className="inputandbutton">
            <h5>Add Parole Officer</h5>
            <input type= "text" name="officerFN" onChange={this.handleTextChange} placeholder="First Name"></input>
            <input type= "text" name="officerLN" onChange={this.handleTextChange} placeholder = "Last Name"></input>
            <input type= "text" name="password" onChange={this.handleTextChange} placeholder="Password"></input>
            <input type= "text" name="region" onChange={this.handleTextChange} placeholder="Region"></input>
            <input type= "text" name="office" onChange={this.handleTextChange} placeholder="Office"></input>
            <input type= "text" name="image" onChange={this.handleTextChange} placeholder= "Image"></input>
            <NavLink to={"/show-officer"}><Button onClick={this.handleOfficerSave}>Submit</Button></NavLink>
            <hr></hr>
            </div>      

            <br></br><br></br>
      
                <h4>Parole Officers</h4>   
                <br></br><br></br>
                <ul>{paroleOfficers}</ul>
            </div>
        )
    }
}

// const OfficersListWithRouter = withRouter(OfficersList);


export default OfficersList
