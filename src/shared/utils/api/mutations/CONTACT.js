import { gql } from "@apollo/client";

const CONTACT = gql`
  mutation Contact($contactData: CONTACT_DATA) {
    contact(contactData: $contactData)
  }
`;

export default CONTACT;
