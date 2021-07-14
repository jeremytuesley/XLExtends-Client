import { gql } from "@apollo/client";

const CONTACT = gql`
  mutation Contact($comments: String!, $contact: String!, $name: String!) {
    contact(
      contactData: { comments: $comments, contact: $contact, name: $name }
    )
  }
`;

export default CONTACT;
