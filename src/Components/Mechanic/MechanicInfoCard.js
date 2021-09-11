import React, { Component } from 'react';
//Components
import NewVehicleMech from './NewVehicleMech'
//CSS
import '../../CSS/MechanicInfoCard.css'

class MechanicInfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addVehicle: false,
        }
    }
    render(){
        return(
            <>
            <div className="mechanic">
                <div className="info">        
                    <p>Serviser: {this.props.name}</p>
                    <p>Kontakt: {this.props.email}</p>
                </div>
                <button style={this.state.addVehicle ? {display:"none"} :{}}
                     onClick={() => this.setState({addVehicle: true})}
                     className="last">Dodaj novo vozilo</button>
            </div>
            <div>
                {this.state.addVehicle
                ? <NewVehicleMech
                    toggleAddVehicle = {this.ToggleAddVehicleAvailable}
                    setFlag={this.props.SetFlag}
                  />
                : <></>
                }
            </div>
            </>
        )
    }
    ToggleAddVehicleAvailable = () => {
        this.setState({addVehicle:false})
    }
}

export default MechanicInfoCard;