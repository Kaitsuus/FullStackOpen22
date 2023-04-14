import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from '../queries';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, {query: ALL_AUTHORS}],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: parseInt(published), genres},
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <Box>
      <Box component="form" onSubmit={submit}>
        <Box paddingTop={1}>
          <TextField
            size="small"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Box>
        <Box paddingTop={1}>
          <TextField
            size="small"
            value={author}
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Box>
        <Box paddingTop={1}>
          <TextField
            size="small"
            type="number"
            value={published}
            placeholder="Published"
            onChange={({ target }) => setPublished(target.value)}
          />
        </Box>
        <Box display={'flex'} paddingTop={1} gap={1}>
          <TextField
            size="small"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            placeholder="Genre"
          />
          <Button
            variant="contained"
            size="small"
            onClick={addGenre}
            type="button"
          >
            add genre
          </Button>
        </Box>
        <Box paddingTop={1}>
          <h4> genres: </h4> {genres.join(' ')}
        </Box>
        <Box paddingTop={1}>
          <Button variant="contained" size="small" type="submit">
            create book
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewBook;
