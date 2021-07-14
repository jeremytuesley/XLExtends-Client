import { gql } from '@apollo/client';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      authToken
    }
  }
`;

export default LOGIN;
