import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Services from "./pages/Services"
import Sales from "./pages/Sales"
import Contact from "./pages/Contact"
import Error from "./pages/Error"
import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"

function App() {
    return (
        <main>
            <Navbar />
            <Switch>
                <Route path="/" component={Home} exact />
          <Route path="/catalog" component={Catalog} />
          <Route path="/services" component={Services} />
          <Route path="/sales" component={Sales} />
          <Route path="/contact" component={Contact} />
                <Route component={Error} />
            </Switch>
        </main>
    )
}

export default App;
