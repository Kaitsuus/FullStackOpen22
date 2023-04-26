import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';
import GenreButtons from './Genre';
import BooksTable from './BooksTable';

const Books = (props) => {
  const [genre, setGenre] = useState('');

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: {
      ...(genre && { genre }),
    },
  });

  if (!props.show) return null;

  const books = data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <BooksTable books={books} loading={loading} />
      <GenreButtons genre={genre} setGenre={setGenre} />
    </div>
  );
};

export default Books;