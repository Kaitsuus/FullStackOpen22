const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = await request.user;

  const likes = body.likes === undefined ? 0 : body.likes;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const user = await request.user;
  const blog = await Blog.findById(request.params.id);

  const dataForBlogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  if (blog.user.toString() === user._id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      dataForBlogUpdate,
      { new: true }
    );
    response.json(updatedBlog);
  } else {
    response.status(401).json({
      error: 'no permission'
    });
  }
});

blogsRouter.put('/like/:id', userExtractor, async (request, response) => {
  const user = await request.user;

  if (user) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    response.json(updatedBlog);
  } else {
    response.status(401).json({
      error: 'no permission'
    });
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = await request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({
      error: 'no permission'
    });
  }
});

module.exports = blogsRouter;
