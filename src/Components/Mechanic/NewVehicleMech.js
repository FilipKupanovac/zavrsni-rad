import React, {Component} from 'react';
//Components
//CSS

class NewVehicleMech extends Component {
    constructor(props){
        super(props);
        this.state = {
            driverId: undefined,
            manufacturer: undefined,
            model:undefined,
            year:undefined,
            serial: undefined,
            drivetrain:undefined,
            horsepower:undefined,
            license:undefined,

            flag: undefined
        }
    }
    render(){
        return(
            <div className="appointments">
                <div className="padding-block">
                    <p className="nomarg marg-bot">Unesite podatke novog vozila</p>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>ID Vlasnika</label></div>
                        <input onChange={this.onOwnerChange}
                            type="text"></input>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Proizvođač</label></div>
                        <input onChange={this.onManufacturerChange} type="text"></input>
                    </div>                
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Model</label></div>
                        <input onChange={this.onModelChange} type="text"></input>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Godina</label></div>
                        <input onChange={this.onYearChange} type="number"></input>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Serijski broj</label></div>
                        <input onChange={this.onSerialChange} maxLength="17" type="text"></input>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Pogon</label></div>
                        <select onChange={this.onDrivetrainChange}>
                            <option value=""></option>
                            <option value="A">AWD</option>
                            <option value="F">FWD</option>
                            <option value="R">RWD</option>
                        </select>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Snaga motora (KS)</label></div>
                        <input onChange={this.onHorsepowerChange} type="number"></input>
                    </div>
                    <div className="register-form marg-half-bot">
                        <div className="new-vehicle"><label>Registracijska oznaka</label></div>
                        <input onChange={this.onLicenseChange} maxLength="10" type="text"></input>
                    </div>
                    <div className="marg-top">
                        <button onClick={() => {
                            this.AddNewVehicle();
                            this.props.toggleAddVehicle();
                        }}>Dodaj vozilo</button>
                        <button onClick={() => this.props.toggleAddVehicle()}>Odustani</button>
                    </div>
                </div>
            </div>
        )
    }

    //#region input trackers
    onOwnerChange = (event) => {
        this.setState({driverId: event.target.value})
    }
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
        let {driverId,manufacturer,model,year,serial,drivetrain,horsepower,license}=this.state;
        if(this.ManufacModelCheck() && this.YearCheck() 
            && this.SerialCheck() && this.DrivetrainCheck() 
            && horsepower>0 && license !== undefined
            && driverId !== undefined)
        {
            fetch(`http://localhost:3000/add-vehicle`, {
                method:'post',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: driverId,
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
            .catch(err => console.log)
        }
    }
}
export default NewVehicleMech;