import React, { Component } from 'react';
import SparePart from './SparePart';
//Components
//CSS


class RecommendedParts extends Component{
    constructor(props){
        super(props);
        this.state = {
            car: this.props.car,
            diagnosys: this.props.diagnosys,
            diagnostic: this.props.diagnostic, //redak appointment tablice
            spareParts: undefined,
        }
    }
    render(){
        let {diagnostic} = this.props;
        return(//test -> umjesto div stavljen fragment, div u svakoj metodi zasebno
        <>
            {(diagnostic.service_part !== null && this.state.spareParts!== undefined)
            ? <>{this.ChooseParts()}</>
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
                    <button>Završi</button>
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
    ChooseParts = () => {
        let {/* car,diagnosys, */diagnostic} = this.props;
        let {spareParts} = this.state
        console.log("Svi dijelovi: ", spareParts)
        return(
            <>
                <div className="just-center">
                    <p>Potrebni su vam dijelovi tipa: {diagnostic.service_part}</p>
                </div>
                <div className="just-center">
                    <div className="flex space-around w70 wrap">{spareParts.map(part =>{
                        return(
                            <SparePart sparePart={part}/>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default RecommendedParts;