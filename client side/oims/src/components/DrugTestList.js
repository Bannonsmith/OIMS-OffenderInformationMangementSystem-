import React, {Component} from "react";
import axios from "axios"

export class DrugTestList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          offender: {}
    
        }
        console.log("happy days")
        console.log(this.state.offender)
    }

    componentDidMount() {

     this.populateDrugTest(this.props.match.params.offenderId)
    }

    populateDrugTest = (offenderId) => {
      console.log('frog')
      console.log(offenderId)
      fetch(`http://localhost:8080/drugtest/${offenderId}`)
      .then((response) => response.json())
      .then((json) => {
          console.log(json)
        this.setState({
          offender: json
        })
      })
      .catch(error => console.log(error))
    
    }
 

    render() {    


      if(typeof this.state.offender.drugTest == 'undefined') {
        return <span>Loading drug test...</span>
      } else {

        const items = this.state.offender.drugTest.map((m) =>{
          return( 
              <div>
              <li>Date: {m.date}</li> 
              <li>Time: {m.time}</li> 
              <li>Conclusion of alchol test: {m.alcohol}</li>
              <li>Conclusion of amphetamines test: {m.amphetamines}</li>
              <li>Conclusion of benzodiapheine test: {m.benzodiapheine}</li>
              <li>Conclusion of cocaine test: {m.cocaine}</li>
              <li>Conclusion of k2 test: {m.k2}</li>
              <li>Conclusion of lsd test: {m.lsd}</li>
              <li>Conclusion of marijuana test: {m.marijuana}</li>
              <li>Parole Officer's comments: {m.note}</li>
              <br></br>
              </div>
          )
        })

        return (
          <ul>{items}</ul>
        )

      }

      
    }
    
  }
