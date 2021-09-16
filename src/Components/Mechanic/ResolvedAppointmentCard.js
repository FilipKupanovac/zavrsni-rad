import React, { Component } from 'react';
//Components
//CSS

class ResolvedAppointmentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            part: undefined,
        }
    }
    render(){
        let {appointment} = this.props;
        let {part}=this.state;
        return(
            <>  
                <hr/>  
                <div className="appointment-card">
                    <p>Servisni broj: {appointment.appointment_number}, Vlasnik: {appointment.name}</p>
                    <p>Dijagnostički kod: {appointment.code}</p>
                    <p>Vozilo: {appointment.manufacturer} {appointment.model}</p>
                    <>{appointment.service_note !== null
                     ? <>
                        <p>Postupak: {appointment.service_note}</p>
                        {part !== undefined 
                        ? <>{this.GetPartJSX()}
                        </>
                        : <></>
                        }
                       </>
                     : <p>Pregled. Nije pronađena pogreška, nema izmijenjenih dijelova.</p>
                    }</>
                </div>
            </>
        )
    }
    componentDidMount(){
        this.GetPart();
    }
    GetPart = () => {
        let {appointment}= this.props;
        if(appointment.ean !== null)
        fetch(`http://localhost:3000/get-part-ean/${appointment.ean}`)
        .then(res => res.json())
        .then(data => this.setState({part: data}))
    }
    GetPartJSX = () =>{
        let {part}=this.state;
        return(
            <>
            <p>Izmijenjen dio: {part.service_part} {part.part_manufacturer}</p>
            <p>Potrošeno: {part.price} GBP</p>
            </>
        )
    }
}

export default ResolvedAppointmentCard;