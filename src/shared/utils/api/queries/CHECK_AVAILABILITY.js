import { gql } from "@apollo/client";

const CHECK_AVAILABILITY = gql`
  query CheckAvailability($checkAvailabilityData: CHECK_AVAILABILITY_DATA) {
    checkAvailability(checkAvailabilityData: $checkAvailabilityData)
  }
`;

export default CHECK_AVAILABILITY;
