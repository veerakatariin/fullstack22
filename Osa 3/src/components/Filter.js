import React from 'react'

const Filter = ({handleFilterChange}) => {
    return(
    <div>
        <p>
            filter shown with <input onChange={handleFilterChange} /> 
        </p>
    </div>
    )
}

export default Filter