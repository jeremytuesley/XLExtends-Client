import React from "react";
import { GET_SERVICE } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import useBookingModel from "../hooks/useBooking";
// import BookingPaymentForm from "../components/BookingPaymentForm";

const Booking = () => {
  const { bookingData, setBookingData } = useBookingModel();
  console.log(bookingData);
  return "hi";
};

export default Booking;
