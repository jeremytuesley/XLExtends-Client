import { gql } from "@apollo/client";

const DELETE_SERVICE = gql`
  mutation DeleteService($deleteServiceData: DELETE_SERVICE_DATA) {
    deleteService(deleteServiceData: $deleteServiceData)
  }
`;

export default DELETE_SERVICE;
