import React, { Component } from 'react';
import DiagnosticForm from './DiagnosticForm';
//Components
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
                <div className={today>date? "appointment-card warning" : "appointment-card" /* JOŠ ASSIGNAJ GORNJE RUBOVE BORDER-RADIUS, A U DIAGNOSTICFORM.JS DONJE RUBOVE */}
                    onClick={() => pickDiagnostic(diagnostic)}
                >
                    <p>DIAGNOSTIC: {diagnostic.appointment_number}, Datum: {date.getDate()}. {date.getMonth()+1}. {date.getFullYear()}. , Mehaničar:{diagnostic.mechanic}</p>
                    <>{diagnostic.note !== null
                     ? <p>Opis problema: {diagnostic.note}</p>
                     : <></>
                    }</>
                </div>
                <>
                    {diagnostic === pickedDiagnostic
                     ? <DiagnosticForm warning={today>date}
                       runDiagnostic ={this.props.runDiagnostic}/>
                     : <></>
                    }
                </>
            </>
        )
    }
}

export default DiagnosticCard;