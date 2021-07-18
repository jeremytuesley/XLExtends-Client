import { gql } from "@apollo/client";

const CREATE_NEW_SERVICE = gql`
  mutation createNewService(
    $available: Boolean!
    $description: String!
    $duration: Int!
    $images: [String!]!
    $name: String!
    $options: [String!]!
    $price: Float!
    $salePrice: Float
  ) {
    createNewService(
      createNewServiceData: {
        available: $available
        description: $description
        duration: $duration
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

export default CREATE_NEW_SERVICE;
