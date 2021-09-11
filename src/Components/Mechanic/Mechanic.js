import React, { Component } from 'react';
//Components
import MechanicInfoCard from './MechanicInfoCard';
import AppointmentsApproval from './AppointmentsApproval';
import WaitingDiagnostic from './WaitingDiagnostic';
import DiagnosticInProgress from './DiagnosticInProgress';
import ResolvedAppointments from './ResolvedAppointments';
//CSS


class Mechanic extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: this.props.user.name,
            id: this.props.user.id,
            flag: undefined,
            pickedAppointment: undefined,
            pickedDiagnostic: undefined,
        }
    }
    
    render(){
        return(
            <>
                <>
                    <MechanicInfoCard name={this.state.name} email={this.props.user.email} setFlag={this.SetFlag}
                    />
                </>
                <div className="appointments">
                    <AppointmentsApproval id={this.props.user.id} 
                    pickedAppointment={this.state.pickedAppointment} 
                    pickAppointment={this.PickAppointment} 
                    approveAppoint={this.ApproveAppointment}
                    rejectAppoint={this.RejectAppointment}
                    setFlag={this.SetFlag}
                    />
                </div>
                <div className="diagnostics">
                    <WaitingDiagnostic id={this.props.user.id}
                        pickedDiagnostic={this.state.pickedDiagnostic}
                        pickDiagnostic={this.PickDiagnostic}
                        setFlag={this.SetFlag}
                        runDiagnostic={this.RunDiagnostic}
                    />
                </div>
                <div className="in-progress">
                    <DiagnosticInProgress id={this.props.user.id}
                        setFlag={this.SetFlag}
                    />
                </div>
                <div className="resolved">
                    <ResolvedAppointments id={this.props.user.id}
                        setFlag={this.SetFlag}
                    />
                </div>
            </>
        )
    }

    SetFlag = () => {
        this.setState({flag: Math.random()})
    }
    //#region Appointment approval
    PickAppointment = (pick) => {
        if(this.state.pickedAppointment !== undefined){
            if(pick.appointment_number !== this.state.pickedAppointment.appointment_number){
                this.setState({pickedAppointment: pick})}
            else{
                this.setState({pickedAppointment: undefined})}
        }
        else{
            this.setState({pickedAppointment: pick})
        }
    }
    ApproveAppointment = (date) => {
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
            this.setState({flag: Math.random()})
        })
    }
    RejectAppointment = () =>{
        let nr = this.state.pickedAppointment.appointment_number
        fetch(`http://localhost:3000/reject-appointment/${nr}`,{
            method: 'delete',
            headers: {'Content-Type':'application/json'}
        })
        .then(data => {
            this.setState({flag:Math.random()})
        })
    }
    //#endregion
    //#region Diagnostic Handling
    PickDiagnostic = (pick) => {
        if(this.state.pickedDiagnostic !== undefined){
            if(pick.appointment_number !== this.state.pickedDiagnostic.appointment_number){
                this.setState({pickedDiagnostic: pick})}
            else{
                this.setState({pickedDiagnostic: undefined})}
        }
        else{this.setState({pickedDiagnostic: pick})}
    }
    RunDiagnostic = (code) => {
        fetch(`http://localhost:3000/diagnostic-code/${code}`)
        .then(res => res.json())
        .then(data =>{
            if(data !== "Code not found"){
                this.StartDiagnostics(data.code);
            }
        })
    }
    StartDiagnostics = (code) => {
        let {pickedDiagnostic} = this.state;
        fetch('http://localhost:3000/resolve-diagnostic', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                appointment_number: pickedDiagnostic.appointment_number,
                code: code
            })
        })
        .then(res => res.json())
        .then(data =>{
            this.SetFlag();
        })
    }
    //#endregion
    //#region resolved

    //#endregion
}

export default Mechanic;