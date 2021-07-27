import React from "react";
import { useState } from "react";
import Error from "../components/Error";
import location from "../assets/location.png";
import { ADDRESS, PHNUMBER } from "../constants";

import useBookingModel from "../hooks/useBooking";
import "../assets/payment.scss";
import BookingPaymentForm from "../components/BookingPaymentForm";

const Booking = () => {
  const { bookingData } = useBookingModel();
  const [shipping, setShipping] = useState("true");

  const serviceCost = !bookingData?.salePrice
    ? bookingData?.price
    : bookingData?.salePrice;

  if (!bookingData) return <Error />;

  return (
    <div className="content">
      <div className="paymentPage">
        <BookingPaymentForm setShipping={(value) => setShipping(value)} />
        <div className="paymentItems bookingItems">
          <div className="paymentItemTitle">Order Summary</div>
          <div className="productCardsContainer">
            <div className="productCards">
              <div className="namePrice">
                <div>{bookingData.name}</div>
                {!bookingData.salePrice
                  ? `$${bookingData.price}`
                  : `$${bookingData.salePrice}`}
              </div>
              <div className="imageThumbnail">
                <img src={bookingData.images[0]} alt="itemThumbnail" />
              </div>
            </div>
            <div className="priceContainer">
              <div className="priceDetailContainer subtotalTop">
                <div>Service Cost</div>
                <div>${serviceCost}</div>
              </div>
              <div className="priceDetailContainer">
                <div>Booking Fee</div>
                {shipping === "true" ? <div>$15</div> : <div>$0</div>}
              </div>
            </div>
            <div className="totalPriceContainer">
              <div>
                Total
                {shipping === "true" && (
                  <div style={{ fontSize: "14px", color: "grey" }}>
                    Service Fee will be payable on site
                  </div>
                )}
              </div>
              <div>
                {shipping === "true" ? (
                  <div>
                    AUD$15
                    <br />
                  </div>
                ) : (
                  `AUD$${serviceCost}`
                )}
              </div>
            </div>
            <div>
              <div className="inputHeader">Location</div>
              <div className="pickupImageContainer">
                <img src={location} alt="googleMapImage" />
                <div className="inputHeader bookingLocHeader">
                  {ADDRESS}
                  <br />
                  {PHNUMBER}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
