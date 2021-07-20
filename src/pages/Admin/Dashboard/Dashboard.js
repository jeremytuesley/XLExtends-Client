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
        <button onClick={() => history.push("/admin/products")}>
          Products
        </button>
        <button>Services</button>
        <button
          onClick={() => {
            removeStoredAuthToken();
            history.push("/admin/login");
          }}
        >
          Log Out
        </button>
      </HeaderWrapper>
      <Routes />
    </div>
  );
};

export default Dashboard;
