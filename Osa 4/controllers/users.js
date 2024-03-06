const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })

    if(username.length < 3 || password.length < 3){
      response.status(400).json()
      logger.error('The username and the password need to minimum of three characters long')
    }
    else {
      user
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    }

  })
  
  module.exports = usersRouter