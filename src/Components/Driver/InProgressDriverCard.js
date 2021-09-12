import React, {Component} from 'react';
//Components
//CSS

class InProgressDriverCard extends Component{
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
                <>{appointment.note !== null
                 ? <p>Opis problema: {appointment.note}</p>
                 : <></>
                }</>
                <p>Serviser: {appointment.name}</p>
                <div className="register-form">
                    <p className="pa-r nomarg">Dijagnostički kod pogreške: {appointment.code}</p>
                    <p className="nomarg">Opis pogreške: {appointment.description}</p>
                </div>
                <>{appointment.code === "P0000" ? <p>Čekajte dok serviser ne zaključi postupak</p> : <>{this.ShowProblem()}</>
                }
                </>
                <>{appointment.code === 'P0000' ? <></>: this.ShowPart()}</>
            </div>
        )
    }
    componentDidMount(){
        this.GetPart()
    }
    ShowProblem = () =>{
        let {appointment} = this.props;
        return(
            <>
            <p>Predloženi postupak: {appointment.recommend_action}</p>
            </>
        )
    }
    GetPart = () => {
        let {appointment} = this.props;
        if(appointment.ean !== null )
        fetch(`http://localhost:3000/get-part-ean/${this.props.appointment.ean}`)
        .then(res => res.json())
        .then(data => this.setState({part: data}))
    }
    ShowPart = () =>{
        let {part} = this.state;
        let {appointment} = this.props;
        return(
            <>{(appointment.made_order !== 'N' && part !==undefined)
            ?   <>
                    <p>Naručili ste: {part.service_part} {part.part_manufacturer}</p>
                    <p>Cijena: {part.price} GBP</p>
                    <p>Po pozivu servisera odvezite vozilo na servis.</p>
                </>
            :   <>
                    <p>Potreban vam je zamjenski dio: {appointment.service_part}.</p>
                    <p>U dogovoru s mehaničarom odaberite zamjenski dio za vaše vozilo.</p>
                </>
            }
            </>
        )
    }
}
export default InProgressDriverCard;