import React from "react";
import { GET_PRODUCT } from "../shared/utils";
import { useQuery } from "@apollo/client";

const Product = () => {
  //   const { loading, error, data } = useQuery(GET_PRODUCT);

  return "hi im Product";
  // <Product
  //   title="Product"
  //   dataResult={data?.getProduct}
  //   loading={loading}
  //   error={error}
  // />
};

export default Product;
