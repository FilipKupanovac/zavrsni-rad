import React from 'react';

//Components
//CSS

const AppointmentCard = ({appointment}) =>{
    let date = new Date(appointment.scheduled_time)
    return(
        <div className="appointment-driver">
            <hr/>
            <p>{appointment.manufacturer} {appointment.model}</p>
            <p>Serviser: {appointment.name}</p>
            <p>Termin: {date.getDate()}.{date.getMonth() +1}.{date.getFullYear()}.</p>
            <>{appointment.note !== null
             ? <p>Opis problema: {appointment.note}</p>
             : <></>
            }</>
        </div>
    )
}

export default AppointmentCard;