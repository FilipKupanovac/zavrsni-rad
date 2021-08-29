import React, { Component } from 'react';
//Components
import MechanicInfoCard from './MechanicInfoCard'
import AppointmentsApproval from './AppointmentsApproval';
//CSS


class Mechanic extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: this.props.user.name,
            id: this.props.user.id,
            //APPS APPROVAL PART
            pickedAppointment: undefined
        }
    }
    
    render(){
        return(
            <>
                <div className="mechanic">
                    <MechanicInfoCard name={this.state.name} email={this.props.user.email}/>
                </div>
                <div>
                    <AppointmentsApproval id={this.props.user.id} 
                    pickedAppointment={this.state.pickedAppointment} 
                    pickAppointment={this.PickAppointment} />
                </div>
            </>
        )
    }
    
    PickAppointment = (pick) => {
        if(this.state.pickedAppointment !== undefined){
            if(pick.appointment_number !== this.state.pickedAppointment.appointment_number){
                this.setState({pickedAppointment: pick})
                //console.log("Izmijenjen pick. ", pick)
            }
            else{
                this.setState({pickedAppointment: undefined})
                //console.log("Uklonjen pick. ", pick)
            }
        }
        else{
            this.setState({pickedAppointment: pick})
            //console.log("Postavljen pick. ", pick)
        }
    }
    ApproveAppointment = () => {
        //Promijeniti u bazi za odabrani appointment stanje iz pending_request ='Y' u pending_request ='N'
        //Ponuditi promjenu željenog datuma dijagnostike
        //(Moguće - odbiti zahtjev)
    }
}

export default Mechanic;