import { useState } from "react";
import { createModel } from "hox";

const useBooking = () => {
  const [bookingData, setBookingData] = useState();

  return {
    bookingData,
    setBookingData
  };
};

export default createModel(useBooking);
