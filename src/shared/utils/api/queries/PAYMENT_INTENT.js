import { gql } from "@apollo/client";

const PAYMENT_INTENT = gql`
  query PaymentIntent($paymentIntentData: PAYMENT_INTENT_DATA) {
    paymentIntent(paymentIntentData: $paymentIntentData) {
      clientSecret
    }
  }
`;

export default PAYMENT_INTENT;
