import { Route, Switch } from "react-router-dom";

import { Auth } from "./Auth";
import { Dashboard } from "./Dashboard";

const Routes = () => (
  <Switch>
    <Route component={Auth} path="/admin/login" />
    <Route component={Dashboard} path="/admin" />
  </Switch>
);

export default Routes;
