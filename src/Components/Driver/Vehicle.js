import React from 'react';
//Components
//CSS
import '../../CSS/Vehicle.css'

const Vehicle = ({car, pickvehicle}) => {
    return(
        <div className="vehicle-card"
            onClick={() => pickvehicle(car)}
        >
            <p>Proizvođač: {car.manufacturer}</p>
            <p>Model: {car.model}</p>
            <p>Godina: {car.year}</p>
            <p>Snaga motora (KS): {car.horsepower}</p>
            <p>Pogon: {car.drivetrain}WD</p>
        </div>
    )
}

export default Vehicle;