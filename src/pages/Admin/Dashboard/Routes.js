import { Route, Switch } from "react-router-dom";

import { Products } from "./Products";
import { Services } from "./Services";

const Routes = () => (
  <Switch>
    <Route component={Products} path="/admin/products" />
    <Route component={Services} path="/admin/services" />
    <Route component={Products} path="/admin/bookings" />
    <Route component={Products} path="/admin/purchases" />
  </Switch>
);

export default Routes;
