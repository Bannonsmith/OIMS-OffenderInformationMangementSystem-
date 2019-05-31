import React, {Component} from "react";
import axios from "axios"
import GetUserInfo from "./GetUserInfo"


export class ShowContacts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            offenderId: this.props.match.params.offenderId,
          offender: null
    
        }
    
    }

    componentDidMount() {

     this.populateContacts(this.props.match.params.offenderId)
    }

    populateContacts = (offenderId) => {
      console.log('frog')
      console.log(offenderId)
      fetch(`http://localhost:8080/contacts/${offenderId}`)
      .then((response) => response.json())
      .then((json) => {
          console.log("Here is the Json")
          console.log(json)

        this.setState({
          offender: json
        })
      })

      .catch(error => console.log(error))
    
    }
 

    render() {    
        console.log("Look here")
        console.log(this.state.offender)
      if(this.state.offender === null) {
        return <span>Loading contacts...</span>
      } else {

        const items = this.state.offender.map((m) =>{
          return( 
              <div>
              <li>Date: {m.date}</li> 
              <li>time: {m.time}</li>
              <li>Person: {m.who}</li>
              <li>Location: {m.where}</li>
              <li>Notes: {m.summary}</li>
              <li>Offender's Current Mood: {m.mood}</li>
              <li>Current employment status: {m.employment}</li>
              <li>Current Living Arrrangement: {m.residence}</li>
              <li>Did the offender Pay this Visit: {m.fees}</li>
              <li>Substance Abuse Status: {m.drugFree}</li>

              <br></br>
              </div>
          )
        })

        return (
          <div>
            <GetUserInfo  />
            <ul>{items}</ul>
          </div>
        )

      }

      
    }
    
  }
