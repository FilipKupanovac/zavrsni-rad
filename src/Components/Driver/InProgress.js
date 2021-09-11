import React, {Component} from 'react';
//Components
import InProgressDriverCard from './InProgressDriverCard';
//CSS

class InProgress extends Component{
    constructor(props){
        super(props);
        this.state={
            ownerId:this.props.id,
            appointments: undefined
        }
    }
    render(){
        return(
            <>
                {this.IterateAppointments()}
            </>
        )
    }
    IterateAppointments = () =>{
        let {appointments} = this.state
        if(Array.isArray(appointments)){
            if(appointments.length){
                return(
                    <div>
                    {appointments.map(appointment =>{
                        return(
                            <InProgressDriverCard key={appointment.appointment_number} appointment={appointment}
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
    }
    componentDidMount(){
        this.FetchAppointments();
    }
    FetchAppointments = () => {
        fetch(`http://localhost:3000/appointments-inprogress/${this.state.ownerId}`)
        .then(response => response.json())
        .then(appointments => {
            this.setState({appointments: appointments})
        })
    }
}

export default InProgress;
