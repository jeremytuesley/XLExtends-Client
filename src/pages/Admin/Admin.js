import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Routes from "./Routes";
import { IS_AUTH } from "../../shared/utils/api";
import { Wrapper } from "./Styles";

const Admin = () => {
  const history = useHistory();
  const { data: isAuthData } = useQuery(IS_AUTH, { fetchPolicy: "no-cache" });

  useEffect(() => {
    if (isAuthData) {
      if (!isAuthData.isAuth) history.push("/admin/login");
    }
  }, [isAuthData]);

  return (
    <Wrapper>
      <Routes />
    </Wrapper>
  );
};

export default Admin;
