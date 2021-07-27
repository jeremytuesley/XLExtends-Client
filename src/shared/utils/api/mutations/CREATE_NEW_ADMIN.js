import { gql } from '@apollo/client';

const CREATE_NEW_ADMIN = gql`
  mutation CreateNewAdmin($email: String!, $password: String!) {
    createNewAdmin(createNewAdminData: { email: $email, password: $password }) {
      authToken
    }
  }
`;

export default CREATE_NEW_ADMIN;
