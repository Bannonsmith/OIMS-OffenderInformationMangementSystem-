import React, {Component} from "react";
import { connect } from 'react-redux';
import {  Media } from 'reactstrap';
import './generic.css';



class GetUserInfo extends Component {

    constructor(props) {
        super(props)

    }
    
    render(){
        return(
            <div className="GetUserInfo">
               

                <Media>
                <Media left href="#">
                    <Media object src={this.props.offender.image} alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading>
                    <div className="mediaHeader">
                        <li>First Name:<b>{this.props.offender.firstName}</b> </li> <li>Last Name: <b> {this.props.offender.lastName}</b></li>
                    </div>
                    </Media>
                    <div className="mediaBody">
                        <li>TDCJ-ID:{this.props.offender._id}</li>
                        <li>Criminal History:{this.props.offender.criminalHistory}</li>
                        <li>DOB:{this.props.offender.birthdate}</li>
                        {/* <li>Officer Badge Number:{this.props.offender.badgeId}</li> */}
                    </div>

                </Media>
    </Media>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        offender: state.offender
    }
}

export default connect(mapStateToProps, null)(GetUserInfo)
