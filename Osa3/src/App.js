import { useEffect, useState } from 'react'
import AddPersons from './components/AddPersons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState(persons)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

   const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const old_names = persons.map(person => person.name)
    const message = `${newName} is already added to phonebook`

    old_names.includes(newName) ? alert(message) : 
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new contact</h2>
      <AddPersons newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact} />

      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} />


    </div>
  )
}


export default App
