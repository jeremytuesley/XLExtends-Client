import { gql } from "@apollo/client";

const SIGN_REQUEST = gql`
  query SignRequest {
    signRequest {
      signature
      timestamp
    }
  }
`;

export default SIGN_REQUEST;
