import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import { connect } from "react-redux"
import { withRouter} from "react-router-dom"
import './style.css';
import './generic.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  


export class Menu extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    
    handleLogoutClick = () => {
        
        localStorage.removeItem("jwt")

        this.props.logout()

        this.props.history.push("/")
    }

    render() {

       let style = {
            "height": "10px",
           
        }
       
        return(
            <div className="style">
            <Navbar className="style" color="light" light expand="sm">
         <NavbarBrand href="/"><NavLink>OIMS </NavLink></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" color="muted" navbar>
              <NavItem>
                <NavLink className="space" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/show-officer" color="muted">Officer</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                 <NavLink> More</NavLink>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink to="/save-offender">
                    Offender
                  </NavLink></DropdownItem>
                  <DropdownItem>
                    <NavLink to="/search">
                        Search

                        
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                   {this.props.isAuthenticated ? <li className="header" ><a onClick={this.handleLogoutClick} href="#"><NavLink>Logout</NavLink></a></li> : null}

                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        </div>

            // stop herer
            // <ul style={style}>
            //     <li className="header"><NavLink to="/">Home</NavLink></li>
            //     <li className="header"><NavLink to="/show-officer">Officer</NavLink></li>
            //     <li className="header" ><NavLink to="/save-offender">Offender</NavLink></li>
            //     <li className="header"><NavLink to="/search">Search</NavLink></li>
            //     <li className="header"><NavLink to="/add-drugTest/">addDrugTest</NavLink></li>

                // {this.props.isAuthenticated ? <li className="header" ><a onClick={this.handleLogoutClick} href="#">Logout</a></li> : null}
 


            // </ul>
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