import React from "react";
import Error from "./Error";
import Loading from "./Loading";

const ProductLayout = ({ dataResult, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <Error />;
  return <h1>{dataResult.name}</h1>;
};

export default ProductLayout;
