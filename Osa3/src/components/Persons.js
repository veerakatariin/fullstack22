import React from 'react'

const Persons = props => {
    return(
        <div>              
      <ul>
        {props.filteredPersons.map(person =>
        <li key={person.name} person={person} > {person.name} {person.number} </li>
        )}
        </ul>
        </div>

    )
}

export default Persons