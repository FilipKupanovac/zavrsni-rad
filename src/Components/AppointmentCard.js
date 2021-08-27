import React from 'react';

//Components
//CSS

const AppointmentCard = ({appointment}) =>{
    return(
        <div className="appointment-card">
            <p>{appointment.manufacturer} {appointment.model}</p>
            <p>Scheduled: {appointment.scheduled_time}</p>
        </div>
    )
}

export default AppointmentCard;