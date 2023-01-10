import { useEffect, useState } from 'react'
import AddPersons from './components/AddPersons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Numbers from './services/Numbers'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState(persons)
  const [errorMsg, setErrorMsg] = useState(null)
  const [msgType, setMsgType] = useState() 


  useEffect(() => {
    Numbers
    .getPersons()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const notify = (type, task, name) => {

    if (type === 'success') {
      setMsgType('success')

      switch (task) {
        case 'addPerson':
          setErrorMsg(`Added ${name} to contacts!`)
          break;
        case 'updatePerson':
          setErrorMsg(`Updated ${name}'s number!`)
          break;
        case 'deletePerson':
          setErrorMsg(`Deleted ${name} from contacts!`)
          break;
        default:
      }
    } 
    else {
      setMsgType('error')
      setErrorMsg(`Error: ${name} has already been deleted`)
    }
    setTimeout(() => {
      setErrorMsg(null)
      setMsgType(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    const lastId = persons[persons.length -1].id

    const personObject = {
      name: newName,
      number: newNumber,
      id: lastId + 1
    }

    const old_name = persons.find(person => person.name === newName)
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`

    //updates the old contact
    if(old_name !== undefined){
      const confirm = window.confirm(message)

      if(confirm){
        Numbers.updatePerson(old_name.id, personObject)
        notify('success', 'updatePerson', newName)
      }
    }
    //creates a new contact
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      Numbers.addPerson(personObject)
      notify('success', 'addPerson', newName)
      .catch(error => {
        setErrorMsg(
          `${newName} couldn't be added to contacts, ${error}`
        )
      })
    }
}

  const deleteContact = (person) => {
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)

    if (confirm) {
      Numbers
        .deletePerson(person.id)
        .then(() => {
          Numbers
          .getPersons()
          .then(response => {
            setPersons(response.data)
          })
          .catch(error => {
            setErrorMsg(
              `${person.name} couldn't be deleted, ${error}`
            )
          })
          notify('success', 'deletePerson', person.name)
        }
    )}
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
      <Notification message={errorMsg} type={msgType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new contact</h2>
      <AddPersons newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact} />

      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} deleteContact={deleteContact} />


    </div>
  )
}


export default App
