import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url, likes: 0 });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <Box>
      <h2>Create new</h2>

      <Box component="form" onSubmit={handleSubmit}>
        <Box marginBottom={1}>
          <TextField
            multiline
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </Box>
        <Box marginBottom={1}>
          <TextField
            multiline
            size="small"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </Box>
        <Box>
          <TextField
            multiline
            size="small"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </Box>
        <Box marginBottom={1} marginTop={1}>
          <Button
            variant="contained"
            size="small"
            id="create-butto"
            type="submit"
          >
            create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewBlogForm;
