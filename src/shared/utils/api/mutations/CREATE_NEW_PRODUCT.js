import { gql } from "@apollo/client";

const CREATE_NEW_PRODUCT = gql`
  mutation CreateNewProduct(
    $available: Boolean!
    $description: String!
    $images: [String!]!
    $name: String!
    $options: [String!]!
    $price: Float!
    $salePrice: Float
  ) {
    createNewProduct(
      createNewProductData: {
        available: $available
        description: $description
        images: $images
        name: $name
        options: $options
        price: $price
        salePrice: $salePrice
      }
    ) {
      available
      creatorId {
        email
      }
      description
      _id
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
