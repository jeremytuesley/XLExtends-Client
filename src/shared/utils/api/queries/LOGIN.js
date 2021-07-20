import { gql } from "@apollo/client";

const LOGIN = gql`
  query Login($loginData: LOGIN_DATA) {
    login(loginData: $loginData) {
      authToken
    }
  }
`;

export default LOGIN;
