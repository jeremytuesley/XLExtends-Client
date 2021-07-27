import { gql } from "@apollo/client";

const EDIT_SERVICE = gql`
  mutation EditService($editServiceData: EDIT_SERVICE_DATA) {
    editService(editServiceData: $editServiceData) {
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

export default EDIT_SERVICE;
