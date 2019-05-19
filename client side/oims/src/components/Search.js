import React, {Component} from "react";
import axios from "axios"



export class Search extends Component {

constructor() {
    super()

    this.state = {
        offenderId: "",
        FName: "",
        LName: "",
        offender: []
    }


    this.handleTextChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
          })
    }
    this.handleSearchFunction = (id) => {

        const url = `http://localhost:8080/offenders/${id}`
        axios.get(url).then((result) => {
            this.setState({
                offender: this.state.offender.concat(result.data)
            })
        })
       
    }

}
    render() {

        let offenders = this.state.offender
        console.log(offenders)
        let OffendersList = offenders.map((offender) => {
          return (
              <div class="name">
                <h1>Your search results </h1>
                <li>TDCJ-ID:{offender._id}</li>
                <li>Officer Badge Number:{offender.badgeId}</li>
                <li>{offender.firstName}</li>
                <li>{offender.lastName}</li>
                <li>{offender.birthdate}</li>
                <li>{offender.address}</li>
                <li>{offender.vehicle}</li>
                <li>{offender.employment}</li>
                <li>{offender.employmentAddress}</li>
                <li>{offender.criminalHistory}</li>
                <li>{offender.victimFirstName}</li>
                <li>{offender.victimLastName}</li>
                <li><img src={offender.victimsImage}></img></li>
                <li>{offender.lastDrugTest}</li>
                </div>
            )
        })
        return(
            <div class="background">
                <h1>Search for an offender</h1>
                <input type="text" placeholder="TDCJ-ID" name="offenderId" onChange={this.handleTextChange}></input>
                {/* <input type="text" placeholder="First Name" name="FName" onChange={this.handleTextChange} > </input>
                <input type="text" placeholder="Last Name" name="LName" onChange={this.handleTextChange} ></input> */}
                <button onClick={() => this.handleSearchFunction(this.state.offenderId)}>Search</button>
               
                <ul>{OffendersList}</ul>
            </div>
        ) 
    }
}