import React, {Component} from 'react';
//Components
import Vehicle from './Vehicle'
//CSS
import '../../CSS/VehicleList.css'


class VehicleList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ownerId: this.props.id,
            ownerCars: [], //''
            count: 0
        }
    }

    render(){
        return(
            <div className="vehicle-list">
                <>{this.IterateCars()}</>
                {/* TEST */}
                <>{this.OnVehicleCountChange()}</>
            </div>
        )
    }
    //#region test
    OnVehicleCountChange = () => {
        let count = 0;
        fetch(`http://localhost:3000/cars/${this.state.ownerId}`)
        .then(response => response.json())
        .then(data => {
            count = data.length
            if(count !== this.state.ownerCars.length)
            {
                this.componentDidMount();
            }
        })
    }
    //#endregion

    FetchCars = () => {
        fetch(`http://localhost:3000/cars/${this.state.ownerId}`)
        .then(response => response.json())
        .then(cars => {
            this.setState({ownerCars: cars})
            //test
            this.setState({count:cars.length})
        })
    }

    IterateCars = () => {
        if(Array.isArray(this.state.ownerCars)){
            return(
                <>
                    {this.state.ownerCars.map(car =>{
                        return(
                            <Vehicle key={car.serial_number} car={car}
                                pickvehicle={this.props.pickvehicle}
                            />
                        )
                    })}
                </>
            )
        }
        else 
            return <></>
    }

    componentDidMount(){
        this.FetchCars();
    }
}

export default VehicleList;