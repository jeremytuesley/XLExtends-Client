import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    getProduct(getProductData: { productId: $productId }) {
      available
      description
      images
      name
      options
      price
      salePrice
    }
  }
`;

export default GET_PRODUCT;
