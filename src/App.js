import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/Home"
import Catalog from "./components/Catalog"
// import Services from "./components/Services"
// import Sales from "./components/Sales"
// import Contact from "./components/Contact"
// import Error from "./components/Error"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"

function App() {
    return (
        <main>
            {/* <Navbar /> */}
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/catalog" component={Catalog} />
                {/* <Route component={Error} /> */}
            </Switch>
        </main>
    )
}

export default App;
