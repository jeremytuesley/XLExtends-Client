import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { appActionCreators } from "../store";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ ...appActionCreators }, dispatch);
};
