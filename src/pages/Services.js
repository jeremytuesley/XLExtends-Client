import { useQuery } from "@apollo/client";

import Catalog from "../components/Catalog";
import { CHECK_AVAILABILITY, GET_ALL_SERVICES } from "../shared/utils";

const Services = () => {
  const {
    data: availabilityData,
    error: availabilityError,
    loading: availabilityLoading
  } = useQuery(CHECK_AVAILABILITY, {
    fetchPolicy: "no-cache",
    variables: { checkAvailabilityData: { quantity: 1, timeUnit: "week" } }
  });
  const { loading, error, data } = useQuery(GET_ALL_SERVICES);

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
