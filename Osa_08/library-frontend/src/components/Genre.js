import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const GenreButtons = ({ genre, setGenre }) => {
  const { data, loading } = useQuery(ALL_BOOKS);

  if (loading) return null;

  const genres = new Set([].concat(...data.allBooks.map((b) => b.genres)));

  return (
    <>
        <Box paddingTop={1}>
          <Button variant="contained" size="small" disabled={!genre} onClick={() => setGenre('')}>
            all genres
          </Button>
          {[...genres].map((g) => (
        <Button variant="contained" size="small" key={g} disabled={genre === g} onClick={() => setGenre(g)}>
          {g}
        </Button>
        ))}
        </Box>
    </>
  );
};

export default GenreButtons;