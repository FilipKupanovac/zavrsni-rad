import React, { Component } from 'react';
//Components
//CSS

class SparePart extends Component{
    constructor(props){
        super(props);
        this.state = {
            part: this.props.sparePart,
        }
    }
    render(){
        let {part} = this.state;
        return(
            <div onClick={() => this.props.pickPart(part)}
            className="spare-part">
                <p>{part.service_part}</p>
                <p>Proizvođač: {part.part_manufacturer}</p>
                <p>EAN: {part.ean}</p>
                <p>Cijena: {part.price}GBP</p>
            </div>
        )
    }
}
export default SparePart;