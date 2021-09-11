import React, {Component} from 'react';
//Components

//CSS

class SubmitScheduleForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            submitAvailable: this.props.submitAvailable,
            prevVehicle: undefined
        }
    }

    render(){
        if(this.props.pickedVehicle !== undefined){
            if(this.props.submitAvailable){
                return(
                    <button className="submit-button"
                        onClick={() => this.props.toggleSubmitAvailable()}
                    >Traži novi pregled</button>
                )
            }
        else 
            return(
                <div>
                    <fieldset>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Željeni datum</label>
                            <input
                                onChange={this.props.onDateChange}
                                type="date"
                            ></input>
                        </div>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Serviser</label>
                            <input
                                onChange={this.props.onMechanicChange} 
                                placeholder="Upišite naziv servisera"
                                type="search" list="mylist"></input>
                        </div>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Opis problema</label>
                            <input className="problem-input"
                                onChange={this.props.onProblemChange}
                                type="text" placeholder="Opišite problem koji ste uočili (neobavezno)"
                            ></input>
                        </div>
                    </fieldset>
                    <div className="flex-end">
                        <button
                            onClick={() => this.props.trySubmit()}
                        >
                            Zatraži pregled
                        </button>
                        <button
                            onClick={() => this.props.toggleSubmitAvailable()}
                            >
                            Odustani
                        </button>
                    </div>
                </div>
            )
        }
        else return <></>
        
    }
}
export default SubmitScheduleForm