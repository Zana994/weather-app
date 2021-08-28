import React from 'react'

const DayCard = ({day, humidity, icon, min, max}) => {
    return (
        <div className="dayCard">
            <p> {day} </p>
            <p><span className= "humidityIcon"></span> {humidity} % </p>
            <span className= {`h${icon}`}> </span>
            <p> {`${Math.round(min)}°`} / {`${Math.round(max)}°`} </p>
        </div>
    )
}

export default DayCard
