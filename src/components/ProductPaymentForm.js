import React, { useEffect, useState } from "react";
import { PAYMENT_INTENT } from "../shared/utils";
import { useQuery } from "@apollo/client";
import useCartModel from "../hooks/useCart";
import { useFormik } from "formik";
import * as yup from "yup";
import location from "../assets/location.png";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { ADDRESS, PHNUMBER } from "../constants";
import "../assets/payment.scss";
import { Link } from "react-router-dom";

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
  shipping: yup.bool()
};

const shippingValidationSchema = {
  number: yup
    .string("*Please enter a valid street number")
    .trim()
    .required("*This field is required"),
  streetName: yup
    .string("*Please enter your street name")
    .trim()
    .required("*This field is required"),
  suburb: yup
    .string("*Please enter your suburb name")
    .trim()
    .required("*This field is required"),
  postcode: yup
    .string("*Please enter your postcode name")
    .trim()
    .matches(/^\d{4}$/, "Please enter a valid postcode")
    .required("*This field is required"),
  state: yup
    .string("*Please enter your state name")
    .trim()
    .required("*This field is required")
};

const ProductPaymentForm = ({ setShipping }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [validateSchema, setValidateSchema] = useState(initialValidationSchema);

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

  const { data } = useQuery(PAYMENT_INTENT, {
    fetchPolicy: "no-cache",
    variables: {
      paymentIntentData: {
        shipping: false,
        productId: concatItemIds(),
        discount: ""
      }
    }
  });

  const handleSubmit = async (values) => {
    console.log("submit");
    console.log(values);
    //   event.preventDefault();

    setProcessing(true);

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
      values.shipping = Boolean(values.shipping);
      setCart([]);
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
      shipping: "true",
      number: "",
      streetName: "",
      suburb: "",
      postcode: null,
      state: ""
    },
    validationSchema: yup.object(validateSchema),
    onSubmit: handleSubmit
  });

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    formik.setFieldValue("shipping", event.target.value);
  };

  useEffect(() => {
    if (formik.values.shipping === "true") {
      setValidateSchema({
        ...initialValidationSchema,
        ...shippingValidationSchema
      });
    } else {
      setValidateSchema(initialValidationSchema);
    }
  }, [formik.values.shipping]);

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
              aria-label="shipping"
              name="shipping"
              value={formik.values.shipping}
              onChange={handleShippingChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Delivery"
                labelPlacement="right"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="Pick Up"
                labelPlacement="right"
              />
            </RadioGroup>
          </div>
          {formik.values.shipping === "true" ? (
            <div className="shippingInfo">
              <div className="inputHeader">Shipping address</div>
              <TextField
                className="streetNumberField"
                name="number"
                label="*Street number"
                variant="outlined"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
              <TextField
                className="streetField"
                name="streetName"
                label="*Street name"
                variant="outlined"
                value={formik.values.streetName}
                onChange={formik.handleChange}
                error={
                  formik.touched.streetName && Boolean(formik.errors.streetName)
                }
                helperText={
                  formik.touched.streetName && formik.errors.streetName
                }
              />
              <TextField
                className="halfSizeField"
                name="suburb"
                label="*Suburb"
                variant="outlined"
                value={formik.values.suburb}
                onChange={formik.handleChange}
                error={formik.touched.suburb && Boolean(formik.errors.suburb)}
                helperText={formik.touched.suburb && formik.errors.suburb}
              />
              <TextField
                className="halfSizeField"
                name="postcode"
                label="*Postcode"
                variant="outlined"
                value={formik.values.postcode}
                onChange={formik.handleChange}
                error={
                  formik.touched.postcode && Boolean(formik.errors.postcode)
                }
                helperText={formik.touched.postcode && formik.errors.postcode}
              />
              <TextField
                className="halfSizeField"
                name="state"
                label="*State"
                variant="outlined"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </div>
          ) : (
            <div>
              <div className="inputHeader">Pickup Location</div>
              <div className="pickupImageContainer">
                <img src={location} alt="googleMapImage" />
                <div className="inputHeader">
                  {ADDRESS}
                  <br />
                  {PHNUMBER}
                </div>
              </div>
            </div>
          )}
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
          <div className="continueShoppingLink">
            Not finished yet?
            <br />{" "}
            <Link
              to="/products"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded!
        </div>
      </form>
    </div>
  );
};

export default ProductPaymentForm;
