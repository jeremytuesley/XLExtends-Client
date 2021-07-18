import { gql } from "@apollo/client";

const GET_ALL_SERVICES = gql`
  query GetAllServices {
    getAllServices {
      available
      description
      images
      name
      options
      price
      salePrice
      _id
    }
  }
`;

export default GET_ALL_SERVICES;
