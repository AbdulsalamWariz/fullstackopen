const { test, beforeEach, after } = require('node:test')

const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)
const url = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

after(async () => {
  await mongoose.connection.close()
})

test('Blog list application returns the correct amount of blog posts', async () => {
  const response = await api
    .get(url)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body
  assert.strictEqual(helper.initialBlogs.length, blogs.length)
})

test('Unique identifier property of the blog posts is named id', async () => {
  const response = await api.get(url)
  const blogs = await response.body

  assert.ok('id' in blogs[0])
  assert.ok('id' in blogs[1])
})

test('HTTP POST request to the /api/blogs URL works', async () => {
  await api.post(url).send(helper.testNewBlog).expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(n => n.author)
  assert(authors.includes('Supertest'))
})

test('Missing likes defaults to Zero (0)', async () => {
  await api.post(url).send(helper.missingLikesBlog).expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('Missing Title responds with 400 Bad Request', async () => {
  await api.post(url).send(helper.missingTitleBlog).expect(400)
})

test('Missing URL responds with 400 Bad Request', async () => {
  await api.post(url).send(helper.missingUrlBlog).expect(400)
})
