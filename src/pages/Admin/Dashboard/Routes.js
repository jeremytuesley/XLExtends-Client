import { Route, Switch } from "react-router-dom";

import { Products } from "./Products";

const Routes = () => (
  <Switch>
    <Route component={Products} path="/admin/products" />
  </Switch>
);

export default Routes;
