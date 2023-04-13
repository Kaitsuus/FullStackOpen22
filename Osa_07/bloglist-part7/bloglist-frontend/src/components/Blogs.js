import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Userlist from './Userlist';
import User from './User';
import Blogview from './Blogview';
import BlogDetails from './BlogDetails';

import { logoutUser } from '../reducers/userReducer';
import { initializeUsers } from '../reducers/usersReducer';
import {
  initializeBlogs,
  addLikeToBlog,
  addCommentToBlog,
  deleteBlog
} from '../reducers/blogReducer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const linkStyle = {
  textDecoration: "none",
  color: 'white'
};

const Blogs = ({ user, notify }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    notify('good bye!');
  };

  const showLoggedUser = () => (
    <Box>
      {user.name} logged in
    </Box>
  );

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector(({ users }) => {
    return users;
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    const likedBlog = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id
    };

    dispatch(addLikeToBlog(likedBlog)).then(() => {
      notify(`you liked '${likedBlog.title}' by ${likedBlog.author}`);
    });
  };

  const commentBlog = async ({ id, comment }) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedCommentlist = blog.comments.concat(comment);

    const commentedBlog = {
      ...blog,
      comments: updatedCommentlist,
      user: blog.user.id
    };

    dispatch(addCommentToBlog(commentedBlog)).then(() => {
      notify(
        `you added comment ${comment}' to '${commentedBlog.title}' by ${commentedBlog.author}`
      );
    });
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    dispatch(deleteBlog(id)).then(() => {
      notify('blog was succesfully removed');
    });
  };


  return (
    <Box >
      <AppBar>
        <List component={Stack} direction="row" width={150} padding={2}>
          <ListItem>
        <Link to="/" style={linkStyle}>
          BLOGS
        </Link>
        </ListItem>
        <ListItem>
        <Link to="/users" style={linkStyle}>
          USERS
        </Link>
        </ListItem>
        <ListItem>
        <Button variant='contained' onClick={logout} size='small' >logout</Button>
        </ListItem>
        </List>
      </AppBar>

      <Box marginTop={10}> {showLoggedUser()}</Box>

      <Routes>
        <Route path="/" element={<Blogview blogs={blogs} notify={notify} />} />
        <Route path="/blogs/" element={<Navigate to="/" replace />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blogs={blogs}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              commentBlog={commentBlog}
              user={user}
            />
          }
        />
        <Route path="/users/" element={<Userlist users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </Box>
  );
};

export default Blogs;
