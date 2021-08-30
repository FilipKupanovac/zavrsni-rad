import React, { Component } from 'react';
//Components
import DiagnosticCard from './DiagnosticCard';
//CSS

class WaitingDiagnostic extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            awaitingDiagnostics: [],
            showAwaitDiagnostics: false,
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
        fetch(`http://localhost:3000/awaiting-diagnostics/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            count = data.length
            if(count !== this.state.awaitingDiagnostics.length)
            {this.componentDidMount()}
        })
    }

    FetchAwaitingDiagnostics = () =>{
        fetch(`http://localhost:3000/awaiting-diagnostics/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({count: data.length})
            this.setState({awaitingDiagnostics: data})
        })
    }

    GetAwaitingDiagnosticCount = () =>{
        return(
            <p>Trenutno imate {this.state.count} dijagnostičkih postupaka na čekanju</p>
        )
    }
    ShowAwaitingDiagnostics = () => {
        if(this.state.count){
            if(this.state.showAwaitDiagnostics){
                return(
                    <>
                    <p onClick={() => this.ToggleShowAwaitDiags()}>
                        Prikaži manje</p>
                        {this.state.awaitingDiagnostics.map(diag => {
                            return(
                                <DiagnosticCard diagnostic={diag}
                                    pickDiagnostic={this.props.pickDiagnostic}
                                    pickedDiagnostic={this.props.pickedDiagnostic}
                                    //approve i reject ekvivalenti iz appsaproval    
                                    />
                                )
                            })}
                    </>
                )
            }
            else{
                return(<p onClick={() => this.ToggleShowAwaitDiags()}>
                    Prikaži više</p>)
            }
        }
        else return <></>
    }
    ToggleShowAwaitDiags = () => {
        this.setState({showAwaitDiagnostics: !this.state.showAwaitDiagnostics})
    }
}
export default WaitingDiagnostic;