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
            pickedAppointment: undefined,
            //TEST
            flag: undefined
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
                    pickAppointment={this.PickAppointment} 
                    
                    /*TEST*/
                    approveAppoint={this.ApproveAppointment}
                    />
                </div>
            </>
        )
    }
    
    PickAppointment = (pick) => {
        if(this.state.pickedAppointment !== undefined){
            if(pick.appointment_number !== this.state.pickedAppointment.appointment_number){
                this.setState({pickedAppointment: pick})
            }
            else{
                this.setState({pickedAppointment: undefined})
            }
        }
        else{
            this.setState({pickedAppointment: pick})
        }
    }
    ApproveAppointment = (date) => {
        //Promijeniti u bazi za odabrani appointment stanje iz pending_request ='Y' u pending_request ='N'
        //Ponuditi promjenu željenog datuma dijagnostike
        //(Moguće - odbiti zahtjev)
        fetch('http://localhost:3000/approve-appointment', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                appointment_number: this.state.pickedAppointment.appointment_number,
                date: date
            })
        })
        .then(res => res.json())
        .then(data =>{
            this.setState({pickedAppointment: {
                scheduled_time : date},
                flag: Math.random()
            })
        })
    }
}

export default Mechanic;