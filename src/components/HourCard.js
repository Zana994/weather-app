import React from 'react'

const HourCard = ({time, icon, temp, humidity}) => {
    let h = (time.h < 10) ? `0${time.h}` : time.h
    let m = (time.m < 10) ? `0${time.m}` : time.m
    return (
        <div className="cardForHours">
            <span> {h}:{m} </span>
            <span className={`h${icon}`}></span>
            <span> {`${Math.round(temp)}°`} </span>
            <p>
            <span className="humidity"></span>  {humidity}%
            </p>
        </div>
    )
}

export default HourCard
