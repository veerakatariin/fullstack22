const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', {username:1, name:1})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.get('/:id', (request, response) => {
    Blog
      .findById(request.params.id)
      .then(blog => {
        response.json(blog)        
      })
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    try{
      const token = request.token
      if(!token){
        return response.status(401).json({ error: 'missing or invalid token' })
      }
  
      const blog = await Blog.findById(id)
      // Check if the token matches user for the blog
      if(blog.user.toString() !== token.id.toString()){
        return response.status(401).json({ error: 'wrong user for blog' })
      }
  
      // Remove blog
      await blog.remove()
    } catch(e){
      next(e)
    }
  })

  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

      Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
  })
  
  blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const users = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: users.id 
    })

    if(blog.title === undefined || blog.url === undefined){
      response.status(400).json()
    }
    else if(blog.likes === undefined){
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.json(savedBlog)

    const user = {
      blogs: [savedBlog.id]
    }
    User.findByIdAndUpdate(users.id, user)

  })

  module.exports = blogsRouter

