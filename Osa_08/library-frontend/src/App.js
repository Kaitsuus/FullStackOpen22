import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Button from '@mui/material/Button';
import LoginForm from './components/Login';
import Recommendations from './components/Recommendations';
import { Box } from '@mui/material';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'library-auth-token';

const App = () => {
  const [page, setPage] = useState('authors');
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)
  );

  const client = useApolloClient();

  const handleLogin = (authToken) => {
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);
    setAuthToken(authToken);
    setPage('authors');
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    setAuthToken(null);
    client.resetStore();
  };

  return (
    <Box>
      <Box display="flex" gap="5px">
        <Button
          variant="contained"
          size="small"
          onClick={() => setPage('authors')}
        >
          authors
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setPage('books')}
        >
          books
        </Button>
        {authToken && (
          <Button
            variant="contained"
            size="small"
            onClick={() => setPage('recommendations')}
          >
            recommendations
          </Button>
        )}
        {authToken && 
          <Button
            variant="contained"
            size="small"
            onClick={() => setPage('add')}
          >
            add book
          </Button>
        }
        {!authToken && 
          <Button
            variant="contained"
            size="small"
            onClick={() => setPage('login')}
          >
            Login
          </Button>
        }
        {authToken && 
          <Button
            variant="contained"
            size="small"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        }
      </Box>
      <Authors show={page === 'authors'} authToken={authToken} />
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommendations'} />
      <NewBook show={page === 'add'} />
      {page === 'login' && <LoginForm onLogin={handleLogin} />}
    </Box>
  );
};

export default App;
