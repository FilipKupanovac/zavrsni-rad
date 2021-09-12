import React, { Component } from 'react';
//Components
import DiagnosticForm from './DiagnosticForm';
//CSS

class DiagnosticCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        let {diagnostic, pickDiagnostic,pickedDiagnostic} = this.props;
        let date = new Date(diagnostic.scheduled_time)
        let today=new Date()
        return(
            <>
            <hr/>
                <div className={today>date? "appointment-card warning" : "appointment-card"}
                    onClick={() => pickDiagnostic(diagnostic)}
                >
                    <p>Vozilo: {diagnostic.manufacturer} {diagnostic.model}</p>
                    <p>Vlasnik: {diagnostic.name}</p>
                    <p>Servisni broj: {diagnostic.appointment_number}, Datum: {date.getDate()}. {date.getMonth()+1}. {date.getFullYear()}.</p>
                    <>{diagnostic.note !== null
                     ? <p>Opis problema: {diagnostic.note}</p>
                     : <></>
                    }</>
                </div>
                <>
                    {diagnostic === pickedDiagnostic
                     ? <DiagnosticForm warning={today>date}
                       runDiagnostic ={this.props.runDiagnostic}
                       />
                     : <></>
                    }
                </>
            </>
        )
    }
}

export default DiagnosticCard;