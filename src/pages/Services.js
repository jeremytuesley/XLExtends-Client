import { useQuery } from "@apollo/client";

import Catalog from "../components/Catalog";
import { GET_ALL_SERVICES } from "../shared/utils";

const Services = () => {
  const { loading, error, data } = useQuery(GET_ALL_SERVICES, {
    fetchPolicy: "no-cache"
  });

  return (
    <Catalog
      title="Beauty Services"
      dataResult={data?.getAllServices}
      loading={loading}
      error={error}
    />
  );
};

export default Services;
