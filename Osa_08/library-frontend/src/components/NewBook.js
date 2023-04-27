import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries';
import { ADD_BOOK } from '../graphql/mutations';
import { addOrUpdateCachedQueryArrayItem } from '../graphql/utils';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) return null;

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { author, genres, published: +published, title },

      update: (cache, { data: { addBook: book } }) => {
        addOrUpdateCachedQueryArrayItem(
          cache,
          { query: ALL_AUTHORS },
          book.author
        );

        [{ query: ALL_BOOKS }]
          .concat(
            genres.map((g) => ({
              query: ALL_BOOKS,
              variables: { genre: g },
            }))
          )
          .forEach((query) =>
            addOrUpdateCachedQueryArrayItem(cache, query, book)
          );
      },
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
