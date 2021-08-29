import React from 'react';
//Components
//CSS

const PendingAppointmentCard = ({appointment,pickAppointment,pickedAppointment}) =>{
    return(
        <div className="appointment-card"
            onClick={() => pickAppointment(appointment)}
        >
            <p>APPOINTMENT: {appointment.appointment_number}, {appointment.scheduled_time}, {appointment.mechanic}</p>
            <>
                {appointment === pickedAppointment 
                //TU IDE FORM ZA POTVRDU/IZMJENU/ODBIJANJE ZAHTJEVA
                 ? <p>MENE SI ODABRAO</p>
                 : <></>
                }
            </>
        </div>
    )
}

export default PendingAppointmentCard;