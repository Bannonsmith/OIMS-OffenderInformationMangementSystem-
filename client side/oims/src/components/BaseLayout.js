import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import './style.css'
import { connect } from "react-redux"
import { withRouter} from "react-router-dom"


export class Menu extends Component {



    handleLogoutClick = () => {
        
        localStorage.removeItem("jwt")

        this.props.logout()

        this.props.history.push("/")
    }

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

                {this.props.isAuthenticated ? <li className="header" ><a onClick={this.handleLogoutClick} href="#">Logout</a></li> : null}
 


            </ul>
        )
    }
}


class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Menu logout={this.props.onLogout} 
                history={this.props.history}
                isAuthenticated = {this.props.isAuthenticated}/>
                {this.props.children}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch({type: "LOGOUT"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BaseLayout))