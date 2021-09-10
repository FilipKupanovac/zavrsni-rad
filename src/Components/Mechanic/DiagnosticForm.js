import React, { Component } from 'react';
//Components
//CSS

class DiagnosticForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            runDiagnostic: false,
            diagnosticOutput: undefined,
        }
    }
    render(){
        return(
            <div className={this.props.warning? "warning": ""}>
                <>{this.state.runDiagnostic 
                ? <>{this.RunDiagnostic()}</>
                :  <button className="submit-button" 
                onClick={()=>this.setState({runDiagnostic: true})}>Započni dijagnostiku
                </button>
                }
                </>
            </div>
        )
    }

    RunDiagnostic(){
        return(
            <div>
                <div className="flex">
                    <p className="nomarg">Unesite kod s dijagnostičkog uređaja:</p>
                    <input onChange={this.onOutputChange}
                     type="text" maxLength="5"></input>
                    <button onClick={() => {
                        this.props.runDiagnostic(this.state.diagnosticOutput)
                    }
                    }>Potvrdi</button>
                </div>
                <button onClick={() =>this.setState({runDiagnostic:false})}>Odustani</button>
            </div>
        )
    }
    
    onOutputChange = (event) =>{
        this.setState({diagnosticOutput: event.target.value})
    }
}
export default DiagnosticForm;