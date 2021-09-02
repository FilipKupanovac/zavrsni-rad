import React, {Component} from 'react';
//Components

//CSS

class SubmitScheduleFrom extends Component{
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
                    >Schedule new appointment</button>
                )
            }
        else 
            return(
                <div>
                    <fieldset>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Preffered date</label>
                            <input
                                onChange={this.props.onDateChange}
                                type="date"
                            ></input>
                        </div>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Mechanic</label>
                            <input
                                onChange={this.props.onMechanicChange} 
                                placeholder="Start typing preffered mechanic"
                                type="search" list="mylist"></input>
                        </div>
                        <div className="fill-width pa05 flex">
                            <label className="submitlabel">Problem explanation</label>
                            <input className="problem-input"
                                onChange={this.props.onProblemChange}
                                type="text" placeholder="Please describe what's wrong with your vehicle (optional)"
                            ></input>
                        </div>
                    </fieldset>
                    <div className="flex-end">
                        <button
                            onClick={() => this.props.trySubmit()}
                        >
                            Schedule
                        </button>
                        <button
                            onClick={() => this.props.toggleSubmitAvailable()}
                            >
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
        else return <></>
        
    }
}
export default SubmitScheduleFrom