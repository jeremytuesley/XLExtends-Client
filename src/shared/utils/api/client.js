import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from '@apollo/client';

import { getStoredAuthToken } from '../authToken';

const httpLink = createHttpLink({ uri: 'http://localhost:5000/v1/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getStoredAuthToken();

  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, Authorization: token ? `Bearer ${token}` : '' },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),

  link: from([authMiddleware, httpLink]),
});
