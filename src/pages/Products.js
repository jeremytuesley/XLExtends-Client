import React from "react";
import Catalog from "../components/Catalog";
import { GET_ALL_PRODUCTS } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Products = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

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
