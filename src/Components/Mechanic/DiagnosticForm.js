import React, { Component } from 'react';
//Components
//CSS

class DiagnosticForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            runDiagnostic: false
        }
    }
    render(){
        return(
            <div>
                <button onClick={()=>this.setState({runDiagnostic: true})}>Započni dijagnostiku
                </button><br/>
                <>{this.state.runDiagnostic 
                ? <p>Unesite kod s dijagnostičkog uređaja:</p>
                : <></>
                }
                </>
            </div>
        )
    }
}
export default DiagnosticForm;