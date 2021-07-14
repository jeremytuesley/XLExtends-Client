import { gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      available
      creatorId {
        email
      }
      description
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

export default GET_ALL_PRODUCTS;
