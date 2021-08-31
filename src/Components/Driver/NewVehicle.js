import React, {Component} from 'react';
//Components
//CSS
import '../../CSS/Driver.css'

class NewVehicle extends Component {
    constructor(props){
        super(props);
        this.state = {
            manufacturer: undefined,
            model:undefined,
            year:undefined,
            serial: undefined,
            drivetrain:undefined,
            horsepower:undefined,
            license:undefined,

            flag: undefined
        }
        //TEST
    }
    render(){
        return(
            <div>
                <p>Input your vehicle's information</p>
                <label>Manufacturer</label>
                <input onChange={this.onManufacturerChange} type="text"></input>
                <label>Model</label>
                <input onChange={this.onModelChange} type="text"></input>
                <label>Year</label>
                <input onChange={this.onYearChange} type="number"></input>
                <label>Serial Number</label>
                <input onChange={this.onSerialChange} maxLength="17" type="text"></input>
                <label>Drivetrain</label>
                <select onChange={this.onDrivetrainChange}>
                    <option value=""></option>
                    <option value="A">AWD</option>
                    <option value="F">FWD</option>
                    <option value="R">RWD</option>
                </select>
                <label>Horsepower</label>
                <input onChange={this.onHorsepowerChange} type="number"></input>
                <label>License plate</label>
                <input onChange={this.onLicenseChange} maxLength="10" type="text"></input>
                <button onClick={() => {
                    this.AddNewVehicle();
                    this.props.toggleAddVehicle();
                }}>Add Vehicle</button>
                <button onClick={() => this.props.toggleAddVehicle()}>Cancel</button>
            </div>
        )
    }

    //#region input trackers
    onManufacturerChange = (event) =>{
        this.setState({manufacturer:event.target.value})
    }
    onModelChange = (event) =>{
        this.setState({model:event.target.value})
    }
    onYearChange = (event) =>{
        this.setState({year:event.target.value})
    }
    onSerialChange = (event) => {
        this.setState({serial: event.target.value})
    }
    onDrivetrainChange = (event) => {
        this.setState({drivetrain:event.target.value})
    }
    onHorsepowerChange = (event) =>{
        this.setState({horsepower:event.target.value})
    }
    onLicenseChange = (event) =>{
        this.setState({license:event.target.value})
    }
    //#endregion
    //#region checking
    ManufacModelCheck = () =>{
        if(this.state.manufacturer !== undefined && this.state.model !== undefined)
            return true;
        else return false;
    }
    YearCheck = () => {
        let date = new Date() 
        if(this.state.year <= date.getFullYear() && this.state.year >= 1990)
            return true;
        else return false;
    }
    DrivetrainCheck = () => {
        let {drivetrain} = this.state;
        if(drivetrain !== undefined && drivetrain !== "")
            return true;
        else return false;
    }
    SerialCheck = () => {
        return this.state.serial.length === 17 ? true : false;
    }
    //#endregion
    //Fetch post method to add new car
    AddNewVehicle = () =>{
        let {manufacturer,model,year,serial,drivetrain,horsepower,license}=this.state;

        if(this.ManufacModelCheck() && this.YearCheck() 
            && this.SerialCheck() && this.DrivetrainCheck() 
            && horsepower>0 && license !== undefined)
        {
            fetch(`http://localhost:3000/add-vehicle`, {
                method:'post',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: this.props.id,
                    manufacturer: manufacturer,
                    model: model,
                    year: year,
                    serial: serial,
                    drivetrain: drivetrain,
                    horsepower: horsepower,
                    license: license
                })            
            })
            .then(res => res.json())
            .then(data => {
                if(data.status !== 400)
                    this.props.setFlag()
            })
        }
    }
}
export default NewVehicle;