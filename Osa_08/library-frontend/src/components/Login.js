import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: { value: token } }) => onLogin(token)
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Box paddingTop={1}>
          <TextField
            size="small"
            value={username}
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box paddingTop={1}>
          <TextField
            size="small"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Box paddingTop={1}>
          <Button variant="contained" size="small" type="submit">
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
