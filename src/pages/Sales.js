import React from "react";
import Catalog from "../components/Catalog";
import { GET_ALL_PRODUCTS, GET_ALL_SERVICES } from "../shared/utils";
import { useQuery } from "@apollo/client";

const Sales = () => {
  const {
    loading: productLoading,
    error: productError,
    data: productData
  } = useQuery(GET_ALL_PRODUCTS);

  const {
    loading: serviceLoading,
    error: serviceError,
    data: serviceData
  } = useQuery(GET_ALL_SERVICES);

  const filteredAPIData = serviceData?.getAllServices
    .concat(productData?.getAllProducts)
    .filter((item) => item?.salePrice);

  return (
    <Catalog
      title="Sale Items"
      dataResult={filteredAPIData}
      loading={productLoading || serviceLoading}
      error={productError || serviceError}
    />
  );
};

export default Sales;
