import { Box } from '@mui/material';
import Bloglist from './Bloglist';
import NewBlog from './NewBlog';

const Blogview = ({ blogs, notify }) => {
  return (
    <Box>
      <h2>BLOGS</h2>
      <NewBlog notify={notify} />
      <Bloglist blogs={blogs} />
    </Box>
  );
};

export default Blogview;
