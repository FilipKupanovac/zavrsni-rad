import React from 'react';
//Components
//CSS
import '../../CSS/Vehicle.css'

const Vehicle = ({car, pickvehicle}) => {
    return(
        <div className="vehicle-card"
            onClick={() => pickvehicle(car)}
        >
            <p>Manufacturer: {car.manufacturer}</p>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
            <p>Horsepower: {car.horsepower}</p>
            <p>Drivetrain: {car.drivetrain}WD</p>
        </div>
    )
}

export default Vehicle;