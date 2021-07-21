import { gql } from "@apollo/client";

const DELETE_PRODUCT = gql`
  mutation deleteProduct($deleteProductData: DELETE_PRODUCT_DATA) {
    deleteProduct(deleteProductData: $deleteProductData)
  }
`;

export default DELETE_PRODUCT;
