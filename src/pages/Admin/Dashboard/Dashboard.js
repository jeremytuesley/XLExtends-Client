import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Routes from "./Routes";
import { removeStoredAuthToken } from "../../../shared/utils/authToken";
import { HeaderWrapper } from "./Styles";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <HeaderWrapper>
        <h1>Dashboard</h1>
        <Button onClick={() => history.push("/admin/products")}>
          Products
        </Button>
        <Button onClick={() => history.push("/admin/services")}>
          Services
        </Button>
        <Button
          onClick={() => {
            removeStoredAuthToken();
            history.push("/admin/login");
          }}
        >
          Log Out
        </Button>
      </HeaderWrapper>
      <Routes />
    </div>
  );
};

export default Dashboard;
