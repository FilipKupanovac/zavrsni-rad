import React, {Component} from 'react';
//Components
import ResolvedAppsDriverCard from './ResolvedAppsDriverCard';
//CSS

class ResolvedAppsDriver extends Component{
    constructor(props){
        super(props);
        this.state={
            ownerId:this.props.id,
            appointments: [],
            showResolved: false,
        }
    }
    render(){
        /* return(
            <>
                {this.IterateAppointments()}
            </>
        ) */
        return(
            <>
            <p>Imate {this.state.appointments.length} završenih postupaka</p>
            <>{!this.state.showResolved 
            ?   <>
                <p className="pointer"
                    onClick={() => this.ToggleShowResolved()}>Prikaži više</p>
                </>
            :   <>
                    <p className="pointer"
                        onClick={() => this.ToggleShowResolved()}>Prikaži manje</p>
                    {this.IterateAppointments()}
                </>
            }
            </>
            </>
        )
    }
    IterateAppointments = () =>{
        let {appointments} = this.state
        if(Array.isArray(appointments)){
            return(
                <div>
                    {appointments.map(appointment =>{
                        return(
                            <ResolvedAppsDriverCard key={appointment.appointment_number} appointment={appointment}
                            />
                        )
                    })}
                </div>
            )
        }
        else{
            return(
                <p>Nemate servisnih postupaka u tijeku</p>
            )
        }
    }
    componentDidMount(){
        this.FetchAppointments();
    }
    FetchAppointments = () => {
        fetch(`http://localhost:3000/resolved-driver/${this.state.ownerId}`)
        .then(response => response.json())
        .then(appointments => {
            this.setState({appointments: appointments})
        })
    }

    ToggleShowResolved = () =>{
        this.setState({showResolved: !this.state.showResolved})
    }
}

export default ResolvedAppsDriver;