import React from "react";
import Catalog from "../components/Catalog";
import { GET_ALL_PRODUCTS } from "../shared/utils";
import { useQuery } from "@apollo/client";

const Products = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "no-cache"
  });

  return (
    <Catalog
      title="Products"
      dataResult={data?.getAllProducts}
      loading={loading}
      error={error}
    />
  );
};
export default Products;
