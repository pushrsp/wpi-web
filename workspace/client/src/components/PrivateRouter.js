import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import _ from "lodash";

import { USER } from "global/user";
import { useMycoilState } from "pkg/store/Mycoil_Hooks";

const PrivateRouter = ({ children }) => {
  const [me] = useMycoilState(USER);
  const isMe = !_.isEmpty(me);
  const location = useLocation();

  return isMe ? children : <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRouter;
