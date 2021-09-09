import React, { Component } from 'react';
//Components
//CSS

class ResolvedAppointments extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            resolvedAppointments: [],
            showResolved: false,
            count: 0
        }
    }
    render(){
        return(
            <>
                {this.GetResolvedAppointmentCount()}
                <div className="awaiting-approval">
                    {this.ShowResolvedAppointments()}
                </div>
                <>{this.OnResolvedCountChange()}</>
            </>
        )
    }
    componentDidMount(){
        this.FetchResolvedAppointments();
    }
    
    OnResolvedCountChange = () =>{
        let count = 0;
        fetch(`http://localhost:3000/resolved-appointments/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            count = data.length
            if(count !== this.state.resolvedAppointments.length)
            {
                this.componentDidMount();
            }
        })
    }
    FetchResolvedAppointments = () =>{
        fetch(`http://localhost:3000/resolved-appointments/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({count: data.length})
            this.setState({resolvedAppointments: data})
        })
    }
    GetResolvedAppointmentCount = () =>{
        return(
            <p>Imate {this.state.count} završenih servisa</p>
        )
    }
    ShowResolvedAppointments = () =>{
        if(this.state.count){
            if(this.state.showResolved){
                return(
                    <>
                        <p className="pointer"
                            onClick={() => {
                                this.props.setFlag()
                                this.ToggleShowResolved()}}>
                            Prikaži manje</p>
                        {this.state.resolvedAppointments.map(app => {
                            return(
                                <div key={app.appointment_number}>
                                    <p>
                                        {app.serial_number}
                                    </p>
                                </div>
                            )
                        })}
                    </>
            )}
            else{
                return(
                    <p className="pointer"
                        onClick={() => {
                            this.props.setFlag()
                            this.ToggleShowResolved()}}>
                        Prikaži više
                    </p>
                )
            }
        }
        else return <></>
    }
    ToggleShowResolved = () => {
        this.setState({showResolved: !this.state.showResolved})
    }
}
export default ResolvedAppointments