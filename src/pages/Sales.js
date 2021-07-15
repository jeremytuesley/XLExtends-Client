import React from "react";
import Catalog from "../components/Catalog";
import { GET_ALL_PRODUCTS } from "../shared/utils";
import { useQuery } from "@apollo/client";
import mockAPI from "../mockapi/mockapi.json";

const Sales = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  const filteredAPIData = mockAPI.getAllServices
    .concat(data?.getAllProducts)
    .filter((item) => item?.salePrice);

  return (
    <Catalog
      title="Sale Items"
      dataResult={filteredAPIData}
      loading={loading}
      error={error}
    />
  );
};

export default Sales;
