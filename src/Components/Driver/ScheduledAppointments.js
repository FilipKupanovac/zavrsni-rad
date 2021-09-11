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
            if(prevAppointments.length){

                return(
                    <div>
                    {prevAppointments.map(appointment =>{
                        return(
                            <AppointmentCard key={appointment.appointment_number} appointment={appointment}
                            />
                            )
                        })}
                </div>
                )
            }
            else{
                return(
                    <p>Trenutno nemate zahtjeva na čekanju</p>
                )
            }
        }
    }
    componentDidMount(){
        this.FetchAppointments();
    }
    FetchAppointments = () => {
        fetch(`http://localhost:3000/previous-appointments/${this.state.ownerId}
        /${this.props.pending}
        `)
        .then(response => response.json())
        .then(appointments => {
            this.setState({prevAppointments: appointments})
        })
    }
}

export default ScheduledAppointments;