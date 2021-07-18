import { gql } from "@apollo/client";

const GET_SERVICE = gql`
  query GetService($serviceId: ID!) {
    getService(getServiceData: { serviceId: $serviceId }) {
      available
      description
      duration
      _id
      images
      name
      options
      price
      salePrice
    }
  }
`;

export default GET_SERVICE;
