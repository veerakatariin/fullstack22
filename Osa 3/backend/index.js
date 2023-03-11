const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let notes = [
]

const amountOfNotes = () => {
  
    amount = 0;
    for(let i = 0; i<notes.length; i++){
        amount = amount + 1;
    }
    return amount
}

const newId = () => {
  return Math.random() * (500 - 0) + 0
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
    notes = persons
  })
})

app.get('/info', (req, res) => {
    res.send(`
    <div>Phonebook has info for ${amountOfNotes()} people</div>
    <div>${new Date()}</div>`)
})

app.get('/api/persons/:userid', (req, res, next) => {
  Person.findById(req.params.userid).then(person => {
    res.json(person)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  for(let i=0; i<notes.length; i++){
    if(body.name == notes[i].name){
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  }
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  else if(!body.number){
    return res.status(400).json({
    error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: newId(),
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})