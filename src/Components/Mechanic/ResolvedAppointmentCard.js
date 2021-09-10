import React, { Component } from 'react';
//Components
//CSS

class ResolvedAppointmentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        let {appointment} = this.props;
        return(
            <>  
                <hr/>  
                <div className="appointment-card">
                    <p>APPOINTMENT: {appointment.appointment_number}, Dijagnostički kod: {appointment.code}</p>
                    <p>Vozilo: {appointment.manufacturer} {appointment.model}</p>
                    <>{appointment.note !== null
                     ? <>
                        <p>Postupak: {appointment.note}</p>
                        <p>Izmijenjen dio: (ubaciti dio, klasa ResolvedAppointmentCard)</p>
                       </>
                     : <p>Pregled. Nije pronađena pogreška, nema izmijenjenih dijelova.</p>
                    }</>
                </div>
            </>
        )
    }
}

export default ResolvedAppointmentCard;