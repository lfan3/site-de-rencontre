import React from 'react'
import PropTypes from 'prop-types'

export default function FormeFieldCard({type, id, placeholder, value, handleChange}){
    return(
        <div className = 'FormeField'>
        <label htmlFor='username'>Username</label>
        <input
            type = {type}
            id = {id}
            name = {id}
            placeholder = {placeholder}
            //very react way to handle the formulaire
            value = {value}
            onChange = {handleChange}
        />
        </div>
    )

}



