import React, {Component} from 'react';
//Components
import ResolvedAppsDriverCard from './ResolvedAppsDriverCard';
//CSS

class ResolvedAppsDriver extends Component{
    constructor(props){
        super(props);
        this.state={
            ownerId:this.props.id,
            appointments: undefined
        }
    }
    render(){
        return(
            <>
                {this.IterateAppointments()}
            </>
        )
    }
    IterateAppointments = () =>{
        let {appointments} = this.state
        if(Array.isArray(appointments)){
            return(
                <div>
                    {appointments.map(appointment =>{
                        return(
                            <ResolvedAppsDriverCard key={appointment.appointment_number} appointment={appointment}
                            />
                        )
                    })}
                </div>
            )
        }
        else{
            return(
                <p>Nemate servisnih postupaka u tijeku</p>
            )
        }
    }
    componentDidMount(){
        this.FetchAppointments();
    }
    FetchAppointments = () => {
        fetch(`http://localhost:3000/resolved-driver/${this.state.ownerId}`)
        .then(response => response.json())
        .then(appointments => {
            this.setState({appointments: appointments})
        })
    }
}

export default ResolvedAppsDriver;