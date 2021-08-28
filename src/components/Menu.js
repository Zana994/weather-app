import React from 'react'
import { useState } from 'react'

const Menu = ({ name, city, setLocation, handleClose, changeBgd }) => {
    const [checked, setchecked] = useState([true, false, false, false])
    const handleCheck = (index) => { 
        const updateChecked = checked.map((item, i) => {
            if(i === index) return !item;
            else if (i !== index && item === true) return !item;
            else return item;
        })
        setchecked(updateChecked)
        handleBgd(index)
    }

    const handleBgd = (index) => {
        (!checked[index]) ? changeBgd(`c${index}`) : changeBgd('c0')
    }

    return (
        <div className={`menu ${name}`}>
            <p> Your current location: </p>
            <p className="city" onClick = { () => {
                setLocation()
                handleClose()
            } }> {city} </p>

            <div className="bgd">
                <p> Change background color: </p>
                { checked.map((item, index) => {
                    return (
                        <div key={`color-${index}`}>
                            <label key="index">
                                <input type="checkbox" checked={checked[index]} onChange={() => {
                                    handleCheck(index);
                                }}></input>
                                <span className="checkmark"></span>
                            </label>
                            <span className={`color${index}`}></span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Menu
