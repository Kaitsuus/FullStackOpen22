import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

    if (!props.show) {
      return null
    }
    if (result.loading) {
      return <div>loading...</div>;
    }
    const authors = result.data.allAuthors || [];
  
    return (
      <div>
        <TableContainer sx={{ minWidth: 250 }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
              <h2>Authors</h2>
              </TableCell>
              <TableCell>
                <strong>Born</strong>
              </TableCell>
              <TableCell>
                <strong>Books</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((a) => (
              <TableRow key={a.name}>
                <TableCell>{a.name}</TableCell>
                <TableCell >{a.born}</TableCell>
                <TableCell >{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
  }
  
  export default Authors