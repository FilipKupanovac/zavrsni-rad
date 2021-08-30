import React, { Component } from 'react';
//Components
//CSS

class PendingRequestResolveForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateChange : false,
            newDate : this.props.date,
        }
    }
    render(){
        return(
            <div>                
                <button onClick={() => this.ChangeDate()}>Promijeni Datum</button>
                <>{this.state.dateChange
                 ?  <input
                    onChange={this.SetNewDate}
                    type="date"
                    >
                    </input>
                 : <></>
                }
                </>
                <button
                    onClick={() => this.props.approveAppoint(this.state.newDate)}
                >Potvrdi</button>
                <button
                    onClick={() => this.props.rejectAppoint()}
                >Odbij zahtjev</button>
            </div>
    )}

    SetNewDate = (event) => {
        this.setState({newDate: event.target.value})
    }
    ChangeDate = (event) =>{
        this.setState({dateChange: true})
    }
}
export default PendingRequestResolveForm;