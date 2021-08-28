import React from 'react'
import Menu from './Menu'
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import SearchResult from './SearchResult'

const Navigation = ({ handleLoc, city, setLocation, changeBgd }) => {
    const [isActive, setactive] = useState(false)
    const [show, setshow] = useState(false)
    const handleToggle = () => { setactive(prevelem => !prevelem) }
    const handleToggleForSearch = () => { setshow(prevelem => !prevelem) }
    const [suggestions, setsuggestions] = useState([])
    const api_geo = process.env.REACT_APP_API_GEO_KEY
    const handleClose = () => { setactive(false) }
    const [sugg, setsugg] = useState([])
    const [input, setinput] = useState('')

    const newValue = (city, loc) => {
        setinput('')
        handleLoc(city, loc)
        handleToggleForSearch()
    }

    const fetchData = (input) => {  
        fetch(`https://app.geocodeapi.io/api/v1/autocomplete?apikey=${api_geo}&text=${input}&size=5`)
        .then(response => response.json())
        .then(data => {
            setsugg([])
            data.features.forEach((obj, index) => {
                const city = obj.properties.name
                const country = obj.properties.country
                const coordinates = {
                   lat: obj.geometry.coordinates[1],
                   lon: obj.geometry.coordinates[0]
                }
                setsugg(prevelem => [...prevelem, <SearchResult key = {`${index}`} coordinates = {coordinates} city = {city} country = {country} newValue = {newValue} />])
            })
        })
        .catch(error => {
            alert('Unable to get location suggestions!')
            console.log(error)
        })
    }

    const debouncedLocationSuggestions = useCallback(debounce(fetchData, 500), [])

    useEffect(() => {
        if(input) {
            debouncedLocationSuggestions(input)
            setsuggestions(sugg)
        }
        else {
            setsuggestions([])
        }
    }, [input, sugg])    
    
    return (
        <div>
            <nav>
                <div onClick={handleToggle}>
                <div className={`burgerNav ${isActive ? 'active' : '' }`}></div>
                </div>
                <Menu name = {isActive ? 'showMenu' : ''} city = {city} setLocation = {setLocation} handleClose = {handleClose} changeBgd = {changeBgd} />
                
                
                <div className='addLocation' onClick={handleToggleForSearch}></div>
                
                <div className={`add ${show ? 'showLocation' : ''}`}>
                    <input placeholder='Search for city...' value = {input} onChange={
                        (e) => { 
                            setsuggestions([])
                            setinput(e.target.value) 
                        }
                    }></input>
                    
                    <div className="suggContainer">
                    {suggestions}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation
