import React, {Component} from "react";
import axios from "axios"



export class DrugTest extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.match.params.offenderId)
        this.state = {
            offenderId: this.props.match.params.offenderId,
            date: "",
            alcohol: "",
            amphetamines: "",
            benzodiapheine: "",
            cocaine: "",
            k2: "",
            lsd: "",
            marijuana: "",
            note: ""

            
        }
    }

        
        handleTextChange = (e) => {

            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleDrugTestSave = (offenderId) => {

            const url = `http://localhost:8080/add-drugTest/${offenderId}`
            console.log(url)
            axios.post(url, {
                offenderId: this.state.offenderId,
                date: this.state.date,
                alcohol: this.state.alcohol,
                amphetamines: this.state.amphetamines,
                benzodiapheine: this.state.benzodiapheine,
                cocaine: this.state.cocaine,
                k2: this.state.k2,
                lsd: this.state.lsd,
                marijuana: this.state.marijuana,
                note: this.state.note
            }).then(response => {
              console.log(response.data)
            }).then(alert("You have sucessfully addded a drug test"))        
          
        }
    

    render(){
        return (
        <div>
            <input type="date" name="date" onChange={this.handleTextChange}></input>
            <input onChange={this.handleTextChange}></input>
            <br></br>
            <h2>Positive</h2>
            <h1>Alcohol</h1> 
            <select name="alcohol">                   
                                        <option  value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option  value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option  value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            <h1>Amphetamines</h1> 
            <select name="amphetamines">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            <h1>Benzodiapheine</h1> 
            <select name="benzodiapheine">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            <h1>Cocaine</h1> 
            <select name="cocaine">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
            <h1>K2</h1> 
            <select name="k2">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>            
            <h1>LSD</h1> 
            <select name="lsd">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>            
            <h1>Marijuana</h1> 
            <select name="marijuana">                   
                                        <option value="Admitted" onChange={this.handleTextChange}>Admitted</option>
                                        <option value="Positive" onChange={this.handleTextChange}>Positive</option>
                                        <option value="Negative" onChange={this.handleTextChange}>Negative</option>
            </select>
                <h3>Notes</h3>
            <textarea type="input" name="note" placeholder="Notes" onChange={this.handleTextChange}></textarea>
            <button type="button" onClick={() => this.handleDrugTestSave(this.state.offenderId)}>Submit</button>

        </div>
        )
    
    }
}