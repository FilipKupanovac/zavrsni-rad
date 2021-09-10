import React, { Component } from 'react';
//Components
//CSS


class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            part: undefined,
            serviceNote: '',
        }
    }
    render(){
        let {part} = this.state
        return(
            <>
                <>{part !== undefined
                ?   <><div className="just-center">
                        <div className="w70 in-progress appointment-card">
                            <p>Dio naručen za servis: {part.service_part} {part.part_manufacturer}</p>
                            <p>EAN: {part.ean}</p>
                            <p>Cijena: {part.price}GBP</p>
                        </div>
                    </div>
                    <div className="just-center">                
                        <div className="w70 appointment-card">
                            <label>Unesite opis postupka</label><br></br>
                                <input type="text" placeholder="Opišite postupak"
                                style={{width: "100%", height: "1.5em"}}
                                onChange={this.onInputChange}
                                ></input>
                        </div>
                    </div>
                    <div className="just-center">
                        <button onClick={() => this.EndService()}
                        >Završi servis</button>
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
    onInputChange = (event) =>{
        this.setState({serviceNote: event.target.value})
    }
    GetPart = () => {
        fetch(`http://localhost:3000/get-part-ean/${this.props.ean}`)
        .then(res => res.json())
        .then(data => this.setState({part: data}))
    }
    EndService = () =>{
        let {diagnostic}=this.props
        let {serviceNote}=this.state
        if(serviceNote !== ''){
            fetch(`http://localhost:3000/end-service`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                appointment_number: diagnostic.appointment_number,
                service_note: serviceNote
            })
        })
        .then(res => res.json())
        .then(data =>{
            this.props.setFlag();
        })
        }
    }
}

export default Order