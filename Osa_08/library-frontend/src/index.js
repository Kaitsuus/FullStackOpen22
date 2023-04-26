import ReactDOM from 'react-dom/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'library-auth-token';

const authLink = setContext((_operation, { headers }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  return {
    headers: {
      ...headers,
      ...(authToken ? { authorization: `bearer ${authToken}` } : {})
    }
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
