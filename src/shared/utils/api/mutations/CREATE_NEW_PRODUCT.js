import { gql } from "@apollo/client";

const CREATE_NEW_PRODUCT = gql`
  mutation CreateNewProduct($createNewProductData: CREATE_NEW_PRODUCT_DATA) {
    createNewProduct(createNewProductData: $createNewProductData) {
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

export default CREATE_NEW_PRODUCT;
