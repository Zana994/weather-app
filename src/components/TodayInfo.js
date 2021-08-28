import React from 'react'

const TodayInfo = ({uvi, sunrise, sunset, wind, humidity}) => {
    let index
    if(uvi >= 0 && uvi <= 2) index = 'Low'
    else if(uvi > 2 && uvi <= 5) index = 'Moderate'
    else if(uvi > 5 && uvi <= 7) index = 'High'
    else if (uvi > 7 && uvi <= 10) index = 'Very High'
    else index = 'Extreme'

    const sunriseTime = new Date(sunrise*1000)
    const sunsetTime = new Date(sunset*1000)

    return (
        <div className="info_container">
            <div>
                <div> <span className="uv_icon"></span> UV index </div>
                <p> {index} </p>
            </div>
            <div>
                <div> <span className="sunrise_icon"></span> Sunrise </div>
                <p> {(sunriseTime.getHours() < 10) ? `0${sunriseTime.getHours()}` : sunriseTime.getHours()}:
                    {(sunriseTime.getMinutes() < 10) ? `0${sunriseTime.getMinutes()}` : sunriseTime.getMinutes()} </p>
            </div>
            <div>
                <div> <span className="sunset_icon"></span> Sunset </div>
                <p> {(sunsetTime.getHours() < 10) ? `0${sunsetTime.getHours()}` : sunsetTime.getHours()}: 
                    {(sunsetTime.getMinutes() < 10) ? `0${sunsetTime.getMinutes()}` : sunsetTime.getMinutes()} </p>
            </div>
            <div>
                <div> <span className="wind_icon"></span> Wind </div>
                <p> {Math.round((wind*3600)/1000)} km/h </p>
            </div>
            <div>
                <div> <span className="humidity_icon"></span> Humidity </div>
                <p> {humidity} % </p>
            </div>
            
        </div>
    )
}

export default TodayInfo
