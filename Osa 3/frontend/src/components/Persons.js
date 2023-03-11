import React from 'react'

const Persons = props => {

    return(
        <div>              
      <ul>
        {props.filteredPersons.map(person =>
        <li key={person.id} person={person} > 
        {person.name} {person.number} 
        <button onClick={() => props.deleteContact(person)}>delete</button>

        </li>
        )}
        </ul>
        </div>

    )
}

export default Persons