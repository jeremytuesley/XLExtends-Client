import React from "react";
import { GET_PRODUCT } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProductLayout from "../components/ProductLayout";

const Product = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    variables: { productId: id }
  });

  return (
    <ProductLayout
      dataResult={data?.getProduct}
      options={data?.getProduct.options}
      loading={loading}
      error={error}
    />
  );
};

export default Product;
