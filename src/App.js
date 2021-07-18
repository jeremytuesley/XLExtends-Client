import React from "react";
import { Route, Switch } from "react-router-dom";

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
        <Route path="/product/:id" component={Product} />
        <Route path="/service/:id" component={Service} />
        <Route path="/legalpolicies/privacypolicy" component={PrivPolicy} />
        <Route path="/legalpolicies/refundpolicy" component={RefundPolicy} />
        <Route path="/legalpolicies/shippingpolicy" component={ShipPolicy} />
        <Route path="/legalpolicies/termsofservice" component={ServiceTerms} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
