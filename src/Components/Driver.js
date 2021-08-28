import React, {Component} from 'react';
//Components
import VehicleList from './VehicleList'
import ScheduledAppointments from './ScheduledAppointments';
//CSS
import '../CSS/Driver.css'

class Driver extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            ownerId: this.props.user.id,
            pickedVehicle: undefined,
            submitAvailable: true,
            mechanicInput: undefined,
            mechanics: undefined,
            dateInput: undefined,
            problemExplanation: undefined
        }
    }

    render(){
        return(
            <>
                <div>
                    <p>Driver: {this.state.name}</p>
                </div>
                <VehicleList id={this.props.user.id}
                    pickvehicle={this.PickVehicle}
                />
                <div className="picked-vehicle">{this.ShowPickedVehicle()}</div>
                <ScheduledAppointments id={this.state.ownerId}/>
                <>
                    {this.ShowMechanics()}
                </>
            </>
        )
    }
    //#region Input tracking
    OnDateChange = (event) => {
        this.setState({dateInput: event.target.value})
    }
    OnProblemChange = (event) =>{
        this.setState({problemExplanation: event.target.value})
    }
    //#endregion
    //#region Submit Schedule
    SendScheduleRequest = () =>{
        fetch(`http://localhost:3000/request-schedule`, {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                mechanic: this.state.mechanicInput.id,
                vehicle: this.state.pickedVehicle.serial_number,
                date: this.state.dateInput,
                note: this.state.problemExplanation
            })
        })
        .then(resp => resp.json())
        .then(this.render())
    }

    ToggleSubmitAvailable(){
        this.setState({submitAvailable: this.state.submitAvailable 
                            ? false : true})
    }

    ShowSubmitForm = () => {
        if(this.state.submitAvailable){
            return(
                <button
                    onClick={() => this.ToggleSubmitAvailable()}
                >Schedule new appointment</button>
            )
        }
        else{ //Schedule submit form
            return(
                <div>
                <fieldset>
                    <div>
                        <label>Preffered date</label>
                        <input
                            onChange={this.OnDateChange}
                            type="date"
                        ></input>
                    </div>
                    <div>
                        <label>Mechanic</label>
                        <input
                            onChange={this.FetchMechanics} 
                            placeholder="Start typing preffered mechanic"
                            type="search" list="mylist"></input>
                    </div>
                    <div>
                        <label>Problem explanation</label>
                        <input
                            type="text" placeholder="Please describe what's wrong with your vehicle (optional)"
                        ></input>
                    </div>
                </fieldset>
                <div>
                    <button
                        onClick={() => {
                            this.TrySubmitSchedule();
                        }}
                        >
                        Schedule
                    </button>
                    <button
                        onClick={() => this.ToggleSubmitAvailable()}
                        >
                        Cancel
                    </button>
                </div>
            </div>
            )
        }
    }

    TrySubmitSchedule = () => {
        let {pickedVehicle,mechanicInput, dateInput} = this.state;
        if(pickedVehicle !== undefined && mechanicInput !== undefined
            && dateInput !== undefined && dateInput !== "")
        {
            this.SendScheduleRequest();
            this.ToggleSubmitAvailable();
        }
    }
    //#endregion
    //#region Mechanic dropdown
    FetchMechanics = (event) =>{
        let value = event.target.value;
        this.setState({mechanicInput: value})
        if(event.target.value !== '')
        {
            fetch(`http://localhost:3000/mechanics/${event.target.value}`)
        .then(response => response.json())
        .then(mechanics => {
            this.setState({mechanics: mechanics})
            //Taking care of mechanic input and assigning object to state if the input is valid. could be a standalone function
            let mech = undefined;
            mechanics.forEach(mechanic => {
                mechanics.forEach(mechanic =>{
                    let name = mechanic.name.toLowerCase();
                    if(name === event.target.value.toLowerCase()){
                        mech = mechanic
                    }
                })
            });
            this.setState({mechanicInput: mech})
        })
        }
    }

    ShowMechanics = () =>{
        if(Array.isArray(this.state.mechanics)){
            return(
                <datalist id="mylist">
                    {this.state.mechanics.map(mechanic =>{
                        return(
                            <>
                                <option 
                                    key={mechanic.id}
                                    value={mechanic.name}/>
                            </>
                        )
                    })
                    }
                </datalist>
            )
        }
    }
    //#endregion
    //#region Picking Vehicle
    PickVehicle = (pick) => {
        if(this.state.pickedVehicle !== undefined){
            if(pick.serial_number !== this.state.pickedVehicle.serial_number){
                this.setState({pickedVehicle: pick})
            }
            else{
                this.setState({pickedVehicle: undefined})
            }
        }
        else{
            this.setState({pickedVehicle: pick})
        }
    }

    ShowPickedVehicle = () => {
        if(this.state.pickedVehicle !== undefined){
            const {manufacturer, model} = this.state.pickedVehicle;
            return (
                <>
                    <p>Odabrali ste vozilo: {manufacturer} {model}</p>
                    <>{this.ShowSubmitForm()}</>
                </>
            )
        }
        else{
            return <p>Odaberite vozilo kako bi zakazali novi pregled.</p>
        }
    }
    //#endregion
}

export default Driver;