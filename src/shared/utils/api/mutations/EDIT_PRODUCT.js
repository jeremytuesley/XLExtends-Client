import { gql } from '@apollo/client';

const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $available: Boolean!
    $description: String!
    $images: [String!]!
    $name: String!
    $options: [String!]!
    $price: Float!
    $productId: ID!
    $salePrice: Float!
  ) {
    editProduct(
      editProductData: {
        available: $available
        description: $description
        images: $images
        name: $name
        options: $options
        price: $price
        productId: $productId
        salePrice: $salePrice
      }
    ) {
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
