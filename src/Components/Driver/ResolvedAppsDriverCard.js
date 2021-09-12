import React, {Component} from 'react';
//Components
//CSS

class ResolvedAppsDriverCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            part:undefined,
        }
    }
    render(){
        let {appointment} = this.props
        return(
            <div className="appointment-driver">
                <hr/>
                <p>{appointment.manufacturer} {appointment.model}</p>
                <div className="register-form">
                    <p className="pa-r nomarg">Dijagnostički kod pogreške: {appointment.code}</p>
                    <p className="nomarg">Opis pogreške: {appointment.description}</p>
                </div>
                <p>Serviser: {appointment.name}</p>
                <>{appointment.code === "P0000" ? <p>Pregled. Nije pronađena pogreška na automobilu.</p> 
                                                : <>{this.ShowService()}</>
                }
                </>
                <>{this.ShowPart()}</>
            </div>
        )
    }
    componentDidMount(){
        this.GetPart()
    }
    GetPart = () => {
        let {appointment} = this.props;
        if(appointment.ean !== null)
        fetch(`http://localhost:3000/get-part-ean/${this.props.appointment.ean}`)
        .then(res => res.json())
        .then(data => this.setState({part: data}))
    }
    ShowService = () =>{
        let {appointment} = this.props;
        return(<p>Učinjeni postupak: {appointment.service_note}</p>)
    }
    ShowPart = () =>{
        let {part} = this.state;
        let {appointment} = this.props;
        return(
            <>{(appointment.made_order !== 'N' && part !==undefined)
            ?   <>  <p>Zamijenjeni dio: {part.service_part} {part.part_manufacturer}, EAN: {part.ean}</p>
                    <p>Cijena izmijenjenog dijela: {part.price} GBP</p>
                </>
            :   <></>
            }</>
        )
    }
}
export default ResolvedAppsDriverCard;