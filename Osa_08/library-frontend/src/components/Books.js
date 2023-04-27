import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';
import { useBookAddedSubscription } from '../hooks';
import GenreButtons from './Genre';
import BooksTable from './BooksTable';

import { Box } from '@mui/material';

const Books = (props) => {
  const [genre, setGenre] = useState('');

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: {
      ...(genre && { genre }),
    },
  });

  useBookAddedSubscription();

  if (!props.show) return null;

  const books = data?.allBooks || [];


  return (
    <Box>
      <h2>books</h2>
      {genre && (<p>genre: {genre}</p>)}
    <BooksTable books={books} loading={loading} />
    <GenreButtons genre={genre} setGenre={setGenre} />
    </Box>
  );
};

export default Books;
