import React, {Component} from 'react';
//Components
import AppointmentCard from './AppointmentCard';
//CSS

class ScheduledAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAvailable: true,
            ownerid : this.props.id,
            prevAppointments: ''
        }
    }

    render(){
        return(
            <>
                <p>
                    These are your cars' scheduled appointments: 
                </p>
                <div>
                    <>{this.IterateAppointments()}</>
                </div>
            </>
        )
    }

    componentDidMount(){
        this.FetchAppointments();
    }

    FetchAppointments = () => {
        /*Potrebno dohvatiti iz baze sve automobile as c vlasnika s ID = this.state.ownerid, i appointments as a gdje je c.serial_number = a.serial_number
        SQL:
            SELECT * FROM cars c, appointments a
            WHERE c.owner_id = this.state.ownerid AND c.serial_number = a.serial_number
        */
        fetch(`http://localhost:3000/previous-appointments/${this.state.ownerid}`)
        .then(response => response.json())
        .then(appointments => {
            this.setState({prevAppointments: appointments})
        })
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
                    })}
                </div>
            )
        }
    }
}

export default ScheduledAppointments;