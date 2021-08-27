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
            mechanicInput: '',
            mechanics: undefined
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

    //#region Submitting Schedule
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
                            this.ToggleSubmitAvailable()
                            //fetching.postMethod
                            console.log("Odabrani auto: ", this.state.pickedVehicle)
                            console.log("Mehaničar: ", this.state.mechanicInput)
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
                            {/*TREBA PROMIJENITI SVOJSTVA KOJA SE PREDAJU KADA SE UKLJUČI PRAVA BAZA*/}
                                <option 
                                    key={mechanic.id}
                                    onClick={() => console.log("Odabrani mehaničar: ", mechanic)}
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