import { gql } from "@apollo/client";

const GET_ALL_SERVICES = gql`
  query GetAllServices {
    getAllServices {
      _id
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
  }
`;

export default GET_ALL_SERVICES;
