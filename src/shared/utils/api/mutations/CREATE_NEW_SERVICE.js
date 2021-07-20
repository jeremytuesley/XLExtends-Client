import { gql } from "@apollo/client";

const CREATE_NEW_SERVICE = gql`
  mutation CreateNewService($createNewServiceData: CREATE_NEW_SERVICE_DATA) {
    createNewService(createNewServiceData: $createNewServiceData) {
      _id
      available
      creatorId {
        email
      }
      description
      duration
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
