import React, { useEffect, useState } from "react";
import { PAYMENT_INTENT } from "../shared/utils";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import useCartModel from "../hooks/useCart";
import { useFormik } from "formik";
import * as yup from "yup";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import "../assets/payment.scss";

const ProductPaymentForm = () => {
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

  const { loading, data } = useQuery(PAYMENT_INTENT, {
    fetchPolicy: "no-cache",
    variables: {
      paymentIntentData: {
        shipping: false,
        productId: concatItemIds(),
        discount: ""
      }
    }
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
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
      .email(
        "Please enter a valid email address, for example: example@gmail.com"
      )
      .trim()
      .required("*This field is required"),
    phoneNumber: yup
      .string("*Please enter a valid phone number")
      .required("*This field is required")
      .matches(phoneRegExp, "This phone number is not valid")
      .min(10, "Sorry, you've entered too few numbers")
      .max(10, "Sorry, you've entered too many numbers"),
    shipping: yup.bool()
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
      shipping: "true"
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className="paymentFormContainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="inputHeader">Contact Details</div>
        <div className="contactDetailContainer">
          <TextField
            className="names"
            name="firstName"
            label="*First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            className="names"
            name="lastName"
            label="*Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            name="email"
            label="*Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
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
              onChange={(event) => {
                formik.setFieldValue("shipping", event.target.value);
              }}
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
        </div>
        <CardElement
          className="cardElement"
          onChange={handleCreditCardChange}
        />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          className="submitButton"
          type="submit"
          disabled={processing || disabled || succeeded}
        >
          Submit Purchase
        </Button>
        <div className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded!
        </div>
      </form>
    </div>
  );
};

export default ProductPaymentForm;
