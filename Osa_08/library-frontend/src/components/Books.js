import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks || [];

  return (
    <div>
      <TableContainer sx={{ minWidth: 250 }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <h2>Books</h2>
              </TableCell>
              <TableCell>
                <strong>Author</strong>
              </TableCell>
              <TableCell>
                <strong>Published</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Books;
