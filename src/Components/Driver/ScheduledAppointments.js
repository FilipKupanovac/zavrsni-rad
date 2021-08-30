import React, {Component} from 'react';
//Components
import AppointmentCard from './AppointmentCard';
//CSS

class ScheduledAppointments extends Component{
    constructor(props){
        super(props);
        this.state={
            ownerId:this.props.id,
            prevAppointments: undefined
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
        let {prevAppointments} = this.state
        if(Array.isArray(prevAppointments)){
            return(
                <div>
                    {prevAppointments.map(appointment =>{
                        return(
                            <AppointmentCard key={appointment.appointment_number} appointment={appointment}
                            />
                        )
                    })
                    }
                </div>
            )
        }
        else{
            return(
                <p>You have not got any pending appointments</p>
            )
        }
    }
    componentDidMount(){
        this.FetchAppointments();
    }
    FetchAppointments = () => {
        fetch(`http://localhost:3000/previous-appointments/${this.state.ownerId}`)
        .then(response => response.json())
        .then(appointments => {
            this.setState({prevAppointments: appointments})
        })
    }
}

export default ScheduledAppointments;