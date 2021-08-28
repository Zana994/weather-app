import './style/main.css';
import CurrentWeather from './components/CurrentWeather'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import DayCard from './components/DayCard';
import TodayInfo from './components/TodayInfo';

function App() {

   const api_weather = process.env.REACT_APP_API_WEATHER_KEY
   const [currentWeather, setcurrentWeather] = useState({})
   const [hourlyForecast, sethourlyForecast] = useState([])
   const [dailyForecast, setdailyForecast] = useState([])
   const [currentCity, setcurrentCity] = useState('')
   const [currentLoc, setcurrentLoc] = useState({lat: null, lon: null})
   const [searchCity, setsearchCity] = useState('')
   const [color, setcolor] = useState('')
   const [favoriteLoc, setFavoriteLoc] = useState('')

 
 
const fetchData = async (coordinates) => {
   const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${api_weather}`)
   const data = await result.json()

   return data
}

const findCity = async (coordinates) => {
    const result = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&limit=5&appid=${api_weather}`)
   const data = await result.json()

   return data
}

const setLocation = () => {
   if(navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(position => {
         setcurrentLoc({lat: position.coords.latitude, lon: position.coords.longitude})
      })
   }
}

useEffect(() => {
   setLocation()
}, [])

useEffect (() => {
   
   const setData = async () => {
      const data = await fetchData(currentLoc)
      const city = await findCity(currentLoc)
      
      setcurrentCity(city[0].name)
      if(!searchCity) { setFavoriteLoc(currentCity) }

      setcurrentWeather({
         dt: data.current.dt,
         sunrise: data.current.sunrise,
         sunset: data.current.sunset,
         temp: data.current.temp,
         feels_like: data.current.feels_like,
         humidity: data.current.humidity,
         uv_index: data.current.uvi,
         wind_speed: data.current.wind_speed,
         description: data.current.weather[0].main,
         icon: data.current.weather[0].icon,
         min_temp: data.daily[0].temp.min,
         max_temp: data.daily[0].temp.max
      })
      sethourlyForecast(data.hourly)
      setdailyForecast(data.daily)
   }
   if((currentLoc.lat && currentLoc.lon) !== null) 
      setData()
   
}, [currentLoc, currentCity])

/*setTimeout(setLocation, 300*1000)*/

const refreshData = () => { 
   setsearchCity('')
   setLocation() 
}
 
const handleLoc = (city, loc) => {
   setcurrentLoc({lat: loc.lat, lon: loc.lon})
   setsearchCity(city)
}


const dailyData = dailyForecast.map((obj, index) => {
   let time = new Date(obj.dt*1000);
   const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   return <DayCard key = {index.toString()} day = {(index === 0) ? 'Today' : week[time.getDay()]} humidity = {obj.humidity} icon = {obj.weather[0].icon} min = {obj.temp.min} max = {obj.temp.max} />
})
 
const changeBgd = (color) => { setcolor(color)}

  return (
    <div className={`App-container ${color}`}>
      <Navigation handleLoc = {handleLoc} city = {favoriteLoc} setLocation = {refreshData} changeBgd = {changeBgd} />
       
     <h1 className="title"> Weather </h1>
     
     <CurrentWeather currentWeather = {currentWeather} hourly = {hourlyForecast} daily = {dailyForecast} city = {currentCity} refreshData = {refreshData} />
     <div className="dailyForecast">
         {dailyData}
      </div>

      <TodayInfo uvi = {currentWeather.uv_index} sunrise = {currentWeather.sunrise} sunset = {currentWeather.sunset} wind = {currentWeather.wind_speed} humidity = {currentWeather.humidity} />

      <p className="copyright"> Copyright &copy; 2021 Zana </p>
     
    </div>
    
  );
}

export default App;
