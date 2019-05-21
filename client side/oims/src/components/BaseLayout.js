import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import './style.css'


export class Menu extends Component {

    render() {

       let style = {
            "backgroundColor": "lightGrey",
            "listStyle": "none",
            "display": "flex",
            "padding": "25px",
            "marginLeft" : "100px",
            "marginRight" : "100px",
            "height": "20px",
            "textDecoration": "none"
        }
       
        return(
            <ul style={style}>
                <li className="header"><NavLink to="/">Home</NavLink></li>
                <li className="header"><NavLink to="/show-officer">Officer</NavLink></li>
                <li className="header" ><NavLink to="/save-offender">Offender</NavLink></li>
                <li className="header"><NavLink to="/search">Search</NavLink></li>
                {/* <li className="header"><NavLink to="/add-drugTest/">addDrugTest</NavLink></li> */}


            </ul>
        )
    }
}


export class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Menu />
                {this.props.children}
            </div>
        )
    }

}