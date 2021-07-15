import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      available
      description
      images
      name
      price
      salePrice
      _id
    }
  }
`;

export default GET_ALL_PRODUCTS;
