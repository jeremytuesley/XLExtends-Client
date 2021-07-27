import React, { useEffect, useState } from "react";
import { PAYMENT_INTENT } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";
import useBookingModel from "../hooks/useBooking";
import { useHistory } from "react-router-dom";


import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import "../assets/payment.scss";

const initialValidationSchema = {
  firstName: yup
    .string("*Please enter your first name")
    .trim()
    .required("*This field is required"),
  lastName: yup
    .string("*Please enter your last name")
    .trim()
    .required("*This field is required"),
  email: yup
    .string("*Please enter an email address")
    .email("Please enter a valid email address, for example: example@gmail.com")
    .trim()
    .required("*This field is required"),
  phoneNumber: yup
    .string("*Please enter a valid phone number")
    .trim()
    .matches(/^\d{10}$/, "Please enter a valid phone number")
    .required("*This field is required"),
  bookingFee: yup.bool()
};

const BookingPaymentForm = ({ setShipping }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [validateSchema, setValidateSchema] = useState(initialValidationSchema);
  const { bookingData } = useBookingModel();

  const { data } = useQuery(PAYMENT_INTENT, {
    fetchPolicy: "no-cache",
    variables: {
      paymentIntentData: {
        shipping: true,
        serviceId: [bookingData._id]
      }
    }
  });

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    formik.setFieldValue("bookingFee", event.target.value);
  };

  const handleSubmit = async (values) => {
    setProcessing(true);
    console.log("submitted");

    const payload = await stripe.confirmCardPayment(
      data?.paymentIntent?.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }
    );
    console.log("payload", payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      values.bookingFee = Boolean(values.bookingFee);
    }
  };

  const handleCreditCardChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      bookingFee: "true",
      comments: ""
    },
    validationSchema: yup.object(validateSchema),
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (formik.values.bookingFee === "true") {
      setValidateSchema({
        ...initialValidationSchema
      });
    } else {
      setValidateSchema(initialValidationSchema);
    }
  }, [formik.values.bookingFee]);

  return (
    <div className="paymentFormContainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="inputHeader">Contact Details</div>
        <div className="contactDetailContainer">
          <TextField
            className="halfSizeField"
            name="firstName"
            label="*First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            className="halfSizeField"
            name="lastName"
            label="*Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            className="fullSizeField"
            name="email"
            label="*Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            className="fullSizeField"
            name="phoneNumber"
            label="*Phone Number"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </div>
        <div className="productPurchaseForm">
          <div className="deliveryOptions">
            <RadioGroup
              row
              aria-label="payInFull"
              name="payInFull"
              value={formik.values.bookingFee}
              onChange={handleShippingChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Booking Fee Only"
                labelPlacement="right"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="Pay In Full"
                labelPlacement="right"
              />
            </RadioGroup>
          </div>
          <div className="cardField">
            <CardElement onChange={handleCreditCardChange} />
          </div>

          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          <div className="paymentButtonContainer">
            <Button
              variant="contained"
              color="primary"
              className="submitButton"
              type="submit"
              disabled={processing || disabled || succeeded}
            >
              Pay now
            </Button>
          </div>
          {succeeded && history.push("/success")}
        </div>
      </form>
    </div>
  );
};

export default BookingPaymentForm;
