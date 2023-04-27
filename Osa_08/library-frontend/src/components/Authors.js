import React from 'react';
import { useMutation ,useQuery } from '@apollo/client';
import { useState } from 'react';
import { EDIT_AUTHOR } from '../graphql/mutations';
import { ALL_AUTHORS } from '../graphql/queries';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import Button from '@mui/material/Button'
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [open, setOpen] = React.useState(false);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show || loading) return null;

  const authors = data.allAuthors;

  const handleSubmit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: +year } });

    setName('');
    setYear('');
    setOpen(true);
  };
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
                <TableCell>{a.born}</TableCell>
                <TableCell>{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
      <h2>Set birthyear</h2>
      <Box component="form" onSubmit={handleSubmit}>
        <Box paddingBottom={1}>
          <Select
            size="small"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((a) => (
              <MenuItem key={a.id} value={a.name}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box paddingBottom={1}>
          <TextField
            size="small"
            type="number"
            value={year}
            placeholder="Year"
            onChange={({ target }) => setYear(target.value)}
          />
        </Box>
        <Box>
          <Button variant="contained" size="small" type="submit">
            Update author
          </Button>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Author updated!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
      
    </div>
  );
};

export default Authors;
