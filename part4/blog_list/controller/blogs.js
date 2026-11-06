const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  await response.json(blogs)
})

// blogsRouter.post('/', async (request, response) => {
//   const blog = new Blog({
//     title: request.body.title,
//     author: request.body.author,
//     url: request.body.url,
//     likes: request.body.likes || 0,
//   })

//   const savedBlog = await blog.save()
//   response.status(201).json(savedBlog)
// })

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
