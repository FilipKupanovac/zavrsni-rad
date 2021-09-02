import React, { Component } from 'react';
//Components
import PendingRequestResolveForm from './PendingRequestResolveForm';
//CSS

class PendingAppointmentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        let {appointment,pickAppointment,pickedAppointment} = this.props;
        let date = new Date(appointment.scheduled_time)
        let today=new Date()
        return(
            <>  
                <hr/>  
                <div className={today>date? "appointment-card warning" : "appointment-card"}
                    onClick={() => pickAppointment(appointment)}
                >
                    <p>APPOINTMENT: {appointment.appointment_number}, Datum: {date.getDate()}. {date.getMonth()+1}. {date.getFullYear()}. , Mehaničar: {appointment.mechanic}</p>
                    <>{appointment.note !== null
                     ? <p>Opis problema: {appointment.note}</p>
                     : <></>
                    }</>
                </div>
                <>
                    {appointment === pickedAppointment 
                     ? <PendingRequestResolveForm warning={today>date}
                        date={appointment.scheduled_time}
                        approveAppoint={this.props.approveAppoint}
                        rejectAppoint={this.props.rejectAppoint}
                     />
                     : <></>
                    }
                </>
            </>
        )
    }
    
}

/* const PendingAppointmentCard = ({appointment,pickAppointment,pickedAppointment}) =>{
    return(
        <>    
            <div className="appointment-card"
                onClick={() => pickAppointment(appointment)}
            >
                <p>APPOINTMENT: {appointment.appointment_number}, {appointment.scheduled_time}, {appointment.mechanic}</p>
            </div>
            <>
                {appointment === pickedAppointment 
                //TU IDE FORM ZA POTVRDU/IZMJENU/ODBIJANJE ZAHTJEVA
                 ? <PendingRequestResolveForm date={appointment.scheduled_time}/>
                 : <></>
                }
            </>
        </>
    )
} */

export default PendingAppointmentCard;