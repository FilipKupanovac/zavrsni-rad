import React, { Component } from 'react';
//Components
import SparePart from './SparePart';
//CSS


class RecommendedParts extends Component{
    constructor(props){
        super(props);
        this.state = {
            car: this.props.car,
            diagnosys: this.props.diagnosys,
            diagnostic: this.props.diagnostic, //redak appointment tablice
            spareParts: undefined,
            pickedPart: undefined,
        }
    }
    render(){
        let {diagnostic} = this.props;
        return(
        <>
            {(diagnostic.service_part !== null && this.state.spareParts!== undefined)
            ? <>{this.ShowParts()}</>
            : <>{this.FinishService()}</>
            }
        </>
        )
    }
    componentDidMount(){
        this.GetParts()
    }

    FinishService = () =>{
        return(<>
            <div className="just-center">
                <p>Nije potrebno mijenjati ništa. Završite servis.</p>
                </div>
                <div className="just-center">
                    <button onClick={()=> {
                        this.EndService()
                    }}>Završi</button>
                </div>
            </>
        )
    }
    GetParts = () =>{
        let {diagnostic} = this.props;
        fetch(`http://localhost:3000/parts/${diagnostic.service_part}`)
        .then(res => res.json())
        .then(data => this.setState({spareParts: data}))
    }
    ShowParts = () => {
        let {/* car,diagnosys, */diagnostic} = this.props;
        let {spareParts, pickedPart} = this.state
        return(
            <>
                <div className="just-center">
                    <p>Potrebni su vam dijelovi tipa: {diagnostic.service_part}</p>
                </div>
                <div className="just-center">
                    <div className="flex space-around w70 wrap">{spareParts.map(part =>{
                        return(
                            <SparePart key={part.ean}
                                sparePart={part}
                                pickPart={this.PickPart}
                                //pickedPart={this.state.pickedPart} za drugačiju pozadinu odabranog dijela
                            />
                            )
                        })}
                    </div>
                </div>
                <>{pickedPart !== undefined
                ?   <div className="just-center">
                        <div className="w70 in-progress">
                            <p>Odabrali ste dio: {pickedPart.service_part} {pickedPart.manufacturer}, EAN: {pickedPart.ean}</p>
                            <p>Cijena: {pickedPart.price}GBP</p>
                            <div className="just-center">
                                <button>Naruči</button>
                            </div>
                        </div>
                    </div>
                : <></>
                }
                </>
            </>
        )
    }

    PickPart = (pick) =>{
        if(this.state.pickedPart !== undefined){
            if(pick.ean !== this.state.pickedPart.ean){
                this.setState({pickedPart: pick})
                //this.setState({submitAvailable: true})
            }
            else{
                this.setState({pickedPart: undefined})
            }
        }
        else{
            this.setState({pickedPart: pick})
            //this.setState({submitAvailable: true})
        }
    }

    EndService = () =>{
        let {diagnostic} = this.state;
        fetch(`http://localhost:3000/end-service`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                appointment_number: diagnostic.appointment_number
            })
        })
        .then(res => res.json())
        .then(data =>{
            this.props.setFlag();
        })
    }
}

export default RecommendedParts;