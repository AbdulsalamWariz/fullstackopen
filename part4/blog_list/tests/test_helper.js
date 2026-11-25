const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const testNewBlog = {
  title: 'New Test Blog',
  author: 'Supertest',
  url: 'https://google.com/',
  likes: 99,
}

const missingLikesBlog = {
  title: 'Missing Likes',
  author: 'Supertest',
  url: 'https://google.com/',
}
const missingTitleBlog = {
  author: 'Supertest',
  url: 'https://google.com/',
  likes: 30,
}
const missingUrlBlog = {
  title: 'Missing URL',
  author: 'Supertest',
  likes: 74,
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogId = async () => {
  const blogs = blogsInDb
  return blogs[0].id
}

module.exports = {
  initialBlogs,
  testNewBlog,
  blogsInDb,
  missingLikesBlog,
  missingTitleBlog,
  missingUrlBlog,
  blogId,
}
