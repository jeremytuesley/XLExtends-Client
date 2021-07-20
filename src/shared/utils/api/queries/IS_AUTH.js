import { gql } from "@apollo/client";

const IS_AUTH = gql`
  query IsAuth {
    isAuth
  }
`;

export default IS_AUTH;
