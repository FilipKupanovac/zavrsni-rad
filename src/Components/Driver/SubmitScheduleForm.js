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
                    <button
                        onClick={() => this.props.toggleSubmitAvailable()}
                    >Schedule new appointment</button>
                )
            }
        else 
            return(
                <div>
                    <fieldset>
                        <div>
                            <label>Preffered date</label>
                            <input
                                onChange={this.props.onDateChange}
                                type="date"
                                min=""
                            ></input>
                        </div>
                        <div>
                            <label>Mechanic</label>
                            <input
                                onChange={this.props.onMechanicChange} 
                                placeholder="Start typing preffered mechanic"
                                type="search" list="mylist"></input>
                        </div>
                        <div>
                            <label>Problem explanation</label>
                            <input
                                onChange={this.props.onProblemChange}
                                type="text" placeholder="Please describe what's wrong with your vehicle (optional)"
                            ></input>
                        </div>
                    </fieldset>
                    <div>
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