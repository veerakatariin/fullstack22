const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://veera:${password}@part3.fvnsnds.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    "name": name,
    "number": number,
    "id": 7
})

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
else if (process.argv.length<4){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else {
  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
