import { gql } from "@apollo/client";

const CONTACT = gql`
  mutation setAvailability($date: String!) {
    setAvailability(setAvailabilityData: { date: $date })
  }
`;

export default CONTACT;
