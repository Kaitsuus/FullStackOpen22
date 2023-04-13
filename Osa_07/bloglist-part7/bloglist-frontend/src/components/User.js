import { Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, } from '@mui/material';
import { useParams } from 'react-router-dom';

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((n) => n.id === id);

  if (!user) {
    return null;
  }
  return (
    <div>
      <h3>{user.name}</h3>
      <TableContainer sx={{ minWidth: 250 }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <p>
                  <b>added blogs</b>
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => (
               <TableRow key={blog.id}>
                 <TableCell>{blog.title}</TableCell>
               </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
