import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const style = {
    padding: 3,
    margin: 5
  };
  const linkStyle = {
    textDecoration: 'none'
  };

  return (
    <div style={style} className="blog">
      <Link style={linkStyle} to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  );
};

export default Blog;
