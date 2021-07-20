import { useLazyQuery } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { LOGIN } from "../../../shared/utils/api";
import { storeAuthToken } from "../../../shared/utils/authToken";

const Auth = () => {
  const history = useHistory();
  const [login, { data: loginData }] = useLazyQuery(LOGIN, {
    fetchPolicy: "no-cache"
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: ({ email, password }) => {
      login({ variables: { loginData: { email, password } } });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Email is required."),
      password: Yup.string().min(6).required("Password is required.")
    })
  });

  useEffect(() => {
    if (loginData) {
      storeAuthToken(loginData.login.authToken);
      history.push("/admin");
    }
  }, [loginData]);

  return (
    <div>
      <h1>Auth</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="email"
          type="email"
          {...formik.getFieldProps("email")}
        />
        <input
          placeholder="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
