import { gql } from "@apollo/client";

const CONTACT = gql`
  mutation Contact(
    $comments: String!
    $contact: String!
    $files: [Upload!]!
    $name: String!
  ) {
    contact(
      contactData: {
        comments: $comments
        contact: $contact
        files: $files
        name: $name
      }
    )
  }
`;

export default CONTACT;
