import React, {Component} from "react";

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
            <div className="background">
                <h1>Parole Officers</h1>   
                <ul>{paroleOfficers}</ul>
            </div>
        )
    }
}

// const OfficersListWithRouter = withRouter(OfficersList);


export default OfficersList
