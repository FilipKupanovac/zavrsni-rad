import React, { Component } from 'react';
//Components
import RecommendedParts from './RecommendedParts';
//CSS

class InProgressCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diagnosticCode: undefined,
            car: undefined
        }
    }
    render(){
        let {diagnostic} = this.props;
        let {diagnosticCode,car} = this.state
        return(
            <>
            <hr/>
            <div className="appointment-card">
                    {(diagnosticCode !== undefined && car !== undefined)
                    ? <>
                        <p>{car.manufacturer} {car.model}</p>
                        <p>Servisni broj: {diagnostic.appointment_number}, Kod pogreške: {diagnostic.code}</p>
                        <p>Opis problema: {diagnosticCode.description}</p>
                        <p>Preporučena radnja: {diagnosticCode.recommend_action}</p>
                        <>{this.GetRecommendedParts()}</>
                      </>
                    : <></>
                    }
            </div>
            </>
        )
    }
    componentDidMount(){
        this.GetDiagnostic()
        this.GetCar()
    }
    GetDiagnostic = () =>{
        let {diagnostic} = this.props;
        fetch(`http://localhost:3000/diagnostic-code/${diagnostic.code}`)
        .then(res => res.json())
        .then(data =>{
            if(data !== "Code not found"){
                this.setState({diagnosticCode: data});
            }
        })
    }
    GetCar = () => {
        let {diagnostic} = this.props;
        fetch(`http://localhost:3000/car/${diagnostic.serial_number}`)
        .then(res => res.json())
        .then(data =>{
                this.setState({car: data});
        })
    }

    GetRecommendedParts = () => {
        return(
            <RecommendedParts car={this.state.car} diagnosys={this.state.diagnosticCode} diagnostic={this.props.diagnostic}
            setFlag={this.props.setFlag}
            />
        )
    }
}
export default InProgressCard