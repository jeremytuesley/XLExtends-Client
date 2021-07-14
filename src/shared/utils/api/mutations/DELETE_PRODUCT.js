import { gql } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(deleteProductData: { productId: $productId })
  }
`;

export default DELETE_PRODUCT;
