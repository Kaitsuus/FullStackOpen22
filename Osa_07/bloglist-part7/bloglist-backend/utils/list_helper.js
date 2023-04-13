const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const mostBlogs = (blogs) => {
  const groupByAuthorBlogs = _(blogs)
    .groupBy('author')
    .map((authorBlogList, author) => ({
      author: author,
      blogs: authorBlogList.length
    }))
    .sortBy('blogs')
    .reverse()
    .value()

  return blogs.length === 0 ? 'no blogs' : groupByAuthorBlogs[0]
}

const mostLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  const groupByAuthorLikes = _(blogs)
    .groupBy('author')
    .map((authorBlogList, author) => ({
      author: author,
      likes: _.reduce(authorBlogList, reducer, 0)
    }))
    .sortBy('likes')
    .reverse()
    .value()

  return blogs.length === 0 ? 'no blogs' : groupByAuthorLikes[0]
}

const favoriteBlog = (blogs) => {
  const blogList = blogs.map(({ author, title, likes }) => ({
    author,
    title,
    likes
  }))

  blogList.sort((a, b) => b.likes - a.likes)

  return blogs.length === 0 ? 'no blogs' : blogList[0]
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

module.exports = {
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
  dummy
}
