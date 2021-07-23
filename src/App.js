import React from "react";
import { Route, Switch } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Admin } from "./pages/Admin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Sales from "./pages/Sales";
import Contact from "./pages/Contact";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Service from "./pages/Service";
import PrivPolicy from "./pages/PrivPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShipPolicy from "./pages/ShipPolicy";
import ServiceTerms from "./pages/ServiceTerms";
import PaymentForm from "./pages/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51JEWAsIN4skQxqwDFyYQyNyYq6vzhmHPbQ93DbX8sYImYs60EaaohIyONc9IPSh7uJ9V24zfjpejrlcK0Bb7oeYM00YSPe3FOa"
);

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products" component={Products} />
        <Route path="/services" component={Services} />
        <Route path="/sales" component={Sales} />
        <Route path="/contact" component={Contact} />
        <Route component={Admin} path="/admin" />
        <Route path="/product/:id" component={Product} />
        <Route path="/service/:id" component={Service} />
        <Route path="/legalpolicies/privacypolicy" component={PrivPolicy} />
        <Route path="/legalpolicies/refundpolicy" component={RefundPolicy} />
        <Route path="/legalpolicies/shippingpolicy" component={ShipPolicy} />
        <Route path="/legalpolicies/termsofservice" component={ServiceTerms} />
        <Elements stripe={stripePromise}>
          <Route path="/payment" component={PaymentForm} />
        </Elements>
        <Route component={Error} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
