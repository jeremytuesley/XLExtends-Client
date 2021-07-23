import React, { useEffect, useState } from "react";
import { PAYMENT_INTENT } from "../shared/utils";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import useCartModel from "../hooks/useCart";
import { useFormik } from "formik";
import * as yup from "yup";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { TextField, Button } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "../assets/payment.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { cartData, setCart } = useCartModel();

  const concatItemIds = () => {
    let cartIds = [];
    cartData.forEach((element) => {
      if (!element.__typname === "Product") {
        cartIds.push(element._id);
      } else {
        cartIds.push(element._id);
      }
    });
    return cartIds;
  };

  const validationSchema = yup.object({
    name: yup
      .string("*Please enter your name")
      .trim()
      .required("*This field is required"),
    contact: yup
      .string("*Please enter an email address")
      .email(
        "Please enter a valid email address, for example: example@gmail.com"
      )
      .trim()
      .required("*This field is required")
    // shipping: yup.bool()
  });

  const arrayOfIds = concatItemIds();

  const { loading, data } = useQuery(PAYMENT_INTENT, {
    fetchPolicy: "no-cache",
    variables: {
      shipping: false,
      productId: arrayOfIds,
      //   serviceId: [id],
      discount: ""
    }
  });

  console.log(data?.paymentIntent);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(data, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      shipping: true
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className="content">
      <div className="paymentPage">
        <div className="paymentFormContainer">
          <form onSubmit={formik.handleSubmit}>
            <div className="inputHeader">Contact Details</div>
            <div className="contactDetailContainer">
              <TextField
                name="name"
                label="*Full Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                name="contact"
                label="*Email Address"
                variant="outlined"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </div>
            <div className="servicePaymentForm"></div>
            <div className="productPurchaseForm"></div>
            Payment Form here, render either booking form or product payment
            form
            <CardElement className="cardElement" onChange={handleChange} />
            <Button
              variant="contained"
              color="primary"
              className="submitButton"
              type="submit"
              disabled={processing || disabled || succeeded}
            >
              Submit Purchase
            </Button>
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
            <div
              className={succeeded ? "result-message" : "result-message hidden"}
            >
              Payment succeeded!
            </div>
          </form>
        </div>

        <div className="paymentItems">
          <div className="paymentItemTitle">Order Summary</div>
          <div className="productCardsContainer">
            {cartData.map((item, key) => {
              return (
                <div key={key} className="productCards">
                  <div className="namePrice">
                    <div>{item.name}</div>
                    {!item.salePrice ? `$${item.price}` : `$${item.salePrice}`}
                  </div>
                  <div className="imageThumbnail">
                    <img src={item.images[0]} alt="itemThumbnail" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="arrowIcon">
            <KeyboardArrowDownIcon />
          </div>
          <div className="subTotals">Totals</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
