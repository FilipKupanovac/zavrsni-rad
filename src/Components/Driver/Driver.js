import React, {Component} from 'react';
//Components
import VehicleList from './VehicleList'
import SubmitScheduleForm from './SubmitScheduleForm'
import ScheduledAppointments from './ScheduledAppointments';
import NewVehicle from './NewVehicle';
import InProgress from './InProgress';
import ResolvedAppsDriver from './ResolvedAppsDriver';
//CSS
import '../../CSS/Driver.css'
class Driver extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            ownerId: this.props.user.id,
            addVehicle: false,

            pickedVehicle: undefined,
            mechanics: undefined,
            submitAvailable: true,
            prevAppointments: undefined,

            dateInput: undefined,
            mechanicInput: undefined,
            problemInput: undefined,
            key: undefined
        }   
    }

    render(){
        return(
            <>
                <div className="driver-tab">
                    <p>Korisnik: {this.state.name}</p>
                    <button style={this.state.addVehicle ? {display:"none"} :{}}
                     onClick={() => this.setState({addVehicle: true})}
                     className="last">Dodaj vozilo</button>
                </div>
                <div>
                    {this.state.addVehicle
                    ? <NewVehicle id={this.state.ownerId}
                        toggleAddVehicle = {this.ToggleAddVehicleAvailable}
                        setFlag={this.SetFlag}
                      />
                    : <></>
                    }
                </div>
                <VehicleList
                    id={this.props.user.id}
                    pickvehicle={this.PickVehicle}
                />
                <div className={this.state.pickedVehicle !== undefined? "picked-vehicle": ""}>
                    <div className="picked-vehicle-info">
                        {this.state.pickedVehicle !== undefined 
                            ? <p>Odabrali ste vozilo {this.state.pickedVehicle.manufacturer} {this.state.pickedVehicle.model}</p>
                            : <></>}
                    </div>
                    <div className="submit-form">
                        <SubmitScheduleForm submitAvailable = {this.state.submitAvailable}
                            toggleSubmitAvailable={this.ToggleSubmitAvailable}
                            pickedVehicle={this.state.pickedVehicle}
                            onDateChange={this.OnDateChange}
                            onMechanicChange={this.FetchMechanics}
                            onProblemChange={this.OnProblemChange}
                            trySubmit={this.TrySubmitSchedule}
                        />
                    </div>
                </div>
                <div className="appointments">
                    <p>Zahtjevi za pregled</p>
                    <ScheduledAppointments key={this.state.key} id={this.state.ownerId} pending={'Y'} />
                </div>
                <div className="appointments">
                    <p>Termini dijagnostike</p>
                    <ScheduledAppointments key={this.state.key} id={this.state.ownerId} pending={'N'} />
                </div>
                <div className="appointments">
                    <p>Postupci u tijeku</p>
                    <InProgress key={this.state.key} id={this.state.ownerId}/>
                </div>
                <div className="appointments">
                    <p>Zavr??eni servisi</p>
                    <ResolvedAppsDriver key={this.state.key} id={this.state.ownerId}/>
                </div>
                <>
                    {this.ShowMechanics()}
                </>

            </>
        )
    }
    
    //#region Input tracking
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
    OnDateChange = (event) => {
        this.setState({dateInput: event.target.value})
    }
    OnProblemChange = (event) =>{
        this.setState({problemInput: event.target.value})
    }
    //#endregion

    PickVehicle = (pick) => {
        if(this.state.pickedVehicle !== undefined){
            if(pick.serial_number !== this.state.pickedVehicle.serial_number){
                this.setState({pickedVehicle: pick})
                this.setState({submitAvailable: true})
            }
            else{
                this.setState({pickedVehicle: undefined})
            }
        }
        else{
            this.setState({pickedVehicle: pick})
            this.setState({submitAvailable: true})
        }
    }
    SendScheduleRequest = () =>{
        fetch(`http://localhost:3000/request-schedule`, {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                mechanic: this.state.mechanicInput.id,
                vehicle: this.state.pickedVehicle.serial_number,
                date: this.state.dateInput,
                note: this.state.problemInput
            })
        })
        .then(resp => resp.json())
        .then(data =>{
            if(data.status !== 400){
                this.setState({dateInput: undefined, 
                    mechanicInput:undefined,
                    problemInput: undefined})
                this.setState({key: Math.random()})
            }
        })
    }
    ShowMechanics = () =>{
        if(Array.isArray(this.state.mechanics)){
            return(
                <datalist id="mylist">
                    {this.state.mechanics.map(mechanic =>{
                        return(
                                <option 
                                    key={mechanic.id}
                                    value={mechanic.name}/>
                        )
                    })
                    }
                </datalist>
            )
        }
    }
    ToggleSubmitAvailable = () => {
        this.setState({submitAvailable: this.state.submitAvailable 
                            ? false : true})
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
    ToggleAddVehicleAvailable = () => {
        this.setState({addVehicle:false})
    }
    SetFlag = () =>{
        this.setState({flag:Math.random()})
    }
}
export default Driver;