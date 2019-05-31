import React, {Component} from "react";
import { connect } from 'react-redux'

class GetUserInfo extends Component {

    constructor(props) {
        super(props)

    }
    
    render(){
        return(
            <div className="name">
                <li>TDCJ-ID:{this.props.offender._id}</li>
                <li>Officer Badge Number:{this.props.offender.badgeId}</li>
                <li>{this.props.offender.firstName}</li>
                <li>{this.props.offender.lastName}</li>
                <li><img src={this.props.offender.image} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlFXHifev2OtSYiYTGI_sm7vLJhCK0pYKcz1NNiePkEAgJ22NUQ"></img></li>
                <li>{this.props.offender.birthdate}</li>
                <li>{this.props.offender.address}</li>
                {/* <li>{this.props.offender.vehicle}</li> */}
                {/* <li>{this.props.offender.employment}</li>
                <li>{this.props.offender.employmentAddress}</li> */}
                <li>{this.props.offender.criminalHistory}</li>
                {/* <li>{this.props.offender.victimFirstName}</li>
                <li>{this.props.offender.victimLastName}</li>
                <li><img src={this.props.offender.victimsImage}></img></li> */}
                {/* <li>{this.props.offender.lastDrugTest}</li> */}
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
