import { ApolloClient, ApolloLink, from, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { getStoredAuthToken } from "../authToken";

const httpLink = createUploadLink({ uri: process.env.REACT_APP_API_URI });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getStoredAuthToken();

  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, Authorization: token ? `Bearer ${token}` : "" }
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),

  link: from([authMiddleware, httpLink])
});
