import React from "react";
import { GET_SERVICE } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";

const Service = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SERVICE, {
    variables: { serviceId: id }
  });

  return (
    <ProductLayout
          dataResult={data?.getService}
          type="service"
      loading={loading}
      error={error}
    />
  );
};

export default Service;
