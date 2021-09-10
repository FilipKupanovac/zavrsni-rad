import React, { Component } from 'react';
//Components
//CSS


class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            part: undefined,
        }
    }
    render(){
        let {part} = this.state
        console.log("PART ORDER: ", part)
        return(
            <>
                <p>Narudženo, {this.props.ean}</p>
                <>{part !== undefined
                ?   <><div className="just-center">
                        <div className="w70 in-progress appointment-card">
                            <p>Dio naručen za servis: {part.service_part} {part.part_manufacturer}</p>
                            <p>EAN: {part.ean}</p>
                            <p>Cijena: {part.price}GBP</p>
                        </div>
                    </div>
                    <div className="just-center appointment-card">
                        <label>Unesite opis postupka</label>
                        <input type="text" placeholder="Opišite postupak"></input>
                    </div>
                    <div className="just-center">
                        <button>Završi servis</button>
                    </div>
                    </>
                : <></>
                }
                </>
            </>
        )
    }
    componentDidMount(){
        this.GetPart()
    }
    GetPart = () => {
        fetch(`http://localhost:3000/get-part-ean/${this.props.ean}`)
        .then(res => res.json())
        .then(data => this.setState({part: data}))
    }
}

export default Order