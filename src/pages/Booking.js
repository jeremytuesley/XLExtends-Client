import React from "react";
import { GET_SERVICE } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
// import BookingPaymentForm from "../components/BookingPaymentForm";

const Booking = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SERVICE, {
    variables: { serviceId: id }
  });

  return "hi";
};

export default Booking;
