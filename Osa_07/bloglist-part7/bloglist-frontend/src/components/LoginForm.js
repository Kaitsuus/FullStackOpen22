import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const headerStyle = {
    color: "#2a3eb1"
  };

  return (
    <Box>
      <h2 style={headerStyle}>Log in to application</h2>

      <Box component="form" onSubmit={handleSubmit}>
        <Box marginBottom={1}>
          <TextField
            size='small'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            placeholder='username'
          />
        </Box>
        <Box marginBottom={1}>
          <TextField
            size='small'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            placeholder='password'
          />
        </Box>
        <Button id="login-Button" type="submit" variant='contained'>
          login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
