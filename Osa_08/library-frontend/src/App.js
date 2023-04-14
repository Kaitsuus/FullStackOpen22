import { useState } from 'react';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const App = () => {
  const [page, setPage] = useState('authors');

  return (
    <Box>
      <Box display="flex" gap="5px">
        <Button
          variant="contained"
          size="small"
          onClick={() => setPage('authors')}
        >
          authors
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setPage('books')}
        >
          books
        </Button>
        <Button variant="contained" size="small" onClick={() => setPage('add')}>
          add book
        </Button>
      </Box>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
    </Box>
  );
};

export default App;