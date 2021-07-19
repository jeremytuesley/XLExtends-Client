import { gql } from "@apollo/client";

const CHECK_AVAILABILITY = gql`
  query CheckAvailability($checkAvailabilityData: CHECK_AVAILABILITY_DATA) {
    checkAvailability(checkAvailabilityData: $checkAvailabilityData) {
      _id
      comments
      customer {
        email
        firstName
        lastName
        phoneNumber
      }
      duration
      paymentId
      serviceId {
        available
        creatorId {
          email
        }
        description
        duration
        images
        lastEditorId {
          email
        }
        name
        options
        price
        salePrice
      }
      startTime
    }
  }
`;

export default CHECK_AVAILABILITY;
