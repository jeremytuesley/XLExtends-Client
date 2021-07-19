import { gql } from "@apollo/client";

const CREATE_NEW_BOOKING = gql`
  mutation CreateNewBooking($createNewBookingData: CREATE_NEW_BOOKING_DATA) {
    createNewBooking(createNewBookingData: $createNewBookingData) {
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

export default CREATE_NEW_BOOKING;
