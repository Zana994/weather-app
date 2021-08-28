import React from 'react'

const SearchResult = ({coordinates, city, country, newValue}) => {

    return (
        <div className="searchItem">
            <p onClick= {() => {
                newValue(city, coordinates);
             } }> {city}, {country}</p>
        </div>
    )
}

export default SearchResult
