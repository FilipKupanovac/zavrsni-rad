import React, { Component } from 'react';
//Components
import PendingAppointmentCard from './PendingAppointmentCard';
//CSS

class AppointmentsApproval extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            awaitingApprovals: [],
            showAwaitApprovals: false,
            count: 0
        }
    }

    render(){

        return(
            <>
                {this.GetAwaitingApprovalCount()}
                <div className="awaiting-approval">
                    {this.ShowAwaitingApprovals()}
                </div>
            </>
        )
    }

    componentDidMount(){
        this.FetchAwaitingApprovals();
    }
    
    FetchAwaitingApprovals = () =>{
        fetch(`http://localhost:3000/appointment-approvals/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({count: data.length})
            this.setState({awaitingApprovals: data})
        })
    }
    GetAwaitingApprovalCount = () =>{
        return(
            <p>Trenutno imate {this.state.count} zahtjeva za pregled</p>
        )
    }
    ShowAwaitingApprovals = () =>{
        if(this.state.count){
            if(this.state.showAwaitApprovals){
                return(
                    <>
                        <p onClick={() => this.ToggleShowAwaitApprovals()}>
                            Prikaži manje</p>
                        {this.state.awaitingApprovals.map(app => {
                            return(
                                <PendingAppointmentCard appointment={app}
                                pickAppointment={this.props.pickAppointment}
                                pickedAppointment={this.props.pickedAppointment}
                                />
                            )
                        })}
                    </>
            )}
            else{
                return(
                    <p onClick={() => this.ToggleShowAwaitApprovals()}>
                        Prikaži više
                    </p>
                )
            }
        }
        else return <></>
    }
    ToggleShowAwaitApprovals = () => {
        this.setState({showAwaitApprovals: !this.state.showAwaitApprovals})
    }
}

export default AppointmentsApproval;