import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@mui/material';

const BooksTable = ({ books, loading }) => {
    return (
      <>
        <TableContainer sx={{ minWidth: 250 }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
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
      {loading && <p>loading books...</p>}
      </>
    );
  };
  
  export default BooksTable;