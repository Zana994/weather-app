import React from 'react'
import HourCard from './HourCard'

const CurrentWeather = ({currentWeather, hourly, city, refreshData}) => {
    const dateTime = new Date(currentWeather.dt*1000)
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let h = (dateTime.getHours() < 10) ? `0${dateTime.getHours()}` : dateTime.getHours()
    let m = (dateTime.getMinutes() < 10) ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()

    const hourlyData = hourly.map((obj, index) => {
        let time = new Date(obj.dt*1000);
        const t = {h: time.getHours(), m: time.getMinutes()}
        return <HourCard key = {index.toString()} time = {t} icon = {obj.weather[0].icon} temp = {obj.temp} humidity = {obj.humidity} />
    })

    
    return (
        <div className="card">
            <div className="location">
                <span className="locIcon"></span>
                <p> {city} </p>
                <button className="refresh" onClick={refreshData}></button>
            </div>
           
            <p className="time"> {week[dateTime.getDay()]}, {dateTime.getDate()} {month[dateTime.getMonth()]} {h}:{m}</p>

            <div className="tempBox">
                <p> <span className={`c${currentWeather.icon}`}></span> {`${Math.round(currentWeather.temp)}°`} </p>
                <p> <span>{currentWeather.description}</span> {`${Math.round(currentWeather.min_temp)}°`} / {`${Math.round(currentWeather.max_temp)}°`} <span> {`Feels like ${Math.round(currentWeather.feels_like)}°`}</span></p>
            </div>

            <div className="hourlyForecast">
               {hourlyData}
            </div>       
        
        </div>
    )
}

export default CurrentWeather
