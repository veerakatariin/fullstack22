
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

const initialBlogs = [
  {
      "title": "MammaBlogi",
      "author": "Maija",
      "url": "www.mammablogi.com",
      "likes": 58,
      "user": "64c50e2a25c583127fe36773"
  },
  {
      "title": "KissaBlogi",
      "author": "Kalle",
      "url": "www.kissablogi.com",
      "likes": 59,
      "user": "64c515bb45158e0878dc56e1"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })


test('Id has to be defined', async () => {
    const response = await api.get('/api/blogs')
    
    response.body.map(blog => {
        expect(blog.id).toBeDefined();
    })
  })

  test('New blog saved into the database', async () => {
    const newBlog =   {
      title: "KoiraBlogi",
      author: "Kalle Kallela",
      url: "www.koirablogi.com",
      likes: 6,
      user: "64c515bb45158e0878dc56e1"
  }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('KoiraBlogi')

  })

  test('If likes has no attribute, it will be set to 0', async () => {
    const newBlog =   {
      title: "KoiraBlogi",
      author: "Kalle Kallela",
      url: "www.koirablogi.com",
  }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes[2]).toEqual(0)

  })

  test('If the blog has no author or url, the blog will not be added to database', async () => {
    const newBlog =   {
      author: "Kalle Kallela",
      likes: 6
  }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('Delete blog by id', async () => {

    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
      .delete('/api/blogs/' + id)
      .expect(204)

    const blogsAfterDelete = await api.get('/api/blogs')
    expect(blogsAfterDelete.body).toHaveLength(initialBlogs.length - 1)
  })

  test('Update blogs likes colums', async () => {
    const newBlog =   {
      "title": "MammaBlogi",
      "author": "Maija",
      "url": "www.mammablogi.com",
      likes: 5000
  }

    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
      .put('/api/blogs/' + id)
      .send(newBlog)

    const updatedBlog = await api.get('/api/blogs')
    expect(updatedBlog.body[0].likes).toEqual(5000)
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      //const passwordHash = await bcrypt.hash('sekret', 10)
      //const user = new User({ username: 'root', name: 'groot', passwordHash })
      //await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'hemmolala',
        name: 'Hemmo Kissala',
        password: 'secrethemmo',
        blogs: []
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

  test('creation does not succeed with a too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'he',
      name: 'Hemmo Kissala',
      password: 'secrethemmo',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('creation does not succeed with a too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hemma',
      name: 'Hemmo Kissala',
      password: 'se',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
  
