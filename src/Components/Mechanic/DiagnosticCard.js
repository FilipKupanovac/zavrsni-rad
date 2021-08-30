import React, { Component } from 'react';
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
        return(
            <>
                <div className="appointment-card"
                    onClick={() => pickDiagnostic(diagnostic)}
                >
                    <p>DIAGNOSTIC: {diagnostic.appointment_number}, {diagnostic.scheduled_time}, {diagnostic.mechanic}</p>
                </div>
                <>
                    {diagnostic === pickedDiagnostic
                     ? <p>NE PITAJ ME NIŠTA</p>
                     : <></>
                    }
                </>
            </>
        )
    }
}

export default DiagnosticCard;