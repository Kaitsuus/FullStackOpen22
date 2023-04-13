import { Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Userlist = ({ users }) => {
  const countBlogs = (user) => {
    return user.blogs.length;
  };

  return (
      <div>
       <h2>Users</h2>
       <TableContainer sx={{ minWidth: 250 }} component={Paper}>
         <Table size="small">
           <TableHead>
             <TableRow>
               <TableCell>
                 <strong>name</strong>
               </TableCell>
               <TableCell align="right">
                 <strong>blogs created</strong>
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {users.map((user) => (
               <TableRow key={user.id}>
                 <TableCell>
                   <Link to={`/users/${user.id}`}>{user.username}</Link>
                 </TableCell>
                 <TableCell align="right">{countBlogs(user)}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
  );
};

export default Userlist;
