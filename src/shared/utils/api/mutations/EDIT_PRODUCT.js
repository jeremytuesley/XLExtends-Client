import { gql } from "@apollo/client";

const EDIT_PRODUCT = gql`
  mutation EditProduct($editProductData: EDIT_PRODUCT_DATA) {
    editProduct(editProductData: $editProductData) {
      _id
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

export default EDIT_PRODUCT;
