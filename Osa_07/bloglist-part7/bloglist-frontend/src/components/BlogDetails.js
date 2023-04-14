import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const BlogButtons = ({ blog, likeBlog, removeBlog, commentBlog, own }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    commentBlog({ id: blog.id, comment });
    setComment('');
  };
  return (
    <Box>
      <Box marginTop={1}>
        <Button
          variant="contained"
          size="small"
          onClick={() => likeBlog(blog.id)}
        >
          like this blog
        </Button>
      </Box>
      <Box marginTop={1}>
        {own && (
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/') || removeBlog(blog.id)}
          >
            remove this blog
          </Button>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Box marginTop={1}>
          <TextField
            multiline
            size="small"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="your comment of the blog"
          />
        </Box>
        <Box marginTop={1}>
          <Button
            variant="contained"
            size="small"
            id="create-comment"
            type="submit"
          >
            add comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const BlogDetails = ({ blogs, likeBlog, removeBlog, commentBlog, user }) => {
  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous';
  const own = blog.user && user.username === blog.user.username;

  if (!blog) {
    return null;
  }

  return (
    <Box>
      <h3>{blog.title}</h3>
      <p>
        <b>blog author:</b> {blog.author}
      </p>
      <Box>
        <b> blog url:</b>
        <a href={blog.url}>{blog.url}</a>
      </Box>
      <p>
        blog has <b>{blog.likes}</b> likes
      </p>
      <p>
        blog was added by: <b>{addedBy}</b>
      </p>
      <p>
        blog comments:
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>
              <b> {comment} </b>
            </li>
          ))}
        </ul>
      </p>
      <BlogButtons
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        commentBlog={commentBlog}
        own={own}
      />
    </Box>
  );
};

export default BlogDetails;
