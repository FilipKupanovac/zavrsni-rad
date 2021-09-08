import React, { Component } from 'react';
import InProgressCard from './InProgressCard';
//Components
//CSS

class DiagnosticInProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            inProgress: [],
            count: 0
        }
    }
    render(){
        return(
        <>
            {this.GetAwaitingDiagnosticCount()}
            <div className="awaiting-diagnostics">
                {this.ShowAwaitingDiagnostics()}
            </div>
            <>{this.OnDiagnosticsCountChange()}</>
        </>)
    }
    componentDidMount(){
        this.FetchAwaitingDiagnostics();
    }
    OnDiagnosticsCountChange = () =>{
        let count = 0;
        fetch(`http://localhost:3000/diagnostics-inprogress/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            count = data.length
            if(count !== this.state.inProgress.length)
            {this.componentDidMount()}
        })
    }
    FetchAwaitingDiagnostics = () =>{
        fetch(`http://localhost:3000/diagnostics-inprogress/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({count: data.length})
            this.setState({inProgress: data})
        })
    }
    GetAwaitingDiagnosticCount = () =>{
        return(
            <p>Trenutno imate {this.state.count} aktivnih postupaka</p>
        )
    }

    ShowAwaitingDiagnostics = () => {
        if(this.state.count){
            return(
                <>
                {this.state.inProgress.map(diag => {
                    return(
                        <InProgressCard key={diag.appointment_number}
                            diagnostic={diag}
                        />
                    )
                })}
            </>
            )
        }
    }
}
export default DiagnosticInProgress;